import React from "react";
import MovieList from "./MovieList";
import useListOfContent from "../hooks/useListOfContent";

const SecondaryContainer = () => {
  const contentList = useListOfContent();
  return (
    <div className='relative z-10 bg-opacity-90 pb-20'>
      <div className='sm:-mt-3 md:-mt-24 lg:-mt-32 xl:-mt-40 2xl:-mt-48'>
        {contentList?.map((item) => {
          return (
            <MovieList key={item.title} title={item.title} movies={item.data} />
          );
        })}
      </div>
    </div>
  );
};

export default SecondaryContainer;
