import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import moviesSlice from "./moviesSlice";
import tvSlice from "./tvSlice";
import detailsSlice from "./detailsSlice";
import trendingSlice from "./trendingSlice";
import videoSlice from "./videoSlice";
import searchSlice from "./searchSlice";
import allMovieSlice from "./allMovieSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    movies: moviesSlice,
    tv: tvSlice,
    details: detailsSlice,
    trending: trendingSlice,
    video: videoSlice,
    search: searchSlice,
    allMovies: allMovieSlice,
  },
});

export default appStore;
