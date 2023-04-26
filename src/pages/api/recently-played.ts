import { getRecentlyPlayed } from "../../../lib/spotify";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });

    const recentlyPlayed = await getRecentlyPlayed(session);
    const { items } = recentlyPlayed;
    res.status(200).json(items);
  } catch (err) {
    res.status(400).json(err);
  }
}
