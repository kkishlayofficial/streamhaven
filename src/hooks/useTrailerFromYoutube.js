import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTrailerFromYoutube = (videoId) => {
  const dispatch = useDispatch();
  const videoData = useSelector(state => state.movies)
  const getMovieVideo = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${videoId}/videos`,
        API_OPTIONS
      );
      const videoData = await data.json();
      const filteredData = videoData.results.filter(
        (item) => item.type === "Trailer"
      );
      const trailer =
        filteredData.length > 0 ? filteredData?.[0] : videoData?.[0];
      dispatch(addTrailerVideo(trailer));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if(!videoData.trailer) getMovieVideo();
  }, [videoId]);
};

export default useTrailerFromYoutube;
