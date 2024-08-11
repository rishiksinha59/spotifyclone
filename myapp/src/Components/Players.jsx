import React, { useRef, useState, useEffect } from "react";
import { FiRepeat } from "react-icons/fi";
import { FaCirclePlay } from "react-icons/fa6";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import { HiSpeakerWave } from "react-icons/hi2";
import { FaCirclePause } from "react-icons/fa6";
import { MdTimer } from "react-icons/md";
import { GoKebabHorizontal } from "react-icons/go";

const Player = ({ selectedSong, songs, setSelectedSong }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [showTimerOptions, setShowTimerOptions] = useState(false);
  const [timerDuration, setTimerDuration] = useState(0);
  const [timerActivated, setTimerActivated] = useState(false);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
      audioRef.current.removeEventListener("ended", handleSongEnd);
    }

    if (selectedSong && selectedSong.url) {
      audioRef.current = new Audio(selectedSong.url);

      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Play was interrupted:", error);
        });
        startProgress();
      }

      audioRef.current.addEventListener("ended", handleSongEnd);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        clearInterval(intervalRef.current);
        audioRef.current.removeEventListener("ended", handleSongEnd);
      }
    };
  }, [selectedSong, repeat]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Play was interrupted:", error);
        });
        startProgress();
      } else {
        audioRef.current.pause();
        clearInterval(intervalRef.current);
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (timerActivated && timerDuration > 0) {
      timerRef.current = setTimeout(() => {
        setIsPlaying(false);
        setTimerActivated(false);
      }, timerDuration * 60000);
    } else {
      clearTimeout(timerRef.current);
    }

    return () => clearTimeout(timerRef.current);
  }, [timerActivated, timerDuration]);

  const startProgress = () => {
    intervalRef.current = setInterval(() => {
      if (audioRef.current) {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      }
    }, 1000);
  };

  const handleSongEnd = () => {
    if (repeat) {
      repeatSong();
    } else {
      playNextSong();
    }
  };

  const playNextSong = () => {
    const currentIndex = songs.findIndex((song) => song.id === selectedSong.id);
    if (currentIndex >= 0) {
      const nextIndex = (currentIndex + 1) % songs.length;
      setSelectedSong(songs[nextIndex]);
      setIsPlaying(true);
    }
  };

  const playPreviousSong = () => {
    const currentIndex = songs.findIndex((song) => song.id === selectedSong.id);
    if (currentIndex >= 0) {
      const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
      setSelectedSong(songs[previousIndex]);
      setIsPlaying(true);
    }
  };

  const repeatSong = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setIsPlaying(true);
      audioRef.current.play().catch((error) => {
        console.error("Play was interrupted:", error);
      });
    }
  };

  const handleProgressClick = (event) => {
    const { offsetX } = event.nativeEvent;
    const { clientWidth } = event.target;
    const newTime = (offsetX / clientWidth) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress((newTime / audioRef.current.duration) * 100);
  };

  const handleTimerClick = () => {
    setShowTimerOptions(!showTimerOptions);
  };

  const setTimer = (duration) => {
    if (duration === 0) {
      setTimerActivated(false);
      setTimerDuration(0); 
      setShowTimerOptions(false);
      return;
    }
    setTimerDuration(duration);
    setTimerActivated(true);
    setShowTimerOptions(false);
  };

  return (
    selectedSong && (
      <div className="flex flex-col sm:max-w-[480px] w-full ">
        <div className="">
          <h3 className="text-white  text-[24px] sm:text-[30px] lg:text-[32px] font-[700] leading-[36px]">{selectedSong.name}</h3>
          <p className="text-gray-400 mb-4 text-sm lg:text-[16px] leading-[24px]">{selectedSong.artist}</p>
        </div>
        <div className="max-w-[480px] mx-auto  aspect-square w-[100%] ">
          <img src={`https://cms.samespace.com/assets/${selectedSong.cover}`} alt={selectedSong.name} className="mb-4 max-w-[480px] w-[100%] aspect-square  rounded-[8px]" />
        </div>

        <div className="w-full h-[6px] bg-gray-600 rounded-full cursor-pointer mb-[32px] max-w-[480px] mx-auto mt-[24px]" onClick={handleProgressClick}>
          <div className="h-full bg-white rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex items-center justify-between space-x-4">
          {/* Hoverable Kebab Menu */}
          <div className="relative group">
            <GoKebabHorizontal size={48} className="bg-gray-800 p-2 rounded-full cursor-pointer" />

            <div className="absolute  bottom-5 -translate-y-2 right-0 text-center bg-gray-800 text-white p-[9px] rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="gap-2 pb-5 flex flex-col items-center ">
                {/* Timer Section */}
                <div className="relative">
                  <MdTimer size={30} className={`text-2xl cursor-pointer ${timerActivated ? "text-green-500" : ""}`} />
                  <div className="absolute w-[100px] -right-10 text-center top-full -mt-[205px] bg-gray-800 text-white p-2 rounded opacity-0 hover:opacity-100 transition-opacity duration-200">
                    {[5, 10, 15, 30, 60].map((duration) => (
                      <div key={duration} onClick={() => setTimer(duration)} className={`cursor-pointer p-1 ${timerDuration === duration ? "text-green-500" : " "}`}>
                        {duration === 5 ? "5 m" : `${duration} m`}
                      </div>
                    ))}
                    <div onClick={() => setTimer(0)} className={`cursor-pointer p-1 ${timerDuration === 0 ? "text-green-500" : ""}`}>
                      Off
                    </div>
                  </div>
                </div>

                {/* Repeat Section */}
                <FiRepeat size={30} onClick={() => setRepeat(!repeat)} className={`text-2xl cursor-pointer mt-5 ${repeat ? "text-green-500" : ""}`} />
              </div>
            </div>
          </div>

          <div className="flex items-center  justify-between space-x-4">
            <TbPlayerTrackPrevFilled onClick={playPreviousSong} className="text-white text-[32px] cursor-pointer opacity-75 hover:opacity-100" />
            {isPlaying ? <FaCirclePause onClick={() => setIsPlaying(false)} className="text-white text-[48px] cursor-pointer hover:scale-110 duration-200" /> : <FaCirclePlay onClick={() => setIsPlaying(true)} className="text-white text-[48px] cursor-pointer hover:scale-110 duration-200" />}
            <TbPlayerTrackNextFilled onClick={playNextSong} className="text-[#FFFFFF] text-[32px] opacity-75 hover:opacity-100 cursor-pointer" />
          </div>

          <div className="relative group flex justify-center items-center bg-gray-800 w-[48px] h-[48px] rounded-full cursor-pointer">
            <HiSpeakerWave className="text-white text-[20px] group-hover:-rotate-90 duration-150" />
            <div className="absolute -top-[60px] hidden group-hover:flex items-center justify-center">
              <div className="bg-gray-800 p-2 rounded -rotate-90 -mt-5">
                <input type="range" min="0" max="100" className="bg-gray-800 w-24 lg:w-32" onChange={(e) => (audioRef.current.volume = e.target.value / 100)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Player;
