import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import App from "../components/app";
import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Loader from "../components/loader";
import UserInfo from "../components/user-info";

const inter = Inter({ subsets: ["latin"] });

// const Index = () => <App />;

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
    <div>
      home
      <UserInfo />
    </div>
  );
};

export default Home;
