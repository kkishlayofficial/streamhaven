import React, { useEffect, useRef, useState } from "react";
import "./ShowList.css";
import EpisodeList from "../EpisodeList/EpisodeList";
import EpisodeCard from "../EpisodeCard";

const ShowList = ({ seasonDetails, setVideoToPlay, videoId }) => {

  const episodeListRef = useRef(null);

  const [showDropDown, setShowDropDown] = useState(false);
  const [showEpisodeDropDown, setShowEpisodeDropDown] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState({
    val: 1,
    name: seasonDetails?.[0]?.name,
  });

  const [selectedEpisode, setSelectedEpisode] = useState({
    val: 1,
    name: seasonDetails?.[0]?.episodes?.[0]?.name,
    overview: seasonDetails?.[0]?.episodes?.[0]?.overview,
  });

  const [overview, setOverview] = useState(
    seasonDetails?.[0]?.episodes?.[0]?.overview
  );

  useEffect(() => {
    setSelectedSeason({ val: 1, name: seasonDetails?.[0]?.name });
    setSelectedEpisode({
      val: 1,
      name: seasonDetails?.[0]?.episodes?.[0]?.name,
    });
  }, [seasonDetails]);


  const handleSeasonDropDownClick = (season = null, name = null) => {
    setSelectedSeason({ val: season, name: name });
    setSelectedEpisode({
      val: 1,
      name: seasonDetails?.[season - 1]?.episodes?.[0]?.name,
      overview: seasonDetails?.[season - 1]?.episodes?.[0]?.overview,
    });
    setOverview(seasonDetails?.[season - 1]?.episodes?.[0]?.overview)
    episodeListRef.current.scrollTo(0, 0);
    setShowDropDown(!showDropDown);
  };

  const handleEpisodeDropDownClick = (episode = null, name = null, overview = null) => {
    setSelectedEpisode({ val: episode, name: name, overview: overview });
    setOverview(overview)
    
    selectedSeason.val > 0 && setShowEpisodeDropDown(!showEpisodeDropDown);
    selectedSeason.val > 0 && setVideoToPlay({ type: 'tv', videoId: `${videoId}/${selectedSeason.val}/${episode}` })
  };

  useEffect(() => {
    selectedSeason.val > 0 && setVideoToPlay({ type: 'tv', videoId: `${videoId}/${1}/${1}` })
  }, [videoId])

  useEffect(() => {
    setOverview(seasonDetails?.[0]?.episodes?.[0]?.overview);
  }, [seasonDetails]);


  return (
    <div>
      <div
        className='hidden lg:block py-4 justify-between h-[360px]'
        style={{ background: "#131111e3" }}
      >
        <div className='episodeDetails h-full overflow-hidden'>
          <div className='seasonList h-full overflow-y-auto'>
            {seasonDetails?.map((item) => {
              const { _id, name, season_number } = item;
              return (
                <div
                  onClick={() => handleSeasonDropDownClick(season_number, name)}
                >
                  <EpisodeList
                    key={_id}
                    title={`Season ${season_number}`}
                    selected={selectedSeason.val === season_number}
                  />
                </div>
              );
            })}
          </div>
          <div
            ref={episodeListRef}
            className='episodesList h-full overflow-y-auto'
          >
            {seasonDetails?.[selectedSeason?.val - 1]?.episodes?.map((item) => {
              const {
                id,
                name,
                episode_number,
                overview,
              } = item;
              return (
                <div
                  onClick={() =>
                    handleEpisodeDropDownClick(episode_number, name, overview)
                  }
                >
                  <EpisodeCard
                    key={id}
                    name={name}
                    selected={selectedEpisode.val === episode_number}
                  />
                </div>
              );
            })}
          </div>
          <div className='overview px-6 text-sm text-left'>{overview}</div>
        </div>
      </div>
      <div className='lg:hidden'>
        <nav className="mt-3">
          <label onClick={handleSeasonDropDownClick} htmlFor='touch'>
            <span className='listItem rounded-lg'>
              {selectedSeason.val > 0 ? selectedSeason.name : "Seasons"}
            </span>
          </label>
          <input type='checkbox' id='touch' />

          {showDropDown && (
            <ul className='slide rounded-lg'>
              {seasonDetails?.map((item) => {
                const { _id, name, season_number } =
                  item;
                return (
                  <div
                    onClick={() =>
                      handleSeasonDropDownClick(season_number, name)
                    }
                  >
                    <EpisodeList
                      key={_id}
                      title={name}
                    />
                  </div>
                );
              })}
            </ul>
          )}
        </nav>

        <nav className="mt-3">
          <label onClick={handleEpisodeDropDownClick} htmlFor='touch'>
            <span className='listItem rounded-lg'>
              {selectedEpisode.val > 0 && selectedSeason.val > 0
                ? selectedEpisode.name
                : "Episodes"}
            </span>
          </label>
          <input type='checkbox' id='touch' />

          {selectedSeason.val > 0 && showEpisodeDropDown && (
            <ul className='slide rounded-lg'>
              {seasonDetails?.[selectedSeason?.val - 1]?.episodes?.map(
                (item) => {
                  const {
                    id,
                    name,
                    episode_number,
                  } = item;
                  return (
                    <div
                      onClick={() =>
                        handleEpisodeDropDownClick(episode_number, name)
                      }
                    >
                      <EpisodeCard
                        key={id}
                        name={name}
                      />
                    </div>
                  );
                }
              )}
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
};

export default ShowList;
