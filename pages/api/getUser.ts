import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function getUser(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;
  try {
    const client = await clientPromise;
    const db = client.db('HandHunch');
    const usersColl = db.collection('users');
    const user = await usersColl.findOne({username: username});
    if(user) {
      res.status(200).json({message: 'Username is already taken!'});
      return;
    }
    res.status(200).json({message: 'Username is available!'});
  } catch (e) {
    console.error('Error fetching user:', e);
  }
}
