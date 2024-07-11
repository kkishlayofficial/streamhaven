import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
} from "../utils/moviesSlice";
import {
  addOnTheAirTvShows,
  addPopularTvShows,
  addTopRatedTvShows,
} from "../utils/tvSlice";
import { useEffect } from "react";
import { addTrendingData } from "../utils/trendingSlice";

const useDataFromTmdb = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const tv = useSelector((state) => state.tv);
  const trending = useSelector(state => state.trending);

  const getNowPlayingMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1&include_adult=true",
        API_OPTIONS
      );

      const list = await data.json();
      dispatch(addNowPlayingMovies(list.results));
    } catch (err) {
      console.log(err);
    }
  };

  const getPopularMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=page=1&include_adult=true",
        API_OPTIONS
      );

      const list = await data.json();
      dispatch(addPopularMovies(list.results));
    } catch (err) {
      console.log(err);
    }
  };

  const getTopRatedMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=page=1&include_adult=true",
        API_OPTIONS
      );

      const list = await data.json();
      dispatch(addTopRatedMovies(list.results));
    } catch (err) {
      console.log(err);
    }
  };

  const getOnTheAirTvShows = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/tv/on_the_air?language=page=1&include_adult=true",
        API_OPTIONS
      );

      const list = await data.json();
      dispatch(addOnTheAirTvShows(list.results));
    } catch (err) {
      console.log(err);
    }
  };

  const getPopularTvShows = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/tv/popular?language=page=1&include_adult=true",
        API_OPTIONS
      );

      const list = await data.json();
      dispatch(addPopularTvShows(list.results));
    } catch (err) {
      console.log(err);
    }
  };

  const getTopRatedTvShows = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/tv/top_rated?language=page=1&include_adult=true",
        API_OPTIONS
      );

      const list = await data.json();
      dispatch(addTopRatedTvShows(list.results));
    } catch (err) {
      console.log(err);
    }
  };

  const getTrendingData = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc",
        API_OPTIONS
      );
      const list = await data.json();

      dispatch(addTrendingData(list.results));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Promise.allSettled([
      !movies.nowPlayingMovies ? getNowPlayingMovies() : null,
      !movies.popularMovies ? getPopularMovies() : null,
      !movies.topRatedMovies ? getTopRatedMovies(): null,
      !tv.onTheAirTvShows ? getOnTheAirTvShows() : null,
      !tv.popularTvShows ? getPopularTvShows() : null,
      !tv.topRatedTvShows ? getTopRatedTvShows() : null,
      !trending.trendingData ? getTrendingData() : null,
    ]);
  }, []);
};

export default useDataFromTmdb;
