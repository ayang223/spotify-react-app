import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { Track } from "../types/types";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Tabs = () => {
  const [categories, setCategories] = useState<string[]>(["last 4 weeks", "last 6 months", "all time"]);
  const [shortTermTopTracks, setShortTermTopTracks] = useState<Track[]>([]);
  const [mediumTermTopTracks, setMediumTermTopTracks] = useState<Track[]>([]);
  const [longTermTopTracks, setLongTermTopTracks] = useState<Track[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);

  const onTabGroupChange = (index: number) => {
    console.log("tab change", index);
    setActiveTab(index);
  };

  useEffect(() => {
    const fetchShortTerm = async () => {
      try {
        const url = `/api/top-tracks?type=tracks&time_range=short_term&limit=50`;
        const res = await fetch(url);
        const { items } = await res.json();
        console.log("items", items);
        setShortTermTopTracks(items);
      } catch (err) {
        console.log(err);
      }
    };
    fetchShortTerm();
  }, []);

  return (
    <div className="w-full w-6/12 w-screen px-2 px-4 py-4 sm:w-9/12 md:w-6/12 sm:px-0">
      <Tab.Group defaultIndex={0} onChange={(i) => onTabGroupChange(i)}>
        <Tab.List className="flex space-x-1 rounded-xl p-1 bg-gray-100 ">
          {/* {Object.keys(categories).map((category) => ( */}
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
            {shortTermTopTracks.map((item, index) => (
              <div key={item.id}>
                <h1>{item.name}</h1>
                {item.artists.map((artist) => (
                  <p key={artist.id}>{artist.name}</p>
                ))}

                <img src={item.album.images[0]?.url} width="100" />
              </div>
            ))}
          </Tab.Panel>
          <Tab.Panel>
            <p>last 6month</p>
          </Tab.Panel>
          <Tab.Panel>
            <p>all time</p>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Tabs;
