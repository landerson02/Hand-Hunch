import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db('HandHunch');
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ username });
    if(!user) {
      return res.status(200).json({ message: 'Username not found' });
    }

    // TODO - add bcrypt/jwt stuff
    const isCorrectPwd= password === user.password;
    if(!isCorrectPwd) {
      return res.status(200).json({ message: 'Incorrect password' });
    }

    return res.status(200).json({ message: 'Logged in successfully', user: user});
  } catch (e) {
    console.error('Error logging in user:', e);
    res.status(500).json({ error: 'Error logging in user' });
  }
}