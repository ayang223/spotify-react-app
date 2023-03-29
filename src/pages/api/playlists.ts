import { getUsersPlaylists } from "../../../lib/spotify";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });

    const playlists = await getUsersPlaylists(session);

    res.status(200).json(playlists);
  } catch (err) {
    res.status(400).json(err);
  }
}
