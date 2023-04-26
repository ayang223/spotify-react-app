import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { recentlyPlayedSlice } from "./recently-played-slice";
import { topArtistSlice } from "./top-artists-slice";
import { topTrackSlice } from "./top-tracks-slice";
import { weeklyPlaylistSlice } from "./weekly-playlist-slice";

const makeStore = () =>
  configureStore({
    reducer: {
      [topTrackSlice.name]: topTrackSlice.reducer,
      [topArtistSlice.name]: topArtistSlice.reducer,
      [weeklyPlaylistSlice.name]: weeklyPlaylistSlice.reducer,
      [recentlyPlayedSlice.name]: recentlyPlayedSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
