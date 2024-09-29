import React, { useState } from "react";
import Header from "../Header";
import Details from "../Details/Details";
import MovieCard from "../MovieCard";
import { useSelector } from "react-redux";

const MyList = () => {
  const [watchList] = useState(JSON.parse(localStorage.getItem("movie")) || []);
  const details = useSelector((state) => state.details);
  const renderCards = () => {
    return watchList
      ?.filter((item) => item.vote_count > 0 && item.vote_average > 0)
      .map(
        (item, idx) =>
          item.poster_path && (
            <MovieCard
              bottom={true}
              key={item.id + idx}
              title={item.name ?? item.title}
              posterPath={item.poster_path}
              detail={item}
            />
          )
      );
  };

  return (
    <div className='relative'>
      <Header />
      {watchList.length > 0 ? (
        <>
          <div>
            <div className='pt-[140px]'>
              <div className='movieList'>
                <div className='px-4 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10 m-0 w-full'>
                  {renderCards()}
                </div>
              </div>
            </div>
          </div>

          {details.detail && (
            <div className='absolute z-20'>
              <Details />
            </div>
          )}
        </>
      ) : (
        <div className=' pt-[140px] text-white font-bold text-center'>
          Please add items to your watch list !!!
        </div>
      )}

      <div>
        {/* {type && videoId && <VideoPlayer type={type} videoId={videoId} />} */}
      </div>
    </div>
  );
};

export default MyList;
