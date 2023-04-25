import { createPlaylist } from "../../../lib/spotify";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });
    const data = JSON.parse(req.body);
    const playlist = await createPlaylist(session, data);

    console.log("playlist", playlist);
    console.log("id", playlist.id);
    res.status(200).json(playlist);
  } catch (err) {
    res.status(400).json(err);
  }
}
