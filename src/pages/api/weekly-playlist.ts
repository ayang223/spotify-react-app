import { getDiscoverWeeklyPlaylist, getPlaylistTracks } from "../../../lib/spotify";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  const { playlists } = await getDiscoverWeeklyPlaylist(session);

  const { items } = playlists;

  const playlistWithTracks = await getPlaylistTracks(session, items[0].tracks.href);

  const obj = {
    ...items[0],
    tracks: playlistWithTracks.items,
  };

  //   res.status(200).json(items[0]);
  //   res.status(200).json(items[0].tracks.href);
  //   res.status(200).json(playlistWithTracks);
  res.status(200).json(obj);
}
