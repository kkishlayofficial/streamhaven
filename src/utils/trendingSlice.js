import { createSlice } from "@reduxjs/toolkit";

const trendingSlice = createSlice({
  name: 'trending',
  initialState: {
    trendingData: null,
    cont: null,
  },
  reducers: {
    addTrendingData: (state, action) => {
      state.trendingData = action.payload;
    },
    setCont: (state, action) => {
      state.cont = action.payload;
    }
  }
})

export const { addTrendingData, setCont } = trendingSlice.actions;

export default trendingSlice.reducer;