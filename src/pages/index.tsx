import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import App from "../components/app";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

const Index = () => <App />;

export default Index;
