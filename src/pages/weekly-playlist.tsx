import { getProviders } from "next-auth/react";
import React from "react";
import { useEffect } from "react";
import Loader from "../components/loader";
import PlaylistLayout from "../components/playlist-layout";
import { useDispatch, useSelector } from "react-redux";
import { selectWeeklyPlaylist, setWeeklyPlaylist } from "../store/weekly-playlist-slice";

const TopTracks = ({ providers }: { providers: any }) => {
  const dispatch = useDispatch();
  const weeklyPlaylistState = useSelector(selectWeeklyPlaylist);
  useEffect(() => {
    const fetchWeeklyPlaylist = async () => {
      try {
        const res = await fetch("/api/weekly-playlist");
        const playlist = await res.json();
        dispatch(setWeeklyPlaylist(playlist));
      } catch (err) {
        console.log(err);
      }
    };
    if (!weeklyPlaylistState) fetchWeeklyPlaylist();
  }, []);

  return (
    <div className="flex flex-col justify-center content-center">
      <div className="flex flex-col justify-center content-center">
        {weeklyPlaylistState && <PlaylistLayout playlist={[weeklyPlaylistState]} />}
        {!weeklyPlaylistState && <Loader />}
      </div>
    </div>
  );
};

export default TopTracks;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
