import React, { useEffect, useState } from "react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchKeyword } from "../../utils/searchSlice";
import { API_OPTIONS } from "../../utils/constants";
import {
  addMovieToList,
  removeMovieFromList,
  setGenre,
  updatePage,
} from "../../utils/allMovieSlice";
import MovieCard from "../MovieCard";
import Details from "../Details/Details";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

import FormControl from "@mui/material/FormControl";
import { MenuItem, Select } from "@mui/material";

const PageContent = ({ pageType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { type, videoId } = useSelector((state) => state.video);
  const { genre, movieList, page } = useSelector((state) => state.allMovies);
  const searchData = useSelector((state) => state.search);
  const details = useSelector((state) => state.details);
  const [hasMore, setHasMore] = useState(true);
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    if (details?.detail) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [details?.detail]);

  const fetchGenreList = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/genre/${pageType}/list?language=en`,
        API_OPTIONS
      );
      const genreList = await data.json();
      setGenreList(genreList.genres);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMovieList = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/discover/${pageType}?include_adult=true&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc${
          genre > 0 ? `&with_genres=${genre}` : ""
        } `,
        API_OPTIONS
      );
      const result = await data.json();
      setHasMore(result.total_pages > page);
      hasMore && dispatch(updatePage(page+1));
      dispatch(
        addMovieToList(
          result.results.sort((a, b) => b.vote_count - a.vote_count)
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    searchData.keywords.length > 0 && clearSearchKeyword();
    fetchGenreList();
    if (!genre) dispatch(setGenre(0));
  }, []);

  useEffect(() => {
    if (searchData.keywords.length >= 2) navigate("/search");
  }, [searchData.keywords]);

  useEffect(() => {
    if (movieList.length === 0) {
      if (!isNaN(genre)) {
        dispatch(updatePage(1));
        fetchMovieList();
      } else {
        dispatch(setGenre(0));
      }
    }
  }, [genre]);

  const handleMoreClick = () => {
    fetchMovieList();
  };

  const handleChange = (event) => {
    dispatch(removeMovieFromList());
    dispatch(updatePage(1));
    dispatch(setGenre(event.target.value));
  };

  return (
    <div className='relative'>
      <Header />
      <div>
        <div className='pt-[140px]'>
          <div className='genre px-2 pb-4'>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <Select
                value={genre}
                sx={{
                  backgroundColor: "#25212131",
                  color: "#fff",
                  boxShadow: "rgba(188, 185, 185, 0.56) 0px 22px 70px 4px",
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                }}
                onChange={handleChange}
                displayEmpty
                inputProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: { backgroundColor: "#080707f8", color: "#fff" },
                    },
                  },
                }}
              >
                <MenuItem value='0'>All</MenuItem>
                {genreList?.map((item, index) => {
                  return (
                    <MenuItem
                      className='text-white'
                      key={`${item.id}-${index}`}
                      value={item.id}
                    >
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className='movieList'>
            <div className='px-4 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10 m-0 w-full'>
              {movieList
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
                )}
            </div>
            {hasMore && (
              <div>
                <div className='flex justify-center mt-5 pb-7'>
                  <button className='btn' onClick={handleMoreClick}>
                    <i className='animation'></i>Load More Items
                    <i className='animation'></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {details.detail && (
        <div className='absolute z-20'>
          <Details />
        </div>
      )}

      <div>
        {type && videoId && <VideoPlayer type={type} videoId={videoId} />}
      </div>
    </div>
  );
};

export default PageContent;
