import { createSlice } from "@reduxjs/toolkit";

const detailsSlice = createSlice({
  name: "details",
  initialState: { type: null, detail: null, seasonDetails: null },
  reducers: {
    addDetail: (state, action) => {
      state.detail = action.payload.detail;
      state.type = action.payload.type;
    },

    addEpisodeDetails: (state, action) => {
      state.seasonDetails = action.payload;
    },

    removeDetail: (state, action) => {
      state.detail = null;
      state.type = null;
    },

    removeEpisodeDetails: (state, action) => {
      state.seasonDetails = [];
    },
  },
});
export const {
  addDetail,
  addEpisodeDetails,
  removeDetail,
  removeEpisodeDetails,
} = detailsSlice.actions;
export default detailsSlice.reducer;
