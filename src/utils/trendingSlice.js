import { createSlice } from "@reduxjs/toolkit";

const trendingSlice = createSlice({
  name: 'trending',
  initialState: {
    trendingData: null,
  },
  reducers: {
    addTrendingData: (state, action) => {
      state.trendingData = action.payload;
    }
  }
})

export const { addTrendingData } = trendingSlice.actions;

export default trendingSlice.reducer;