import { useSelector } from "react-redux";
import useTrailerFromYoutube from "../hooks/useTrailerFromYoutube";
import { POSTER_PATH } from "../utils/constants";

const VideoBackground = ({ videoId, posterId, backdropId }) => {
  useTrailerFromYoutube(videoId);
  const trailerVideo = useSelector((state) => state.movies.trailerVideo);

  return (
    trailerVideo && (
      <div className='w-full'>
        <div className='hidden md:block'>
          <div className='fixed w-lvw h-full top-0 bottom-0 right-0 left-0 z-[5]'></div>
          <div className='overflow-x-hidden'>
            <iframe
              className='w-screen aspect-[13/8] lg:aspect-[15/8] 2xl:aspect-[17/7] scale-[1.5]'
              src={`https://www.youtube.com/embed/${trailerVideo?.key}?si=SeUBuAuZK85M69qc&autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo?.key}`}
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
            ></iframe>
          </div>
        </div>
        <div className='md:hidden w-full h-[42rem] relative'>
          <div
            className='poster-wrapper flex justify-center items-center h-full blur-sm mx-4 mt-0'
            style={{ backgroundImage: `url(${POSTER_PATH + backdropId})` }}
          ></div>
          <img
            src={POSTER_PATH + posterId}
            className='absolute m-auto top-0 bottom-0 left-0 right-0 rounded-lg  '
            alt='poster'
          />
        </div>
      </div>
    )
  );
};

export default VideoBackground;
