import React from 'react'
import { API_OPTIONS, POSTER_PATH } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addDetail } from '../utils/detailsSlice';

const MovieCard = ({ title, posterPath, detail, bottom }) => {
  const dispatch = useDispatch();

  const getMovieDetail = async (id) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        API_OPTIONS
      );
      const movieDetail = await data.json();
      dispatch(addDetail({ type: 'movie', detail: movieDetail }))
    }
    catch (err) {
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
      dispatch(addDetail({ type: 'tv', detail: tvDetail }))
    }
    catch (err) {
      console.log(err);
    }
  };
  const handleCardClick = () => {

    detail.title ? getMovieDetail(detail?.id) : getTvDetail(detail?.id);
  }

  return (
    <div className={`${bottom ? 'w-full' : 'w-36 sm:w-44'} ${bottom ? 'pb-4 pr-2' : 'pr-4'}`} onClick={handleCardClick} >
      <img alt={title} className='p-3 rounded-lg' style={{
        background: 'rgba(255,255,255,.05)',
        boxShadow: '0 0 10px rgba(0,0,0,0.25)',
        backdropFilter: 'blur(10px)'
      }} src={POSTER_PATH + posterPath} />
    </div>
  )
}

export default MovieCard