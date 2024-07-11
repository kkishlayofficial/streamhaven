import { createSlice } from "@reduxjs/toolkit";

const tvSlice = createSlice({
  name: "tv",
  initialState: {
    onTheAirTvShows: null,
    popularTvShows: null,
    topRatedTvShows: null,
  },
  reducers: {
    addOnTheAirTvShows: (state, action) => {
      state.onTheAirTvShows = action.payload;
    },
    addPopularTvShows: (state, action) => {
      state.popularTvShows = action.payload;
    },
    addTopRatedTvShows: (state, action) => {
      state.topRatedTvShows = action.payload;
    },
  },
});
export const { addOnTheAirTvShows, addPopularTvShows, addTopRatedTvShows } =
  tvSlice.actions;
export default tvSlice.reducer;
