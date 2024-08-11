import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Player from "../Components/Players";
import PlayLists from "../Components/PlayLists";
import axios from "axios";
import { FaMusic } from "react-icons/fa6";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Home = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [songs, setSongs] = useState([]);
  const [user, setUser] = useState(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    axios
      .get("https://cms.samespace.com/items/songs")
      .then((res) => {
        setSongs(res.data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (play && selectedSong) {
      setPlay(false);
    }
  }, [selectedSong]);

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  const backgroundColor = selectedSong ? selectedSong.accent : "#1a202c"; // Default color

  return (
    <div
      className="h-screen  overflow-clip text-white transition-background bg-gradient-to-l from-gray-900"
      style={{ backgroundColor }} 
    >
      <div className="md:hidden">
           <Header user={user} handleGoogle={handleGoogle} play={play} setPlay={setPlay} />

      </div>
      <div className="sm:flex  max-h-[1000px] h-[100%] overflow-clip max-w-[1450px] md:px-[32px] px-5 mx-auto gap-5 justify-around">
      <div className="hidden md:block">

      <Header user={user} handleGoogle={handleGoogle} play={play} setPlay={setPlay} />
      </div>
        <div className="hidden  px-1 sm:block h-[100%] w-full overflow-y-scroll">
          <PlayLists selectSong={setSelectedSong} selectedSong={selectedSong} setSongs={setSongs} songs={songs} backgroundColor={backgroundColor}/>
        </div>
        {play && (
          <div 
          className={`absolute mx-5  px-3 rounded-b-lg rounded-tl-lg z-40 right-0 left-0 bg-slate-800 h-[91.2%] overflow-y-scroll sm:hidden transition-all duration-500 ease-in-out ${
            play ? "transform scale-100" : "transform scale-0 origin-top-right"
          }`}
           style={{backgroundColor: backgroundColor}}>
            <PlayLists selectSong={setSelectedSong} selectedSong={selectedSong} setSongs={setSongs} songs={songs} backgroundColor={backgroundColor}/>
          </div>
        )}
        {selectedSong ? (
          <div className="flex flex-col justify-center  w-full ">
            <Player selectedSong={selectedSong} songs={songs} setSelectedSong={setSelectedSong} />
          </div>
        ) : (
          <div className="flex flex-col  md:max-w-[500px] w-full h-[70svh] sm:h-auto justify-center text-[30px] sm:text-[35px] lg:text-[45px] font-semibold items-center text-center tracking-wider opacity-50">
            <span className="ml-4 border">
              Please Select
              <br />a Song
            <FaMusic className="mx-auto text-[40px] sm:text-[50px] md:text-[60px] m-5" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;