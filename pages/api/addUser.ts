import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb'
import { StatsObject} from "@/objects/stats";
import bcrypt from 'bcryptjs';

interface User {
  username: string;
  password: string;
  userStats: StatsObject;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password , userStats} = req.body as User;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const client = await clientPromise;
    const db = client.db('HandHunch');
    const usersCollection = db.collection('users');

    const newUser = await usersCollection.insertOne({ username, password: hashedPassword, userStats });
    if (newUser.insertedId) {
      const insertedUser = await usersCollection.findOne({ _id: newUser.insertedId });
      res.status(201).json({ message: 'User added!', user: insertedUser });
    } else {
      console.log('failed to add user');
    }
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Error adding user' });
  }
}
