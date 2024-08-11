import React, { useEffect, useState } from "react";

const SongItem = ({ song, selectSong, isSelected, backgroundColor }) => {
  const [duration, setDuration] = useState("00:00");

  useEffect(() => {
    const audio = new Audio(song.url);
    audio.addEventListener("loadedmetadata", () => {
      const minutes = Math.floor(audio.duration / 60);
      const seconds = Math.floor(audio.duration % 60)
        .toString()
        .padStart(2, "0");
      setDuration(`${minutes}:${seconds}`);
    });
  }, [song.url]);

  return (
    <div
      onClick={() => selectSong(song)}
      className={`flex justify-between items-center p-2 rounded-md cursor-pointer
      ${isSelected ? `bg-opacity-80` : "hover:bg-gray-700"}`} // Increase opacity for selected song
      style={{
        backgroundColor: isSelected ? backgroundColor : undefined,
      }}
    >
      <div className="flex items-center">
        <img
          src={`https://cms.samespace.com/assets/${song.cover}`}
          alt={song.name}
          className="w-10 h-10 rounded-md mr-4"
        />
        <div>
          <h4 className="text-white font-medium text-[18px]">{song.name}</h4>
          <p className="text-gray-400 text-[14px]">{song.artist}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-gray-400">{duration}</p>
        {isSelected ? <img src="/audio.gif" alt="" className="w-8 pb-1.5" /> : " "}
      </div>
    </div>
  );
};

export default SongItem;
