import React, { useEffect, useRef, useState } from "react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../../utils/constants";
import { addResultsToList, removeSearchResults } from "../../utils/searchSlice";
import "./Search.css";
import MovieCard from "../MovieCard";
import Details from "../Details/Details";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { type, videoId } = useSelector((state) => state.video);
  const searchData = useSelector((state) => state.search);
  const details = useSelector((state) => state.details);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const searchBarTimeoutId = useRef(null);

  console.log(currentPage);

  useEffect(() => {
    if (searchData.keywords.length < 1) {
      clearTimeout(searchBarTimeoutId.current);
      searchBarTimeoutId.current = setTimeout(() => {
        navigate(-1);
        dispatch(removeSearchResults());
      }, [1500]);
    }
    return () => clearTimeout(searchBarTimeoutId.current);
  }, [searchData.keywords, dispatch]);

  const timeoutIdRef = useRef(null);
  const abortControllerRef = useRef(null);

  const fetchSearchData = async (signal, page) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${searchData.keywords}&include_adult=false&language=en-US&page=${page}`,
        { ...API_OPTIONS, signal }
      );

      const result = await data.json();

      setHasMore(result.total_pages > result.page);
      hasMore && setCurrentPage(result.page);
      dispatch(
        addResultsToList(
          result.results.sort((a, b) => b.vote_count - a.vote_count)
        )
      );
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        console.error("Fetch error:", error);
      }
    }
  };

  useEffect(() => {
    if (searchData.keywords.length >= 2) {
      dispatch(removeSearchResults());
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      timeoutIdRef.current = setTimeout(() => {
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;
        fetchSearchData(signal, 1);
      }, 800);
    }

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [searchData.keywords, dispatch]);

  const handleMoreClick = () => {
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    fetchSearchData(signal, currentPage + 1);
  };

  useEffect(() => {
    if (details?.detail) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [details?.detail]);

  return (
    <div className='relative'>
      <Header />
      <div className=''>
        <div className='pt-[90px] px-4 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10 m-0 w-full'>
          {searchData?.dataList
            ?.filter(
              (item) => item.media_type === "tv" || item.media_type === "movie"
            )
            .filter((item) => item.vote_count > 0 && item.vote_average > 0)
            .map(
              (item) =>
                item.poster_path && (
                  <MovieCard
                    bottom={true}
                    key={item.id}
                    title={item.name ?? item.title}
                    posterPath={item.poster_path}
                    detail={item}
                  />
                )
            )}
        </div>
        {hasMore && (
          <div>
            <div className='flex justify-center my-5'>
              <button className='btn' onClick={handleMoreClick}>
                <i className='animation'></i>Load More Items
                <i className='animation'></i>
              </button>
            </div>
          </div>
        )}
        {!hasMore && searchData?.dataList?.length < 1 && (
          <div className='text-white px-2'>No items found</div>
        )}
      </div>
      <div className='absolute z-20'>
        <Details />
      </div>

      <div>
        {type && videoId && <VideoPlayer type={type} videoId={videoId} />}
      </div>
    </div>
  );
};

export default Search;

// const handleScroll = () => {
//   // if (
//   //   window.innerHeight + document.documentElement.scrollTop + 50 >=
//   //     document.documentElement.scrollHeight &&
//   //   hasMore &&
//   //   !timeoutIdRef.current // Ensure not currently fetching
//   // ) {
//   //   abortControllerRef.current = new AbortController();
//   //   const signal = abortControllerRef.current.signal;
//   //   setCurrentPage((prevPage) => {
//   //     const nextPage = prevPage + 1;
//   //     fetchSearchData(signal, nextPage);
//   //     return nextPage;
//   //   });
//   // }
// };

// useEffect(() => {
//   window.addEventListener("scroll", handleScroll);
//   return () => window.removeEventListener("scroll", handleScroll);
// }, [hasMore]);
