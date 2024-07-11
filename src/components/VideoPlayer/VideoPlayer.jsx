import { useDispatch } from "react-redux";
import { removeVideoFromStream } from "../../utils/videoSlice";
import { useEffect, useState } from "react";
import Error from "../Error/Error";

const VideoPlayer = ({ type, videoId }) => {
  const dispatch = useDispatch();
  const [showErrorScreen, setShowErrorScreen] = useState(false);
  const [player, setPlayer] = useState("");

  const playersArr = [
    `https://vidsrc.me/embed/${type}/${videoId}`,
    `https://vidsrc.pro/embed/${type}/${videoId}`,
    `https://vidsrc.in/embed/${type}/${videoId}`,
    `https://vidsrc.to/embed/${type}/${videoId}`,
    `https://vidsrc.pm/embed/${type}/${videoId}`,
    `https://vidsrc.xyz/embed/${type}/${videoId}`,
  ];

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
                allowFullScreen='yes'
                style={{ height: "100vh", width: "100vw" }}
              ></iframe>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
