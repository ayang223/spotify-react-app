import { getProviders } from "next-auth/react";
import React, { useState } from "react";
import { useEffect } from "react";
import Loader from "../components/loader";
import { RecentlyPlayed } from "../types/types";

const RecentlyPlayed = ({ providers }: { providers: any }) => {
  const [recentlyPlayed, setRecentlyPlayed] = useState<RecentlyPlayed[]>();

  useEffect(() => {
    let interval = setInterval(() => {
      fetchWeeklyPlaylist();
    }, 300000);

    fetchWeeklyPlaylist();
    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchWeeklyPlaylist = async () => {
    try {
      const recentlyPlayedRes = await fetch("/api/recently-played");

      setRecentlyPlayed(await recentlyPlayedRes.json());
    } catch (err) {
      console.log(err);
    }
  };

  const getDate = (playedAt: string): string => {
    const timestamp = new Date(playedAt);
    return timestamp.toLocaleString();
  };

  const openOnSpotify = (url: string): void => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col justify-center items-center content-center px-3">
      <div className="flex flex-col justify-center content-center pt-2">
        <div className="grid grid-cols-10 py-2  px-2">
          <div className="col-span-4 text-sm md:text-xl font-bold">Track</div>
          <div className="col-span-4 text-sm md:text-xl font-bold">Artist(s)</div>
          <div className="col-span-2 text-sm md:text-xl font-bold">Played At</div>
        </div>
        {recentlyPlayed?.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-10 py-2 border-b-2 px-2 hover:bg-slate-100"
            onClick={() => openOnSpotify(item.track.external_urls.spotify)}
          >
            <div className="col-span-4">
              <div className="text-xs md:text-sm">{item.track.name}</div>
            </div>
            <div className="flex items-center col-span-4">
              {item.track.artists.map((artist, index) => (
                <p key={artist.id} className="text-xs md:text-sm">
                  {artist.name}
                  {index < item.track.artists.length - 1 ? ",\u00A0" : ""}
                </p>
              ))}
            </div>
            <div className="col-span-2">
              <div className="flex flex-row justify-between">
                <p className="text-xs md:text-sm">{getDate(item.played_at)}</p>
                {/* <a href={item.track.external_urls.spotify} target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                    <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M15.727,16.605c-1.47-0.882-3.333-1.372-5.293-1.372 c-1.078,0-2.254,0.196-3.234,0.392l-0.273,0.085l-0.315-1.36c1.274-0.294,2.548-0.49,3.921-0.49c2.254,0,4.313,0.588,6.077,1.568 l-0.744,1.258L15.727,16.605z M16.707,13.861c-1.666-1.078-4.019-1.666-6.567-1.666c-1.274,0-2.392,0.288-3.274,0.484l-0.297,0.069 l-0.349-1.729c1.176-0.294,2.352-0.588,4.019-0.588c2.744,0,5.293,0.686,7.449,1.96l-0.798,1.564 C16.889,13.955,16.743,13.879,16.707,13.861z M17.981,10.725c-1.96-1.078-4.803-1.764-7.547-1.764c-1.372,0-2.842,0.196-4.117,0.49 L5.93,9.55L5.435,7.588C7.003,7.196,8.669,7,10.434,7c3.038,0,6.175,0.686,8.625,1.96L17.981,10.725z" />
                  </svg>
                </a> */}
              </div>
            </div>
          </div>
        ))}
        {!recentlyPlayed && <Loader />}
      </div>
    </div>
  );
};

export default RecentlyPlayed;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
