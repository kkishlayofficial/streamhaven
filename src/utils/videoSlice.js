import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    type: null,
    videoId: null,
    title: null,
    poster: null,
  },
  reducers: {
    addVideoToStream: (state, action) => {
      state.videoId = action.payload.videoId;
      state.type = action.payload.type;
      state.title = action.payload.title ?? null;
      state.poster = action.payload.poster ?? null;
    },
    removeVideoFromStream: (state, action) => {
      state.type = null;
      state.videoId = null;
      state.title = null;
      state.poster = null;
    },
  },
});
export const { addVideoToStream, removeVideoFromStream } = videoSlice.actions;
export default videoSlice.reducer;
