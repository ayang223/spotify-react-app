import { environment } from "../environment";
import { Session } from "../src/types/types";

const client_id = environment.SPOTIFY_CLIENT_ID;
const client_secret = environment.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

export const getUsersPlaylists = async (session: Session | null) => {
  return fetch(environment.PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  }).then((res) => res.json());
};

export const getUsersTop = async (session: Session | null) => {
  return fetch(`${environment.USER_TOP_ENDPOINT}/tracks?time_range=short_term&limit=10`, {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  }).then((res) => res.json());
};
