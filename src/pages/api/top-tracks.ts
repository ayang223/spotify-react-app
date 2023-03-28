import { getUsersPlaylists, getUsersTop } from "../../../lib/spotify";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  const query = req.query;
  const { type, time_range, limit } = query;
  const qsp = `/${type}?time_range=${time_range}&limit=${limit}`;
  const topTracks = await getUsersTop(session, qsp);

  res.status(200).json(topTracks);
}
