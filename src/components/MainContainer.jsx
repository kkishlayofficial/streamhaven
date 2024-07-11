import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const trendingData = useSelector((store) => store?.trending?.trendingData);
  const [mainMovie, setMainMovie] = useState(null);
  const getRandomMovie = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  
  useEffect(() => {
    if (!trendingData) return;
  
    let validMovie = false;
    while (!validMovie) {
      let mainMovie = trendingData?.[getRandomMovie(0, trendingData.length)];
      if (
        mainMovie &&
        mainMovie.original_title &&
        mainMovie.overview &&
        mainMovie.id &&
        mainMovie.poster_path &&
        mainMovie.backdrop_path &&
        mainMovie.original_language === 'en' && 
        new Date(mainMovie.release_date) < new Date(Date.now())
      ) {
        setMainMovie(mainMovie);
        validMovie = true;
      }
    }
  }, [trendingData])

  const { title, overview, id, poster_path, backdrop_path } =
    mainMovie || {};
  return (
    mainMovie && (
      <div className='relative'>
        <VideoTitle title={title} overview={overview} movie={mainMovie} />
        <VideoBackground
          videoId={id}
          posterId={poster_path}
          backdropId={backdrop_path}
        />
      </div>
    )
  );
};

export default MainContainer;
