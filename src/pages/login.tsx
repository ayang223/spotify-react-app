import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import Loader from "../components/loader";

const Login = ({ providers }: { providers: any }) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/top-tracks");
    }
  }, [session]);

  if (session) return <Loader />;

  return (
    <div className="flex flex-col justify-center content-center min-h-screen">
      <div className="flex justify-center content-center">
        {Object.values<any>(providers).map((provider) => (
          <div key={provider.id}>
            <button
              className="text-white py-4 px-6 rounded-full bg-[#1db954] transition duration-300 ease-out border border-transparent uppercase font-bold text-xs md:text-base tracking-wider hover:scale-105 hover:bg-[#0db146]"
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
