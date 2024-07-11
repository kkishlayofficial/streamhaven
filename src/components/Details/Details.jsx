import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEpisodeDetails,
  removeDetail,
  removeEpisodeDetails,
} from "../../utils/detailsSlice";
import "./Details.css";
import { API_OPTIONS, BACKDROP_URL, POSTER_PATH } from "../../utils/constants";
import MovieList from "../MovieList";
import { addVideoToStream } from "../../utils/videoSlice";
import useDetailForPopup from "../../hooks/useDetailForPopUp";
import ShowList from "../ShowList/ShowList";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const Details = () => {
  const [contentRecommendation, setContentRecommendation] = useState(null);
  const [videoToPlay, setVideoToPlay] = useState(null);

  const contentRef = useRef(null);
  const similarRef = useRef(null);

  const { type, detail, seasonDetails } = useSelector(
    (store) => store?.details
  );
  const dispatch = useDispatch();

  useDetailForPopup(type, detail, setContentRecommendation);

  const handleClose = () => {
    dispatch(removeDetail());
    dispatch(removeEpisodeDetails());
  };

  const handlePlay = () => {
    dispatch(addVideoToStream(videoToPlay));
  };

  const fetchEpisodesBySeason = async (id, seasonNo) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${seasonNo}?language=en-US`,
      API_OPTIONS
    );
    const list = await data.json();
    return list;
  };

  const getEpisodeDetails = async (detail) => {
    dispatch(removeEpisodeDetails());
    let fetchCall = [];
    for (let i = 1; i <= detail.number_of_seasons; i++) {
      fetchCall.push(fetchEpisodesBySeason(detail.id, i));
    }
    let results = await Promise.allSettled(fetchCall);
    const orderedResults = results.map((result) =>
      result.status === "fulfilled" ? result.value : null
    );
    dispatch(addEpisodeDetails(orderedResults));
  };

  useEffect(() => {
    if (detail) {
      getEpisodeDetails(detail);
      type === "movie" && setVideoToPlay({ type, videoId: `${detail.id}` });
    }
    contentRef.current.scrollTo(0, 0);
  }, [detail]);

  return (
    <div className='don'>
      <div className={`dialog ${detail ? "dialog--open" : "dialog--close"}`}>
        <div className='dialog__overlay w-full h-full top-0 left-0'></div>
        <div
          ref={contentRef}
          className='dialog__content text-white w-full p-[1em] md:p-0 md:w-[95%] xl:p-0 rounded-lg h-[99vh] md:h-[75vh] lg:max-h-[90vh]'
        >
          <button
            className='flex close glass-button'
            onClick={handleClose}
          ></button>
          <div
            style={{
              backgroundImage: `url(${BACKDROP_URL + detail?.backdrop_path})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            className='lg:h-[55vh] xl:h-[55vh] rounded-lg'
          >
            <div
              className='h-full rounded-lg'
              style={{ background: "#131111c6" }}
            >
              <div className='movieDetail flex flex-col items-center md:flex-row xl:px-20 rounded-lg py-3 px-12 '>
                <div className='poster mx-4 my-2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/5 2xl:w-1/6'>
                  <img
                    className='rounded-lg shadow-[0_35px_60px_-15px_rgba(255,255,255,0.3)] h-60 xl:h-96'
                    src={POSTER_PATH + detail?.poster_path}
                    alt={detail?.name ?? detail?.title}
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.85) 0px 22px 70px 4px",
                    }}
                  />
                </div>
                <div className='detail md:w-2/4 sm:text-left px-8 sm:pl-0 sm:pr-6 xl:px-8'>
                  <div className='title text-3xl font-bold'>
                    {(detail?.name || detail?.title) ?? '' } 
                  </div>
                  <div className='tagline italic'>{detail?.tagline}</div>
                  <div className='flex justify-center sm:justify-start text-gray-300 font-medium py-1 sm:max-w-68'>
                    <div className='releaseDate text-sm pr-4'>
                      {detail?.first_air_date ?? detail?.release_date}
                    </div>
                    <div className='avgRating text-sm'>
                      {detail?.vote_average ? `${Math.round(detail?.vote_average * 10)}%` : ''}
                    </div>
                  </div>

                  <div className='genre text-sm py-3'>
                    {detail?.genres?.map((genre) => genre.name).join(", ")}
                  </div>
                  <div className='overview text-[10px] xl:text-xs mb-3'>
                    {detail?.overview}
                  </div>
                  <div className="flex justify-center sm:justify-start">
                  <button
                    className='text-black bg-white text-md sm:text-lg font-bold px-16 py-3 mr-4 rounded-md hover:opacity-80  flex justify-center items-center'
                    onClick={handlePlay}
                  >
                    <PlayArrowIcon/> Play
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={type === "tv" ? `lg:-mt-4` : `lg:-mt-4`}>
            {type === "tv" ? (
              <ShowList
                videoId={detail.id}
                seasonDetails={seasonDetails}
                setVideoToPlay={setVideoToPlay}
              />
            ) : null}

            {contentRecommendation && (
              <div>
                <div ref={similarRef}>
                  <MovieList
                    title={"Similar To This"}
                    movies={contentRecommendation}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
