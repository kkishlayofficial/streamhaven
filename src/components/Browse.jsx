import Header from "./Header";
import useDataFromTmdb from "../hooks/useDataFromTmdb";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import Details from "./Details/Details";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearSearchKeyword } from "../utils/searchSlice";
import { removeGenre, removeMovieFromList } from "../utils/allMovieSlice";

const Browse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useDataFromTmdb();
  const { type, videoId } = useSelector((state) => state.video);
  const details = useSelector((state) => state.details);

  const searchData = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(clearSearchKeyword());
    dispatch(removeGenre());
    dispatch(removeMovieFromList());
  }, []);

  useEffect(() => {
    if (searchData.keywords.length >= 2) navigate("/search");
  }, [searchData.keywords]);

  useEffect(() => {
    if (details?.detail) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [details?.detail]);

  return (
    <div className='relative'>
      <div className=''>
        <Header />

        <>
          <div>
            <MainContainer />
            <SecondaryContainer />
          </div>
        </>

        {/* <div className="mt-[90px] ">
      <iframe src="https://mostream.us/anime.php?id=136510&e=1" //id will come from the detail. no of episode as well.
width="100%" height="600px" frameborder="0" > </iframe>
      </div> */}

        {details.detail && <div className='absolute z-20'>
          <Details />
        </div>}
      </div>
      <div>
        {type && videoId && <VideoPlayer type={type} videoId={videoId} />}
      </div>
    </div>
  );
};

export default Browse;
