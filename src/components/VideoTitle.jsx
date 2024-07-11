import React from "react";
import { useDispatch } from "react-redux";
import { addDetail } from "../utils/detailsSlice";
import { addVideoToStream } from "../utils/videoSlice";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";

const VideoTitle = ({ title, overview, movie }) => {
  const dispatch = useDispatch();

  const handleMoreInfoClick = () => {
    dispatch(addDetail({ type: movie.title ? "movie" : "tv", detail: movie }));
  };

  const handlePlay = () => {
    dispatch(
      addVideoToStream({
        type: movie.title ? "movie" : "tv",
        videoId: `${movie.id}`,
      })
    );
  };

  return (
    <div className='absolute z-10 bottom-[5%] sm:bottom-[10%] md:bottom-[28%] 2xl:bottom-[30%] px-4 text-white w-screen'>
      <h1 className='hidden md:block text-3xl md:text-3xl lg:text-6xl font-bold text-center md:text-left'>
        {title}
      </h1>
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
