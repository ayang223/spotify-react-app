import { getProviders, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import Loader from "../components/loader";
import { Track } from "../types/types";
import { Tab } from "@headlessui/react";
import TrackLayout from "../components/tracks-layout";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const TopTracks = ({ providers }: { providers: any }) => {
  const [categories, setCategories] = useState<string[]>(["last 4 weeks", "last 6 months", "all time"]);
  const [shortTermTopTracks, setShortTermTopTracks] = useState<Track[]>([]);
  const [mediumTermTopTracks, setMediumTermTopTracks] = useState<Track[]>([]);
  const [longTermTopTracks, setLongTermTopTracks] = useState<Track[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  const onTabGroupChange = (index: number) => {
    if (index == 1) {
      const fetchMediumTerm = async () => {
        try {
          const url = `/api/top-tracks?type=tracks&time_range=medium_term&limit=50`;
          const res = await fetch(url);
          const { items } = await res.json();
          setMediumTermTopTracks(items);
        } catch (err) {
          console.log(err);
        }
      };
      if (mediumTermTopTracks.length === 0) fetchMediumTerm();
    } else if (index == 2) {
      const fetchLongTerm = async () => {
        try {
          const url = `/api/top-tracks?type=tracks&time_range=long_term&limit=50`;
          const res = await fetch(url);
          const { items } = await res.json();
          setLongTermTopTracks(items);
        } catch (err) {
          console.log(err);
        }
      };
      if (longTermTopTracks.length === 0) fetchLongTerm();
    }
  };

  useEffect(() => {
    const fetchShortTerm = async () => {
      try {
        const url = `/api/top-tracks?type=tracks&time_range=short_term&limit=50`;
        const res = await fetch(url);
        const { items } = await res.json();
        setShortTermTopTracks(items);
      } catch (err) {
        console.log(err);
      }
    };
    fetchShortTerm();
  }, []);

  return (
    <div className="flex flex-col justify-center content-center">
      <div className="flex justify-center content-center">
        <div className="w-screen px-2 px-4 py-4 sm:w-9/12  sm:px-0">
          <Tab.Group defaultIndex={0} onChange={(i) => onTabGroupChange(i)}>
            <Tab.List className="flex space-x-1 rounded-xl p-1 bg-gray-100 ">
              {categories.map((category, index) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 ",
                      "focus:outline-none ring-offset-gray-300 focus:ring-2",
                      selected ? "bg-gray-200 shadow" : " hover:bg-white/[0.12] hover:text-gray"
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel>
                {shortTermTopTracks.length == 0 ? <Loader /> : <TrackLayout tracks={shortTermTopTracks} />}
              </Tab.Panel>
              <Tab.Panel>
                {mediumTermTopTracks.length == 0 ? <Loader /> : <TrackLayout tracks={mediumTermTopTracks} />}
              </Tab.Panel>
              <Tab.Panel>
                {longTermTopTracks.length == 0 ? <Loader /> : <TrackLayout tracks={longTermTopTracks} />}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
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
