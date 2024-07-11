import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    keywords: "",
    dataList: [],
  },
  reducers: {
    addKeywordsToSearch: (state, action) => {
      state.keywords = action.payload;
    },

    addResultsToList: (state, action) => {
      state.dataList = [...state.dataList, ...action.payload];
    },

    clearSearchKeyword: (state, action) => {
      state.keywords = "";
    },

    removeSearchResults: (state, action) => {
      state.dataList = [];
    },
  },
});
export const {
  addKeywordsToSearch,
  addResultsToList,
  removeSearchResults,
  clearSearchKeyword,
} = searchSlice.actions;
export default searchSlice.reducer;
