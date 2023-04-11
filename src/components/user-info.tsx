import React from "react";
import { useState } from "react";
import { TimeRange } from "../types/enums";
import { Artist, PlaylistType, PlaylistWithTracksType, Track } from "../types/types";

const UserInfo = () => {
  const [playlists, setPlaylists] = useState<PlaylistType[]>([]);

  const [tracks, setTracks] = useState<Track[]>([]);

  const [discoverWeekly, setDiscoverWeekly] = useState<PlaylistWithTracksType>();

  const getMyPlaylists = async () => {
    try {
      const res = await fetch("/api/playlists");
      const { items } = await res.json();
      console.log("items", items);
      setPlaylists(items);
    } catch (err) {
      console.log(err);
    }
  };

  const getMyTopTracks = async (type: string, timeRange: TimeRange, limit: number) => {
    try {
      const url = `/api/top-tracks?type=${type}&time_range=${timeRange}&limit=${limit}`;
      const res = await fetch(url);
      const { items } = await res.json();
      console.log("items", items);
      setTracks(items);
    } catch (err) {
      console.log(err);
    }
  };

  const getDiscoverWeeklyPlaylist = async () => {
    try {
      const res = await fetch("/api/weekly-playlist");
      const playlist = await res.json();
      setDiscoverWeekly(playlist);
    } catch (err) {
      console.log(err);
    }
  };

  const clear = () => {
    setPlaylists([]);
    setTracks([]);
    setDiscoverWeekly(undefined);
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bbg-blue-700 text-white text-sm py-1 px-2 mr-2 rounded-full"
        onClick={() => getMyPlaylists()}
      >
        Get all my playlists
      </button>
      <button
        className="bg-blue-500 hover:bbg-blue-700  text-white text-sm py-1 px-2 mr-2 rounded-full"
        onClick={() => getMyTopTracks("tracks", TimeRange.ShortTerm, 10)}
      >
        Get my top 10 plays
      </button>
      <button
        className="bg-blue-500 hover:bbg-blue-700  text-white text-sm py-1 px-2 mr-2 rounded-full"
        onClick={() => getDiscoverWeeklyPlaylist()}
      >
        Get discover Weekly
      </button>
      <button
        className="bg-blue-500 hover:bbg-blue-700  text-white text-sm py-1 px-2 mr-2 rounded-full"
        onClick={() => clear()}
      >
        clear
      </button>
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

      {discoverWeekly && (
        <div>
          <h1>{discoverWeekly?.name}</h1>
          <p>week: {discoverWeekly?.tracks[0].added_at}</p>
          <img src={discoverWeekly?.images[0]?.url} width="100" />
          <p>{discoverWeekly?.owner.display_name}</p>
          <p>{discoverWeekly?.tracks?.length} songs</p>
          {discoverWeekly?.tracks.map((track) => (
            <div key={track.track.id}>
              <p>track name: {track.track.name}</p>
              <p>album: {track.track.album.name}</p>
              {track.track.artists.map((artist) => (
                <p key={artist.id}>from: {artist.name}</p>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserInfo;
