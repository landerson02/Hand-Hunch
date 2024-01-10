import { NextApiRequest, NextApiResponse } from 'next';
// import { connectToDatabase } from '@/lib/mongodb';
import clientPromise from '@/lib/mongodb'

interface User {
  username: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body as User;

  try {
    // const db = await connectToDatabase();
    const client = await clientPromise;
    const db = client.db('HandHunch');
    const usersCollection = db.collection('users');

    const newUser = await usersCollection.insertOne({ username, password });
    if (newUser.insertedId) {
      const insertedUser = await usersCollection.findOne({ _id: newUser.insertedId });
      res.status(201).json({ message: 'User added!', user: insertedUser });
    } else {
      throw new Error('User insertion failed');
    }
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Error adding user' });
  }
}
