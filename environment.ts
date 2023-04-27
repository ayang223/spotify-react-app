const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || "no spotify client id";
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || "no spotify client secret";
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/playlists";
const USER_PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const USER_TOP_ENDPOINT = "https://api.spotify.com/v1/me/top";
const SEARCH_ENDPOINT = "https://api.spotify.com/v1/search";
const USER_ENDPOINT = "https://api.spotify.com/v1/users";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played";
const NEXT_AUTH_SECRET = process.env.NEXT_AUTH_SECRET || "no next auth secret";

export const environment = {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  TOKEN_ENDPOINT,
  PLAYLISTS_ENDPOINT,
  USER_ENDPOINT,
  USER_PLAYLIST_ENDPOINT,
  USER_TOP_ENDPOINT,
  SEARCH_ENDPOINT,
  RECENTLY_PLAYED_ENDPOINT,
  NEXT_AUTH_SECRET,
};
