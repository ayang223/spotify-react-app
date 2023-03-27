import { useState } from "react";
import { Artist, PlaylistType, Track } from "../types/types";

const UserInfo = () => {
  const [list, setList] = useState<PlaylistType[]>([]);

  const [tracks, setTracks] = useState<Track[]>([]);

  const getMyPlaylists = async () => {
    const res = await fetch("/api/playlists");
    const { items } = await res.json();
    console.log("items", items);
    setList(items);
  };

  const getMyTopTracks = async () => {
    const res = await fetch("/api/tracks");
    const { items } = await res.json();
    setTracks(items);
  };

  const clear = () => {
    setList([]);
    setTracks([]);
  };

  return (
    <>
      <button onClick={() => getMyPlaylists()}>Get all my playlists</button>
      <button onClick={() => getMyTopTracks()}>Get my top 10 plays</button>
      <button onClick={() => clear()}>clear</button>
      {list.map((item) => (
        <div key={item.id}>
          <h1>{item.name}</h1>
          <img src={item.images[0]?.url} width="100" />
        </div>
      ))}

      {tracks.map((item) => (
        <div key={item.id}>
          <h1>{item.name}</h1>
          {item.artists.map((artist) => (
            <p>{artist.name}</p>
          ))}

          <img src={item.album.images[0]?.url} width="100" />
        </div>
      ))}
    </>
  );
};

export default UserInfo;
