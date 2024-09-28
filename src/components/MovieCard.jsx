import React, { useEffect, useState } from "react";
import { API_OPTIONS, POSTER_PATH } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addDetail } from "../utils/detailsSlice";

const MovieCard = ({ title, posterPath, detail, bottom }) => {
  const dispatch = useDispatch();
  const [watchList, setWatchList] = useState(
    JSON.parse(localStorage.getItem("movie")) || []
  );
  const getMovieDetail = async (id) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        API_OPTIONS
      );
      const movieDetail = await data.json();
      dispatch(addDetail({ type: "movie", detail: movieDetail }));
    } catch (err) {
      console.log(err);
    }
  };

  const getTvDetail = async (id) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
        API_OPTIONS
      );
      const tvDetail = await data.json();
      dispatch(addDetail({ type: "tv", detail: tvDetail }));
    } catch (err) {
      console.log(err);
    }
  };
  const handleCardClick = (e) => {
    if (e.target.id === "addToWatchList") {
      let movies = JSON.parse(localStorage.getItem("movie")) || [];
      if (movies.length > 0) {
        movies.push(detail);
      } else {
        movies = [detail];
      }
      localStorage.setItem("movie", JSON.stringify(movies));
      console.log(JSON.parse(localStorage.getItem("movie")));
      setWatchList(movies);
    } else if (e.target.id === "removeFromWatchList") {
      let movies = JSON.parse(localStorage.getItem("movie")) || [];
      let idx = movies.findIndex((item) => item?.id === detail?.id);
      movies.splice(idx, 1);
      localStorage.setItem("movie", JSON.stringify(movies));
      console.log(JSON.parse(localStorage.getItem("movie")));
      setWatchList(movies);
    } else detail.title ? getMovieDetail(detail?.id) : getTvDetail(detail?.id);
  };

  
  useEffect(() => {
    renderCard();
  }, [watchList]);

  const renderCard = () => {
    return (
      <div
        className={`${bottom ? "w-full" : "w-36 sm:w-44"} ${
          bottom ? "pb-4 pr-2" : "pr-4"
        }`}
        onClick={handleCardClick}
      >
        <img
          alt={`${detail.name || detail.title}`}
          className='p-3 rounded-lg w-[136px] h-[190px] object-contain'
          style={{
            background: "rgba(255,255,255,.05)",
            boxShadow: "0 0 10px rgba(0,0,0,0.25)",
            backdropFilter: "blur(10px)",
            width: '100%',
            height: '80%',
          }}
          src={"https://wsrv.nl/?url=" +
          POSTER_PATH + posterPath +
            "&w=127&h=190&output=webp"}
        />
        {watchList.findIndex((item) => item?.id === detail?.id) > -1 ? (
          <button
            className='bg-white text-black text-center rounded-md w-full px-3 py-2'
            id='removeFromWatchList'
          >
            Remove from List
          </button>
        ) : (
          <button
            className='bg-white text-black text-center rounded-md w-full px-3 py-2'
            id='addToWatchList'
          >
            Add to List
          </button>
        )}
      </div>
    );
  };

  return <>{renderCard()}</>;
};

export default MovieCard;
