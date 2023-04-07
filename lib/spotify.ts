import { environment } from "../environment";
import { Session } from "../src/types/types";

const client_id = environment.SPOTIFY_CLIENT_ID;
const client_secret = environment.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

export const getUsersPlaylists = async (session: Session | null) => {
  return fetch(environment.PLAYLISTS_ENDPOINT + "?offset=0&limit=50", {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  }).then((res) => res.json());
};

export const getDiscoverWeeklyPlaylist = async (session: Session | null) => {
  return fetch(environment.SEARCH_ENDPOINT + "?q=discover+weekly&type=playlist", {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  }).then((res) => res.json());
};

export const getPlaylistTracks = async (session: Session | null, url?: string, id?: string) => {
  return fetch(url ? url : `environment.PLAYLISTS_ENDPOINT/${id}}/tracks`, {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  }).then((res) => res.json());
};

export const getUsersTop = async (session: Session | null, qsp: string) => {
  return fetch(environment.USER_TOP_ENDPOINT + qsp, {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  }).then((res) => res.json());
};
