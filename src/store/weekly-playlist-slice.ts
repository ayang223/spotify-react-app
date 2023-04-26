import { createSlice } from "@reduxjs/toolkit";
import { PlaylistType, PlaylistWithTracksType } from "../types/types";
import { AppState } from "./store";

export interface WeeklyPlaylistState {
  weeklyPlaylist: PlaylistWithTracksType | null;
  newlyCreatedPlaylist: PlaylistType | null;
}

const initialState: WeeklyPlaylistState = {
  weeklyPlaylist: null,
  newlyCreatedPlaylist: null,
};

export const weeklyPlaylistSlice = createSlice({
  name: "weeklyPlaylist",
  initialState,
  reducers: {
    setWeeklyPlaylist: (state, action) => {
      state.weeklyPlaylist = action.payload;
    },
    setNewlyCreatedPlaylist: (state, action) => {
      state.newlyCreatedPlaylist = action.payload;
    },
  },
});

export const { setWeeklyPlaylist, setNewlyCreatedPlaylist } = weeklyPlaylistSlice.actions;

export const selectWeeklyPlaylist = (state: AppState) => state.weeklyPlaylist.weeklyPlaylist;
export const selectNewlyCreatedPlaylist = (state: AppState) => state.weeklyPlaylist.newlyCreatedPlaylist;

export default weeklyPlaylistSlice.reducer;
