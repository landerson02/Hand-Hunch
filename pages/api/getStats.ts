import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db('HandHunch');
    const usersColl= db.collection('users');

    const user = await usersColl.findOne({ username });
    if(!user) {
      return res.status(404).json({ message: 'Username not found' });
    }
    return res.status(200).json(user.userStats);
  } catch (e) {
    console.error('Error getting user stats:', e);
    res.status(500).json({ error: 'Error getting user stats' });
  }
}