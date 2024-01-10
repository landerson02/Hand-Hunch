import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from "@/lib/mongodb";

// TODO - remove at some point
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('HandHunch');
    const usersCollection = db.collection('users');

    const allUsers = await usersCollection.find({}).toArray();

    res.status(200).json(allUsers);

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
}
