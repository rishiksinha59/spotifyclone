import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SongItem from "./SongItem";
import { Bars } from "react-loading-icons";

const PlayLists = ({ selectedSong, selectSong, songs, backgroundColor }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("For You");

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(loadTimeout);
  }, []);

  const filteredSongs = songs.filter(
    (song) =>
      song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedSongs =
    selectedTab === "For You" ? filteredSongs : filteredSongs.slice(0, 4);

  return (
    <div className="max-w-[432px] mx-auto z-50 min-w-[290px]  flex-shrink-0 w-full h-[650px] md:h-full flex flex-col ">
      {/* Tab Selection */}
      <div className="flex pl-2 gap-[40px] w-full leading-[32px] my-5 sm:my-[25px] md:my-[35px] font-[700]">
        <h2
          className={`text-[18px] sm:text-[24px] cursor-pointer ${
            selectedTab === "For You" ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => setSelectedTab("For You")}
        >
          For You
        </h2>
        <h2
          className={`text-[18px] sm:text-[24px] cursor-pointer ${
            selectedTab === "Top Tracks" ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => setSelectedTab("Top Tracks")}
        >
          Top Tracks
        </h2>
      </div>
      
      {/* Search Bar */}
      <div className="sticky top-0 z-10">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          backgroundColor={backgroundColor}
          
        />
      </div>
      
      {/* Song List */}
      {loading ? (
        <div className="flex justify-center   items-center py-[150px]">
          <div className="loader">
            <Bars />
          </div>
        </div>
      ) : (
        <div className="mt-4 space-y-2  overflow-y-scroll flex-grow">
          {displayedSongs.map((song) => (
            <SongItem
              key={song.id}
              song={song}
              selectSong={selectSong}
              isSelected={selectedSong && song.id === selectedSong.id}
              backgroundColor={backgroundColor}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayLists;
