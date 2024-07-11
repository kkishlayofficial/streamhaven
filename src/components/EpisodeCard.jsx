import React from "react";

const EpisodeCard = ({ name, selected }) => {
  return (
    <div className='px-4'>
      <div
        className='py-4'
        style={{
          backgroundColor: selected && "#c8bdbda3",
          color: selected && "black",
        }}
      >
        <h1 className='lg:hidden text-white text-lg lg:text-2xl font-bold py-3'>
          {name}
        </h1>
        <h1 className='hidden lg:block text-white text-lg mx-3'>{name}</h1>
      </div>
    </div>
  );
};

export default EpisodeCard;
