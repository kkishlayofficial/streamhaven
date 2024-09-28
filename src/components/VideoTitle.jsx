import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addDetail } from "../utils/detailsSlice";
import { addVideoToStream } from "../utils/videoSlice";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
import { LOGO_PATH, API_OPTIONS } from "../utils/constants";

const VideoTitle = ({ title, overview, movie }) => {
  const dispatch = useDispatch();
  const [imageArr, setImageArr] = useState([]);

  const handleMoreInfoClick = () => {
    dispatch(addDetail({ type: movie.title ? "movie" : "tv", detail: movie }));
  };

  const renderImages = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movie?.id}/images`,
        API_OPTIONS
      );
      const response = await data.json();
      setImageArr(response.logos.filter((item) => item.iso_639_1 === "en"));
    } catch (err) {
      console.log(err);
    }
  };

  const handlePlay = () => {
    dispatch(
      addVideoToStream({
        type: movie.title ? "movie" : "tv",
        videoId: `${movie.id}`,
      })
    );
  };

  useEffect(() => {
    setImageArr([])
    renderImages();
  }, [title]);

  return (
    <div className='absolute z-10 bottom-[5%] sm:bottom-[10%] md:bottom-[28%] 2xl:bottom-[30%] px-4 text-white w-screen'>
      {imageArr.length > 0 ? (
        <img
          className='rounded-lg my-3 hidden md:block'
          src={
            "https://wsrv.nl/?url=" +
            LOGO_PATH +
            imageArr[0]?.file_path +
            "&w=200&h=200&output=webp"
          }
          alt='logo'
          height={200}
          width={200}
        />
      ) : (
        <h1 className='hidden md:block text-3xl md:text-3xl lg:text-6xl font-bold text-center md:text-left'>
          {title}
        </h1>
      )}
      <p className='hidden 2xl:block py-6 w-1/3 text-sm'>{overview}</p>
      <div className='flex mt-4 sm:w-3/5 md:w-7/12 xl:w-1/3'>
        <button
          className='text-black bg-white text-md sm:text-lg font-bold px-8 py-3 w-1/2 sm:w-2/5 mr-4 rounded-md hover:opacity-80 flex justify-center items-center'
          onClick={handlePlay}
        >
          <PlayArrowIcon /> Play
        </button>
        <button
          onClick={handleMoreInfoClick}
          className='bg-opacity-70 flex justify-center items-center  text-white text-md font-bold px-8 py-3 w-1/2 sm:w-2/5 rounded-md hover:opacity-80'
          style={{ background: "#000000c1" }}
        >
          <InfoIcon fontSize='medium' className='mr-1' />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
