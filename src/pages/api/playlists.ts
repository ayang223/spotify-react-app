import { getUsersPlaylists } from "../../../lib/spotify";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  // const playlists = await customGet("https://api.spotify.com/v1/me/playlists", session);
  const playlists = await getUsersPlaylists(session);

  res.status(200).json(playlists);
}
