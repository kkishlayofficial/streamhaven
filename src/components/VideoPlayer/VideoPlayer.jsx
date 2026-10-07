import { useDispatch, useSelector } from "react-redux";
import { addVideoToStream, removeVideoFromStream } from "../../utils/videoSlice";
import { useEffect, useMemo, useRef, useState } from "react";
import Error from "../Error/Error";
import brandLogo from "../../images/StreamHaven.webp";

const VIDRIFT_ORIGIN = "https://embed.vidrift.net";
const BRAND_NAME = "StreamHaven";
const BRAND_COLOR = "E50914";
const RESUME_THRESHOLD = 10; // seconds, skip resuming near the very start
const FINISHED_THRESHOLD = 20; // seconds from the end, treat as watched

// webpack emits a root-relative path for the imported asset, not an absolute URL
const resolveBrandLogo = () => {
  if (typeof window === "undefined" || window.location.protocol !== "https:")
    return null;
  return brandLogo.startsWith("/")
    ? `${window.location.origin}${brandLogo}`
    : null;
};

const progressKey = (type, showId, season, episode) =>
  type === "tv"
    ? `streamhaven:progress:tv:${showId}:${season}:${episode}`
    : `streamhaven:progress:movie:${showId}`;

const readProgress = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const saveProgress = (key, currentTime, duration) => {
  try {
    if (duration && duration - currentTime < FINISHED_THRESHOLD) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify({ currentTime, duration }));
    }
  } catch {
    // storage unavailable (private mode / quota) - resume silently won't work
  }
};

// next { season, episode } to auto-advance to, or null when the show has nothing left
const computeNextEpisode = (seasonDetails, season, episode) => {
  const currentSeason = seasonDetails?.find((s) => s?.season_number === season);
  if (!currentSeason) return null;
  const episodeCount = currentSeason.episodes?.length ?? 0;
  if (episode < episodeCount) return { season, episode: episode + 1 };
  const nextSeason = seasonDetails?.find((s) => s?.season_number === season + 1);
  return nextSeason?.episodes?.length ? { season: season + 1, episode: 1 } : null;
};

const VideoPlayer = ({ type, videoId }) => {
  const dispatch = useDispatch();
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const { title, poster } = useSelector((state) => state.video);
  const { type: detailType, detail, seasonDetails } = useSelector(
    (state) => state.details
  );

  const [showId, seasonStr, episodeStr] =
    type === "tv" ? videoId.split("/") : [videoId];
  const season = Number(seasonStr);
  const episode = Number(episodeStr);

  const src = useMemo(() => {
    const params = new URLSearchParams();
    params.set("brand", BRAND_NAME);
    params.set("brandColor", BRAND_COLOR);
    params.set("exit", "1");
    if (title) params.set("title", title);
    if (poster) params.set("poster", poster);
    const resolvedLogo = resolveBrandLogo();
    if (resolvedLogo) params.set("brandLogo", resolvedLogo);
    return `${VIDRIFT_ORIGIN}/embed/${type}/${videoId}?${params.toString()}`;
  }, [type, videoId, title, poster]);

  useEffect(() => {
    setIsLoading(true);
  }, [src]);

  const handleCloseVideoPlayer = () => {
    dispatch(removeVideoFromStream());
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== VIDRIFT_ORIGIN) return;
      const data = event.data || {};

      switch (data.type) {
        case "vidrift:exit":
          dispatch(removeVideoFromStream());
          break;
        case "vidrift:ended": {
          const next =
            type === "tv" ? computeNextEpisode(seasonDetails, season, episode) : null;
          if (type === "movie" || !next) dispatch(removeVideoFromStream());
          break;
        }
        case "vidrift:progress":
          saveProgress(
            progressKey(type, showId, season, episode),
            data.currentTime,
            data.duration
          );
          break;
        case "vidrift:nextup-play": {
          const next = computeNextEpisode(seasonDetails, season, episode);
          if (next) {
            dispatch(
              addVideoToStream({
                type: "tv",
                videoId: `${showId}/${next.season}/${next.episode}`,
                title,
                poster,
              })
            );
          }
          break;
        }
        default:
          break;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [type, showId, season, episode, seasonDetails, title, poster, dispatch]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    const iframeWindow = iframeRef.current?.contentWindow;
    if (!iframeWindow) return;

    const saved = readProgress(progressKey(type, showId, season, episode));
    if (saved?.currentTime > RESUME_THRESHOLD) {
      iframeWindow.postMessage(
        { type: "vidrift:resume", currentTime: saved.currentTime },
        VIDRIFT_ORIGIN
      );
    }

    if (type === "tv" && detailType === "tv" && String(detail?.id) === showId) {
      iframeWindow.postMessage(
        {
          type: "vidrift:nextup-info",
          next: computeNextEpisode(seasonDetails, season, episode),
        },
        VIDRIFT_ORIGIN
      );
    }
  };

  if (!type || !videoId) {
    return (
      <div className='absolute top-0 left-0 z-30 overflow-hidden'>
        <div className='fixed'>
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
      </div>
    );
  }

  return (
    <div className='absolute top-0 left-0 z-30 overflow-hidden'>
      <div className='fixed'>
        {isLoading && (
          <div
            className='flex justify-center items-center'
            style={{ background: "#000", height: "100vh", width: "100vw" }}
          >
            <div
              className='animate-spin rounded-full border-4 h-12 w-12'
              style={{
                borderColor: "rgba(255,255,255,0.2)",
                borderTopColor: `#${BRAND_COLOR}`,
              }}
            ></div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          title={title || "Movie"}
          id='player_iframe'
          src={src}
          allow='autoplay; fullscreen'
          allowFullScreen
          referrerPolicy='strict-origin-when-cross-origin'
          style={{
            border: 0,
            height: "100vh",
            width: "100vw",
            display: isLoading ? "none" : "block",
          }}
          onLoad={handleIframeLoad}
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPlayer;
