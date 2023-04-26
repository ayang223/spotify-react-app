import { createSlice } from "@reduxjs/toolkit";
import { PlaylistType, Track } from "../types/types";
import { AppState } from "./store";

export interface TopTrackState {
  shortTermTopTracks: Track[];
  mediumTermTopTracks: Track[];
  longTermTopTracks: Track[];
  newShortTermPlaylist: PlaylistType | null;
  newMediumTermPlaylist: PlaylistType | null;
  newLongTermPlaylist: PlaylistType | null;
}

const initialState: TopTrackState = {
  shortTermTopTracks: [],
  mediumTermTopTracks: [],
  longTermTopTracks: [],
  newShortTermPlaylist: null,
  newMediumTermPlaylist: null,
  newLongTermPlaylist: null,
};

export const topTrackSlice = createSlice({
  name: "topTracks",
  initialState,
  reducers: {
    setShortTermTracks: (state, action) => {
      state.shortTermTopTracks = action.payload;
    },
    setMediumTermTracks: (state, action) => {
      state.mediumTermTopTracks = action.payload;
    },
    setLongTermTracks: (state, action) => {
      state.longTermTopTracks = action.payload;
    },
    setNewShortTermPlaylist: (state, action) => {
      state.newShortTermPlaylist = action.payload;
    },
    setNewMediumTermPlaylist: (state, action) => {
      state.newMediumTermPlaylist = action.payload;
    },
    setNewLongTermPlaylist: (state, action) => {
      state.newLongTermPlaylist = action.payload;
    },
  },
});

export const {
  setShortTermTracks,
  setMediumTermTracks,
  setLongTermTracks,
  setNewShortTermPlaylist,
  setNewMediumTermPlaylist,
  setNewLongTermPlaylist,
} = topTrackSlice.actions;

export const selectShortTermTopTracks = (state: AppState) => state.topTracks.shortTermTopTracks;
export const selectMediumTermTopTracks = (state: AppState) => state.topTracks.mediumTermTopTracks;
export const selectLongTermTopTracks = (state: AppState) => state.topTracks.longTermTopTracks;
export const selectNewShortTermPlaylist = (state: AppState) => state.topTracks.newShortTermPlaylist;
export const selectNewMediumTermPlaylist = (state: AppState) => state.topTracks.newMediumTermPlaylist;
export const selectNewLongTermPlaylist = (state: AppState) => state.topTracks.newLongTermPlaylist;

export default topTrackSlice.reducer;
