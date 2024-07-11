import { createSlice } from "@reduxjs/toolkit";

const allMovieSlice = createSlice({
  name: "allMovies",
  initialState: {
    genre: null,
    movieList: [],
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
  },
});

export const { addMovieToList, removeMovieFromList, setGenre, removeGenre } =
  allMovieSlice.actions;
export default allMovieSlice.reducer;
