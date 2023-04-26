import { getProviders } from "next-auth/react";
import React from "react";
import { useEffect } from "react";
import Loader from "../components/loader";
import { useDispatch, useSelector } from "react-redux";
import { selectRecentlyPlayed, setRecentlyPlayed } from "../store/recently-played-slice";

const RecentlyPlayed = ({ providers }: { providers: any }) => {
  const dispatch = useDispatch();
  const recentlyPlayedState = useSelector(selectRecentlyPlayed);

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

      dispatch(setRecentlyPlayed(await recentlyPlayedRes.json()));
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
        {recentlyPlayedState?.map((item, index) => (
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
              </div>
            </div>
          </div>
        ))}
        {!recentlyPlayedState && <Loader />}
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
