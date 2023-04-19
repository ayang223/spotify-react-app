import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { isAuthenticated } from "../../lib/is-authenticated";
import Loader from "../components/loader";

const TopTracks = ({ providers }: { providers: any }) => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center content-center">
      <div className="flex justify-center content-center">top artists</div>
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
