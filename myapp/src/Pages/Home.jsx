import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Player from "../Components/Players";
import PlayLists from "../Components/PlayLists";
import axios from "axios";

const Home = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get("https://cms.samespace.com/items/songs")
      .then((res) => {
        setSongs(res.data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const backgroundColor = selectedSong ? selectedSong.accent : "#1a202c"; // Default color

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-3 h-screen text-white transition-background bg-gradient-to-l from-gray-900"
      style={{ backgroundColor }} // Apply the dynamic background color
    >
      {" "}
      <div className="hidden lg:flex ">
        <Header />
      </div>
      <PlayLists
        selectSong={setSelectedSong}
        selectedSong={selectedSong}
        setSongs={setSongs}
        songs={songs}
      />
      {selectedSong && (
        <div className="flex flex-col justify-center">
          <Player
            selectedSong={selectedSong}
            songs={songs}
            setSelectedSong={setSelectedSong}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
