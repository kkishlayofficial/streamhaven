import { useDispatch } from "react-redux";
import { removeVideoFromStream } from "../../utils/videoSlice";
import { useEffect, useState } from "react";
import Error from "../Error/Error";

const VideoPlayer = ({ type, videoId }) => {
  const dispatch = useDispatch();
  const [showErrorScreen, setShowErrorScreen] = useState(false);
  const [player, setPlayer] = useState("");
  const superEmbedData = type === "movie" ? videoId : videoId.split("/");
  console.log(videoId)
  const playersArr = [
    `https://vidsrc.pro/embed/${type}/${videoId}?&autoplay=0&theme=E50914`,
    `https://vidsrc.to/embed/${type}/${videoId}`,
    `https://vidsrc.in/embed/${type}/${videoId}`,
    `https://vidsrc.pm/embed/${type}/${videoId}`,
    `https://vidsrc.xyz/embed/${type}/${videoId}`,
    `https://player.smashy.stream/${type}/${type === 'movie' ? superEmbedData : `${superEmbedData[0]}?s=${superEmbedData[1]}&e=${superEmbedData[1]}`}`,
    `https://player.autoembed.cc/embed/${type}/${videoId}`,
  ];
  // `https://www.2embed.cc/embed${type === 'movie' ? '' : 'tv'}/${type === 'movie' ? superEmbedData : `${superEmbedData[0]}&s=${superEmbedData[1]}&e=${superEmbedData[1]}`}`, Cors Issue
  // `https://multiembed.mov/directstream.php?${type === 'movie' ? `video_id=${superEmbedData}&tmdb=1` : `video_id=${superEmbedData[0]}&tmdb=1&s=${superEmbedData[1]}&e=${superEmbedData[1]}`}` Cors Issue

  // const getAnimeList = async() => {
  //   const data = await fetch('https://api.animetsu.cc/ep-covers?id=20') https://vidsrc.pro/api/anime/episodes/113415 //Id will come from Anilist. And this will give list of episodes
  //   const res = await data.json();
  //   console.log(res);
  // }

  const fetchPlayer = async () => {
    let videoUrl = "";
    for (let playerPromise of playersArr) {
      try {
        const response = await fetch(playerPromise);
        if (response.status === 200) {
          videoUrl = response.url;
          break; // Exit the loop if a 200 response is found
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    if (videoUrl) {
      setShowErrorScreen(false);
      setPlayer(videoUrl);
    } else {
      setShowErrorScreen(true);
    }
  };

  useEffect(() => {
    fetchPlayer();
  }, []);

  const handleCloseVideoPlayer = () => {
    setShowErrorScreen(false);
    dispatch(removeVideoFromStream());
  };

  return (
    <div className='absolute top-0 left-0 z-30 overflow-hidden'>
      <div className='fixed'>
        {showErrorScreen ? (
          <div>
            <button
              className='close glass-button'
              onClick={handleCloseVideoPlayer}
            ></button>
            <div
              className='flex justify-center items-center'
              style={{ background: "#c7b29e", height: "100vh", width: "100vw" }}
            >
              <Error />
            </div>
          </div>
        ) : (
          player.length > 0 && (
            <div>
              <button
                className='close glass-button'
                onClick={handleCloseVideoPlayer}
              ></button>
              <iframe
                title='Movie'
                id='player_iframe'
                src={player}
                allowFullScreen
                  style={{ height: "100vh", width: "100vw" }}
                  referrerPolicy="origin"
                ></iframe>
              {/* <iframe
                src='https://vidsrc.pro/embed/anilist/20954/1?audio=dub&autoplay=0&theme=F52E8E"' // For anime
                title='Movie'
                id='player_iframe'
                allowFullScreen='yes'
                style={{ height: "100vh", width: "100vw" }}
              ></iframe> */}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
