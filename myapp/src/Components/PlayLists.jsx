import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SongItem from "./SongItem";
import { Bars } from "react-loading-icons";

const PlayLists = ({ selectedSong, selectSong, songs }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("For You");

  useEffect(() => {
    // Simulate loading effect
    const loadTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(loadTimeout);
  }, []);

  const filteredSongs = songs.filter((song) => song.name.toLowerCase().includes(searchTerm.toLowerCase()) || song.artist.toLowerCase().includes(searchTerm.toLowerCase()));

  const displayedSongs = selectedTab === "For You" ? filteredSongs : filteredSongs.slice(0, 4);

  return (
    <div className="max-w-[432px] mx-auto z-50 min-w-[290px] flex-shrink-0  w-full   block overflow-y-scroll">
        <div className="flex pl-2 gap-[40px] w-[100%]  leading-[32px] my-5 sm:my-[25px] md:my-[35px] font-[700]">
          <h2 className={`text-[24px] cursor-pointer ${selectedTab === "For You" ? "opacity-100" : "opacity-50"}`} onClick={() => setSelectedTab("For You")}>
            For You
          </h2>
          <h2 className={`text-[24px] cursor-pointer ${selectedTab === "Top Tracks" ? "opacity-100" : "opacity-50"}`} onClick={() => setSelectedTab("Top Tracks")}>
            Top Tracks
          </h2>
        </div>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {loading ? (
        <div className="flex justify-center items-center py-[150px]">
          <div className="loader">
            <Bars />
          </div>
        </div>
      ) : (
        <div className="mt-4 space-y-2  overflow-y-scroll">
          {displayedSongs.map((song) => (
            <SongItem key={song.id} song={song} selectSong={selectSong} isSelected={selectedSong && song.id === selectedSong.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayLists;
