import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    type: null,
    videoId: null,
  },
  reducers: {
    addVideoToStream: (state, action) => {
      state.videoId = action.payload.videoId;
      state.type = action.payload.type;
    },
    removeVideoFromStream: (state, action) => {
      state.type = null;
      state.videoId = null;
    },
  },
});
export const { addVideoToStream, removeVideoFromStream } = videoSlice.actions;
export default videoSlice.reducer;
