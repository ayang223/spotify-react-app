import { getUsersPlaylists, getUsersTop } from "../../../lib/spotify";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  const type = `tracks?time_range=short_term`;
  // const playlists = await customGet("https://api.spotify.com/v1/me/playlists", session);
  const topTracks = await getUsersTop(session);

  res.status(200).json(topTracks);
}
