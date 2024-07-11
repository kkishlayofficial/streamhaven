import { useEffect, useRef } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const similarRef = useRef(null);

  useEffect(() => {
    similarRef.current.scrollLeft = 0;
  }, [title, movies]);

  return (
    <div className='px-4 pb-4'>
      <h1 className='text-white text-lg lg:text-2xl font-bold py-3'>{title}</h1>
      <div className='flex overflow-x-scroll no-scrollbar' ref={similarRef}>
        <div className='flex'>
          {movies?.map((item) => {
            return (
              item.poster_path && (
                <MovieCard
                  detail={item}
                  key={item.id}
                  title={item.name}
                  posterPath={item.poster_path ?? item.still_path}
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
