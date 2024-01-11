import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

    const isCorrectPwd= await bcrypt.compare(password, user.password);
    if(!isCorrectPwd) {
      return res.status(200).json({ message: 'Incorrect password' });
    }
    if(!process.env.JWT_SECRET) {
      console.error('JWT_SECRET missing from .env file');
      return res.status(500).json({ error: 'Error logging in user' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d'});
    return res.status(200).json({ message: 'Logged in successfully', user: user, token});
  } catch (e) {
    console.error('Error logging in user:', e);
    res.status(500).json({ error: 'Error logging in user' });
  }
}