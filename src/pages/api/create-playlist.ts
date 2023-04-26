import { addToPlaylist, createPlaylist } from "../../../lib/spotify";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });
    const body = req.body;
    const playlistBody = {
      name: JSON.parse(body).name,
      description: JSON.parse(body).description,
      public: JSON.parse(body).public,
    };
    const songListBody = {
      uris: JSON.parse(body).uris,
    };

    const playlist = await createPlaylist(session, playlistBody);
    await addToPlaylist(session, playlist.id, songListBody);

    res.status(200).json(playlist);
  } catch (err) {
    res.status(400).json(err);
  }
}
