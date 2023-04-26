import React from "react";
import { Track } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNewLongTermPlaylist,
  selectNewMediumTermPlaylist,
  selectNewShortTermPlaylist,
  setNewLongTermPlaylist,
  setNewMediumTermPlaylist,
  setNewShortTermPlaylist,
} from "../store/top-tracks-slice";

interface TrackLayoutProps {
  tracks: Track[];
  type: string;
}

const TrackLayout = ({ tracks, type }: TrackLayoutProps) => {
  const dispatch = useDispatch();
  const shortTermPlaylist = useSelector(selectNewShortTermPlaylist);
  const mediumTermPlaylist = useSelector(selectNewMediumTermPlaylist);
  const longTermPlaylist = useSelector(selectNewLongTermPlaylist);

  const createPlaylist = async (type: string) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();
    const data = {
      name: "",
      description: "",
      public: false,
      uris: createPlaylistSongList(),
    };
    if (type == "mediumTerm") {
      data.name = `Top Tracks ${year}-${month}-${date} (last 6 months)`;
      data.description = `Your favorite tracks last 6 months as of ${year}-${month}-${date}`;
    } else if (type == "longTerm") {
      data.name = `Top Tracks ${year}-${month}-${date} (all time)`;
      data.description = `Your favorite tracks all time as of ${year}-${month}-${date}`;
    } else {
      data.name = `Top Tracks ${year}-${month}-${date} (last 4 weeks)`;
      data.description = `Your favorite tracks last 4 weeks as of ${year}-${month}-${date}`;
    }

    try {
      const res = await fetch("/api/create-playlist", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (type == "mediumTerm") dispatch(setNewMediumTermPlaylist(await res.json()));
      else if (type == "longTerm") dispatch(setNewLongTermPlaylist(await res.json()));
      else dispatch(setNewShortTermPlaylist(await res.json()));
    } catch (err) {
      console.log(err);
    }
  };

  const createPlaylistSongList = () => {
    let songArr = [];
    for (const track of tracks) {
      songArr.push(track.uri);
    }

    return songArr;
  };

  const openOnSpotify = (url: string) => {
    window.open(url, "_blank");
  };

  const displayButton = (type: string) => {
    if (type == "mediumTerm") {
      return mediumTermPlaylist ? (
        <button
          className="bg-blue-500 hover:bg-blue-700  text-white text-sm py-3 px-5 rounded-lg"
          onClick={() => openOnSpotify(mediumTermPlaylist.external_urls.spotify)}
        >
          Open on Spotify
        </button>
      ) : (
        <button
          className="bg-green-500 hover:bg-green-700  text-white text-sm py-3 px-5 rounded-lg"
          onClick={() => createPlaylist(type)}
        >
          Save to Playlist
        </button>
      );
    } else if (type == "longTerm") {
      return longTermPlaylist ? (
        <button
          className="bg-blue-500 hover:bg-blue-700  text-white text-sm py-3 px-5 rounded-lg"
          onClick={() => openOnSpotify(longTermPlaylist.external_urls.spotify)}
        >
          Open on Spotify
        </button>
      ) : (
        <button
          className="bg-green-500 hover:bg-green-700  text-white text-sm py-3 px-5 rounded-lg"
          onClick={() => createPlaylist(type)}
        >
          Save to Playlist
        </button>
      );
    } else {
      return shortTermPlaylist ? (
        <button
          className="bg-blue-500 hover:bg-blue-700  text-white text-sm py-3 px-5 rounded-lg"
          onClick={() => openOnSpotify(shortTermPlaylist.external_urls.spotify)}
        >
          Open on Spotify
        </button>
      ) : (
        <button
          className="bg-green-500 hover:bg-green-700  text-white text-sm py-3 px-5 rounded-lg"
          onClick={() => createPlaylist(type)}
        >
          Save to Playlist
        </button>
      );
    }
  };

  return (
    <>
      {tracks.map((item, index) => (
        <div key={item.id} className="grid grid-cols-9 py-2">
          <div className="col-span-4">
            <div className="flex items-center">
              <div className="w-5 md:w-7">
                <span>{index + 1 + ".\u00A0"}</span>
              </div>
              <img src={item.album.images[0]?.url} className="w-11 md:w-16 pr-2" />
              <div className="text-xs md:text-base">{item.name}</div>
            </div>
          </div>

          <div className="flex items-center col-span-4">
            {item.artists.map((artist, index) => (
              <p key={artist.id} className="text-xs md:text-base">
                {artist.name}
                {index < item.artists.length - 1 ? ",\u00A0" : ""}
              </p>
            ))}
          </div>

          <div className="flex items-center">
            <a href={item.external_urls.spotify} target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M15.727,16.605c-1.47-0.882-3.333-1.372-5.293-1.372 c-1.078,0-2.254,0.196-3.234,0.392l-0.273,0.085l-0.315-1.36c1.274-0.294,2.548-0.49,3.921-0.49c2.254,0,4.313,0.588,6.077,1.568 l-0.744,1.258L15.727,16.605z M16.707,13.861c-1.666-1.078-4.019-1.666-6.567-1.666c-1.274,0-2.392,0.288-3.274,0.484l-0.297,0.069 l-0.349-1.729c1.176-0.294,2.352-0.588,4.019-0.588c2.744,0,5.293,0.686,7.449,1.96l-0.798,1.564 C16.889,13.955,16.743,13.879,16.707,13.861z M17.981,10.725c-1.96-1.078-4.803-1.764-7.547-1.764c-1.372,0-2.842,0.196-4.117,0.49 L5.93,9.55L5.435,7.588C7.003,7.196,8.669,7,10.434,7c3.038,0,6.175,0.686,8.625,1.96L17.981,10.725z" />
              </svg>
            </a>
          </div>
        </div>
      ))}
      {displayButton(type)}
    </>
  );
};

export default TrackLayout;
