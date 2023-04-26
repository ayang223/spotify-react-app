import { Inter } from "next/font/google";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Loader from "../components/loader";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  useEffect(() => {
    router.push("/top-tracks");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center content-center">
      <Loader />
    </div>
  );
};

export default Home;
