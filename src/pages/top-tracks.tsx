import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { isAuthenticated } from "../../lib/is-authenticated";
import Loader from "../components/loader";
import Tabs from "../components/tabs";
import { Track } from "../types/types";
import { Tab } from "@headlessui/react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const TopTracks = ({ providers }: { providers: any }) => {
  const [categories, setCategories] = useState<string[]>(["last 4 weeks", "last 6 months", "all time"]);
  const [shortTermTopTracks, setShortTermTopTracks] = useState<Track[]>([]);
  const [mediumTermTopTracks, setMediumTermTopTracks] = useState<Track[]>([]);
  const [longTermTopTracks, setLongTermTopTracks] = useState<Track[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const { data: session } = useSession();
  const router = useRouter();

  const onTabGroupChange = (index: number) => {
    // setActiveTab(index);
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
      fetchMediumTerm();
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
      fetchLongTerm();
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
        {/*  */}
        <div className="w-6/12 w-screen px-2 px-4 py-4 sm:w-9/12 md:w-6/12 sm:px-0">
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
                {shortTermTopTracks.length == 0 ? (
                  <Loader />
                ) : (
                  <>
                    {shortTermTopTracks.map((item, index) => (
                      <div key={item.id} className="flex overflow-auto">
                        <img src={item.album.images[0]?.url} width="50" />
                        <p>{item.name}</p>
                        {item.artists.map((artist, index) => (
                          <span key={artist.id}>
                            {artist.name}
                            {index < item.artists.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </div>
                    ))}
                  </>
                )}
              </Tab.Panel>
              <Tab.Panel>
                {mediumTermTopTracks.length == 0 ? (
                  <Loader />
                ) : (
                  <>
                    {mediumTermTopTracks.map((item, index) => (
                      <div key={item.id} className="flex overflow-auto">
                        <img src={item.album.images[0]?.url} width="50" />
                        <p>{item.name}</p>
                        {item.artists.map((artist, index) => (
                          <span key={artist.id}>
                            {artist.name}
                            {index < item.artists.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </div>
                    ))}
                  </>
                )}
              </Tab.Panel>
              <Tab.Panel>
                {longTermTopTracks.length == 0 ? (
                  <Loader />
                ) : (
                  <>
                    {longTermTopTracks.map((item, index) => (
                      <div key={item.id} className="flex overflow-auto">
                        <img src={item.album.images[0]?.url} width="50" />
                        <p>{item.name}</p>
                        {item.artists.map((artist, index) => (
                          <span key={artist.id}>
                            {artist.name}
                            {index < item.artists.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </div>
                    ))}
                  </>
                )}
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
