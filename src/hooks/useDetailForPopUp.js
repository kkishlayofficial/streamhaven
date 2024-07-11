import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useDetailForPopup = (type, detail, setContentRecommendation) => {
  const getMovieRecommendation = async (id) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
      API_OPTIONS
    );
    const movieRecommendation = await data.json();
    if (movieRecommendation.results.length < 1) {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
        API_OPTIONS
      );
      const movieRecommendation = await data.json();
      setContentRecommendation(movieRecommendation.results);
    }
    else setContentRecommendation(movieRecommendation.results);
  };

  const getTvRecommendation = async (id) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`,
      API_OPTIONS
    );
    const tvRecommendation = await data.json();
    if (tvRecommendation.results.length < 1) {
      const data = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`,
        API_OPTIONS
      );
      const tvRecommendation = await data.json();
      setContentRecommendation(tvRecommendation.results);
    }
    else setContentRecommendation(tvRecommendation.results);
  };

  useEffect(() => {
    if (type === "tv") {
      getTvRecommendation(detail.id);
    } else if (type === "movie") {
      getMovieRecommendation(detail.id);
    }
  }, [type, detail]);
};

export default useDetailForPopup;
