import { useState } from "react";
import { Artist, PlaylistType, PlaylistWithTracksType, TimeRange, Track } from "../types/types";

const UserInfo = () => {
  const [playlists, setPlaylists] = useState<PlaylistType[]>([]);

  const [tracks, setTracks] = useState<Track[]>([]);

  const [discoverWeekly, setDiscoverWeekly] = useState<PlaylistWithTracksType>();

  const getMyPlaylists = async () => {
    const res = await fetch("/api/playlists");
    const { items } = await res.json();
    console.log("items", items);
    setPlaylists(items);
  };

  const getMyTopTracks = async (type: string, timeRange: TimeRange, limit: number) => {
    const url = `/api/top-tracks?type=${type}&time_range=${timeRange}&limit=${limit}`;
    const res = await fetch(url);
    const { items } = await res.json();
    console.log("items", items);
    setTracks(items);
  };

  const getDiscoverWeeklyPlaylist = async () => {
    const res = await fetch("/api/weekly-playlist");
    const playlist = await res.json();
    setDiscoverWeekly(playlist);
  };

  const clear = () => {
    setPlaylists([]);
    setTracks([]);
  };

  return (
    <>
      <button onClick={() => getMyPlaylists()}>Get all my playlists</button>
      <button onClick={() => getMyTopTracks("tracks", TimeRange.ShortTerm, 10)}>Get my top 10 plays</button>
      <button onClick={() => getDiscoverWeeklyPlaylist()}>Get discover Weekly</button>
      <button onClick={() => clear()}>clear</button>
      {playlists.map((playlist) => (
        <div key={playlist.id}>
          <h1>{playlist.name}</h1>
          <img src={playlist.images[0]?.url} width="100" />
        </div>
      ))}

      {tracks.map((item) => (
        <div key={item.id}>
          <h1>{item.name}</h1>
          {item.artists.map((artist) => (
            <p key={artist.id}>{artist.name}</p>
          ))}

          <img src={item.album.images[0]?.url} width="100" />
        </div>
      ))}

      <div>
        <h1>{discoverWeekly?.name}</h1>
        <p>week: {discoverWeekly?.tracks[0].added_at}</p>
        <img src={discoverWeekly?.images[0]?.url} width="100" />
        <p>{discoverWeekly?.owner.display_name}</p>
        <p>{discoverWeekly?.tracks?.length} songs</p>
        {discoverWeekly?.tracks.map((track) => (
          <div key={track.track.id}>
            <p>{track.track.name}</p>
            <p>{track.track.album.name}</p>
            {track.track.artists.map((artist) => (
              <p key={artist.id}>{artist.name}</p>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default UserInfo;
