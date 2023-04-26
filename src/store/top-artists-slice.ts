import { createSlice } from "@reduxjs/toolkit";
import { Artist } from "../types/types";
import { AppState } from "./store";

export interface TopArtistState {
  shortTermTopArtists: Artist[];
  mediumTermTopArtists: Artist[];
  longTermTopArtists: Artist[];
}

const initialState: TopArtistState = {
  shortTermTopArtists: [],
  mediumTermTopArtists: [],
  longTermTopArtists: [],
};

export const topArtistSlice = createSlice({
  name: "topArtists",
  initialState,
  reducers: {
    setShortTermArtist: (state, action) => {
      state.shortTermTopArtists = action.payload;
    },
    setMediumTermArtist: (state, action) => {
      state.mediumTermTopArtists = action.payload;
    },
    setLongTermArtist: (state, action) => {
      state.longTermTopArtists = action.payload;
    },
  },
});

export const { setShortTermArtist, setMediumTermArtist, setLongTermArtist } = topArtistSlice.actions;

export const selectShortTermTopArtists = (state: AppState) => state.topArtists.shortTermTopArtists;
export const selectMediumTermTopArtists = (state: AppState) => state.topArtists.mediumTermTopArtists;
export const selectLongTermTopArtists = (state: AppState) => state.topArtists.longTermTopArtists;

export default topArtistSlice.reducer;
