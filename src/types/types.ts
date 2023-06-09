import { DefaultSession } from "next-auth";

export interface User {
  name?: string | null;
  username?: string;
  email?: string | null;
  picture?: string | null;
  image?: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  id?: string | null;
}

export interface Session extends Omit<DefaultSession, "user"> {
  user?: User;
  expires: string;
}

interface Image {
  height: number | null;
  url: string;
  width: number | null;
}

export interface Album {
  id: string;
  name: string;
  artists: [Artist];
  images: [Image];
  album_type?: string;
  release_date?: string;
  tracks?: {
    total: number;
    items: Track[];
  };
}

export interface Artist {
  id: string;
  name: string;
  images: [Image];
  followers?: {
    total: number;
  };
  genres?: [string];
  external_urls: { spotify: string };
}

export interface Track {
  id: string;
  name: string;
  album: Album;
  artists: [Artist];
  duration_ms: number;
  preview_url: string;
  external_urls: { spotify: string };
  uri: string;
}

export interface PlaylistType {
  description?: string;
  id: string;
  followers?: {
    total?: number;
  };
  images: [Image];
  name: string;
  owner: {
    id: string;
    display_name?: string;
  };
  items?: [{ added_at: string; track: Track }];
  tracks: {
    items?: [{ added_at: string; track: Track }];
    total: number;
  };
  type?: string;
  total?: number;
  external_urls: { spotify: string };
}

export interface SearchResults {
  albums?: {
    items: Album[];
  };
  artists?: {
    items: Artist[];
  };
  playlists?: {
    items: PlaylistType[];
  };
  tracks?: {
    items: Track[];
  };
}

export interface PlaylistWithTracksType {
  description?: string;
  id: string;
  followers?: {
    total?: number;
  };
  images: [Image];
  name: string;
  owner: {
    id: string;
    display_name?: string;
  };
  items?: [{ added_at: string; track: Track }];
  tracks: [
    {
      track: Track;
      added_at: string;
    }
  ];
  type?: string;
  external_urls: { spotify: string };
}

export interface RecentlyPlayed {
  context: {
    external_urls: { spotify: string };
    href: string;
    type: string;
    uri: string;
  };
  track: Track;
  played_at: string;
}
