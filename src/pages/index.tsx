import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Loader from "../components/loader";
import UserInfo from "../components/user-info";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  if (status === "loading") return <Loader />;

  console.log("session", session);
  return (
    <div className="flex flex-col justify-center content-center">
      home
      <UserInfo />
    </div>
  );
};

export default Home;
