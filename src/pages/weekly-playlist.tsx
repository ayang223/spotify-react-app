import { getProviders } from "next-auth/react";
import React, { useState } from "react";
import { useEffect } from "react";
import Loader from "../components/loader";
import { PlaylistWithTracksType } from "../types/types";
import PlaylistLayout from "../components/playlist-layout";

const TopTracks = ({ providers }: { providers: any }) => {
  const [weeklyPlaylist, setWeeklyPlaylist] = useState<PlaylistWithTracksType>();

  useEffect(() => {
    const fetchWeeklyPlaylist = async () => {
      try {
        const res = await fetch("/api/weekly-playlist");
        const playlist = await res.json();
        setWeeklyPlaylist(playlist);
      } catch (err) {
        console.log(err);
      }
    };
    fetchWeeklyPlaylist();
  }, []);

  return (
    <div className="flex flex-col justify-center content-center">
      <div className="flex flex-col justify-center content-center">
        {weeklyPlaylist && <PlaylistLayout playlist={[weeklyPlaylist]} />}
        {!weeklyPlaylist && <Loader />}
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
