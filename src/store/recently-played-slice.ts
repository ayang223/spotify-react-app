import { createSlice } from "@reduxjs/toolkit";
import { RecentlyPlayed } from "../types/types";
import { AppState } from "./store";

export interface RecentlyPlayedState {
  recentlyPlayed: RecentlyPlayed[] | null;
}

const initialState: RecentlyPlayedState = {
  recentlyPlayed: null,
};

export const recentlyPlayedSlice = createSlice({
  name: "recentlyPlayed",
  initialState,
  reducers: {
    setRecentlyPlayed: (state, action) => {
      state.recentlyPlayed = action.payload;
    },
  },
});

export const { setRecentlyPlayed } = recentlyPlayedSlice.actions;

export const selectRecentlyPlayed = (state: AppState) => state.recentlyPlayed.recentlyPlayed;

export default recentlyPlayedSlice.reducer;
