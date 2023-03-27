const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || "no spotify client id";
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || "no spotify client secret";
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const USER_TOP_ENDPOINT = "https://api.spotify.com/v1/me/top";

export const environment = {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  TOKEN_ENDPOINT,
  PLAYLISTS_ENDPOINT,
  USER_TOP_ENDPOINT,
};
