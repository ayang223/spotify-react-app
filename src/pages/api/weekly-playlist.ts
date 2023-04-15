import { getDiscoverWeeklyPlaylist, getPlaylistTracks } from "../../../lib/spotify";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });

    const { playlists } = await getDiscoverWeeklyPlaylist(session);

    const { items } = playlists;

    const playlistWithTracks = await getPlaylistTracks(session, items[0].id);

    const obj = {
      ...items[0],
      tracks: playlistWithTracks.items,
    };

    res.status(200).json(obj);
  } catch (err) {
    res.status(400).json(err);
  }
}
