import Login from "./login";
import { useSession, signOut, getSession, getCsrfToken } from "next-auth/react";
import UserInfo from "./user-info";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isAuthenticated } from "../../lib/is-authenticated";
import React from "react";

const App = () => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);
  useEffect(() => {
    if (!isAuthenticated(session)) {
      router.push({
        pathname: "/login",
      });
    }
    return () => {};
  }, []);

  return (
    <>
      <UserInfo />
    </>
  );
};

export default App;
