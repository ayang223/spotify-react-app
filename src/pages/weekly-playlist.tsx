import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { isAuthenticated } from "../../lib/is-authenticated";
import Loader from "../components/loader";
import { Tab } from "@headlessui/react";
import TrackLayout from "../components/tracks-layout";
import { PlaylistWithTracksType } from "../types/types";
import PlaylistLayout from "../components/playlist-layout";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const TopTracks = ({ providers }: { providers: any }) => {
  const [weeklyPlaylist, setWeeklyPlaylist] = useState<PlaylistWithTracksType>();
  const { data: session } = useSession();
  const router = useRouter();

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
      <div className="flex justify-center content-center">
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
