import { createSlice } from "@reduxjs/toolkit";

const allMovieSlice = createSlice({
  name: "allMovies",
  initialState: {
    genre: null,
    movieList: [],
    page: 1,
  },
  reducers: {
    addMovieToList: (state, action) => {
      state.movieList = [...state.movieList, ...action.payload];
    },
    removeMovieFromList: (state) => {
      state.movieList = [];
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
    removeGenre: (state) => {
      state.genre = null;
    },
    updatePage: (state, action) => {
      state.page = action.payload
    }
  },
});

export const { addMovieToList, removeMovieFromList, setGenre, removeGenre, updatePage } =
  allMovieSlice.actions;
export default allMovieSlice.reducer;
