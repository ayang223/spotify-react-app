import { signOut, useSession } from "next-auth/react";
import React from "react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="flex w-screen h-[50px]">
      {session && (
        <div className="flex justify-between w-screen items-center">
          <div className="flex items-center">
            <img
              src={session?.user?.picture ? session.user.picture : ""}
              alt="profile_img"
              width={50}
              height={50}
              loading="lazy"
            ></img>
            <p className="mr-2 ml-2">Signed in as {session.user?.email}</p>
          </div>
          <button
            className="bg-red-500 hover:bbg-red-700 h-6 text-white text-sm py-0 px-2 mr-2 rounded-full"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
