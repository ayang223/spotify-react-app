import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { environment } from "../../../../environment";

const scope =
  "user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative playlist-modify-private playlist-modify-public";

export default NextAuth({
  providers: [
    SpotifyProvider({
      authorization: {
        params: { scope },
      },
      clientId: environment.SPOTIFY_CLIENT_ID,
      clientSecret: environment.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id = account.id;
        token.expires_at = account.expires_at;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
    async redirect({ url }) {
      if (url.includes("/login")) return "/";
      if (!url.includes("/")) return "/login";
      return url;
    },
  },
});
