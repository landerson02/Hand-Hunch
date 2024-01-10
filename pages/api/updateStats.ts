import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { StatsObject } from "@/objects/stats";

interface User {
  username: string;
  userStats: StatsObject;
}

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
  const { username, userStats } = req.body as User;

  try {
    const client = await clientPromise;
    const db = client.db('HandHunch');
    const usersColl= db.collection('users');

    const user = await usersColl.findOne({ username });
    if(!user) {
      return res.status(404).json({ message: 'Username not found' });
    }

    await usersColl.updateOne({ username }, { $set: { userStats } });

    return res.status(200).json({ message: 'Stats updated successfully' });

  } catch (e) {
    console.error('Error updating user stats:', e);
    res.status(500).json({ error: 'Error updating user stats' });
  }
}