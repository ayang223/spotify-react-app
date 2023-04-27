import { getProviders, getSession, useSession } from "next-auth/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { Tab } from "@headlessui/react";
import Loader from "../components/loader";
import ArtistLayout from "../components/artists-layout";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLongTermTopArtists,
  selectMediumTermTopArtists,
  selectShortTermTopArtists,
  setLongTermArtist,
  setMediumTermArtist,
  setShortTermArtist,
} from "../store/top-artists-slice";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const TopTracks = () => {
  const [categories, setCategories] = useState<string[]>(["last 4 weeks", "last 6 months", "all time"]);
  const dispatch = useDispatch();
  const shortTermState = useSelector(selectShortTermTopArtists);
  const mediumTermState = useSelector(selectMediumTermTopArtists);
  const longTermState = useSelector(selectLongTermTopArtists);

  const onTabGroupChange = (index: number) => {
    if (index == 1) {
      const fetchMediumTerm = async () => {
        try {
          const url = `/api/top-artists?type=artists&time_range=medium_term&limit=50`;
          const res = await fetch(url);
          const { items } = await res.json();
          dispatch(setMediumTermArtist(items));
        } catch (err) {
          console.log(err);
        }
      };
      if (mediumTermState.length === 0) fetchMediumTerm();
    } else if (index == 2) {
      const fetchLongTerm = async () => {
        try {
          const url = `/api/top-artists?type=artists&time_range=long_term&limit=50`;
          const res = await fetch(url);
          const { items } = await res.json();
          dispatch(setLongTermArtist(items));
        } catch (err) {
          console.log(err);
        }
      };
      if (longTermState.length === 0) fetchLongTerm();
    }
  };

  useEffect(() => {
    const fetchShortTerm = async () => {
      try {
        const url = `/api/top-artists?type=artists&time_range=short_term&limit=50`;
        const res = await fetch(url);
        const { items } = await res.json();
        dispatch(setShortTermArtist(items));
      } catch (err) {
        console.log(err);
      }
    };
    if (shortTermState.length === 0) fetchShortTerm();
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
                {shortTermState.length == 0 ? <Loader /> : <ArtistLayout artists={shortTermState} />}
              </Tab.Panel>
              <Tab.Panel>
                {mediumTermState.length == 0 ? <Loader /> : <ArtistLayout artists={mediumTermState} />}
              </Tab.Panel>
              <Tab.Panel>{longTermState.length == 0 ? <Loader /> : <ArtistLayout artists={longTermState} />}</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default TopTracks;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
