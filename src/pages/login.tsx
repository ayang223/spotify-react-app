import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { isAuthenticated } from "../../lib/is-authenticated";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated(session)) {
      router.push({
        pathname: "/",
      });
    }
    return () => {};
  }, []);

  return (
    <div className="flex flex-col justify-center content-center min-h-screen">
      <div className="flex justify-center content-center">
        <h1 className="text-2xl">Not signed in</h1>
      </div>
      <div className="flex justify-center content-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-full" onClick={() => signIn()}>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Login;
