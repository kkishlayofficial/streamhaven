import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import moviesSlice from "./moviesSlice";
import tvSlice from "./tvSlice";
import detailsSlice from "./detailsSlice";
import trendingSlice from "./trendingSlice";
import videoSlice from "./videoSlice";
import searchSlice from "./searchSlice";
import allMovieSlice from "./allMovieSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: 'root',
  version: 1,
  storage
}
const rootReducer = combineReducers({
  user: userSlice,
  movies: moviesSlice,
  tv: tvSlice,
  details: detailsSlice,
  trending: trendingSlice,
  video: videoSlice,
  search: searchSlice,
  allMovies: allMovieSlice,
})

const appStore = configureStore({
  reducer: persistReducer(persistConfig, rootReducer)
});

export default appStore;
