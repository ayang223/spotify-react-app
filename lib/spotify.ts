import { environment } from "../environment";
import { Session } from "../src/types/types";

const client_id = environment.SPOTIFY_CLIENT_ID;
const client_secret = environment.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "user-library-modify",
  "user-top-read",
  "user-read-recently-played",
  "user-read-currently-playing",
].join(",");
const params = {
  scope: scopes,
};
const queryParamString = new URLSearchParams(params);
export const LOGIN_URL = `https://accounts.spotify.com/authorize?` + queryParamString.toString();

export const getUsersPlaylists = async (session: Session | null) => {
  return fetch(environment.USER_PLAYLIST_ENDPOINT + "?offset=0&limit=50", {
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

export const getPlaylistTracks = async (session: Session | null, id: string) => {
  return fetch(environment.PLAYLISTS_ENDPOINT + `/${id}/tracks`, {
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

export const createPlaylist = async (session: Session | null, body: any) => {
  const url = environment.USER_ENDPOINT + `/${session?.user?.id}/playlists`;
  try {
    const res = fetch(url, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    return res.then((res) => res.json());
  } catch (err) {
    return err;
  }
};

export const addToPlaylist = async (session: Session | null, playlistId: string, songList: {}) => {
  const url = environment.PLAYLISTS_ENDPOINT + `/${playlistId}/tracks`;
  try {
    const res = fetch(url, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      method: "POST",
      body: JSON.stringify(songList),
    });
    return res.then((res) => res.json());
  } catch (err) {
    return err;
  }
};

export const getRecentlyPlayed = async (session: Session | null) => {
  return fetch(environment.RECENTLY_PLAYED_ENDPOINT + `?limit=50`, {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  }).then((res) => res.json());
};
