import React, { useRef, useState, useEffect } from 'react';
import { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiVolume2 } from 'react-icons/fi';

const Player = ({ selectedSong, songs, setSelectedSong }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);
//  console.log(songs)
  useEffect(() => { 
    // Cleanup previous audio instance
    if (audioRef.current) {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }

    // Ensure selectedSong is valid
    if (selectedSong && selectedSong.url) {
      audioRef.current = new Audio(selectedSong.url);

      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Play was interrupted:", error);
        });
        startProgress();
      }
    }

    // Cleanup when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        clearInterval(intervalRef.current);
      }
    };
  }, [selectedSong]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Play was interrupted:", error);
        });
        startProgress();
      } else {
        audioRef.current.pause();
        clearInterval(intervalRef.current);
      }
    }
  }, [isPlaying]);

  const startProgress = () => {
    intervalRef.current = setInterval(() => {
      if (audioRef.current) {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      }
    }, 1000);
  };

  const playNextSong = () => {
    const currentIndex = songs.findIndex(song => song.id === selectedSong.id);
    if (currentIndex >= 0) {
      const nextIndex = (currentIndex + 1) % songs.length;
      setSelectedSong(songs[nextIndex]);
      setIsPlaying(true); 
    }
  };

  const playPreviousSong = () => {
    const currentIndex = songs.findIndex(song => song.id === selectedSong.id);
    if (currentIndex >= 0) {
      const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
      setSelectedSong(songs[previousIndex]);
      setIsPlaying(true);
    }
  };

  const handleProgressClick = (event) => {
    const { offsetX } = event.nativeEvent;
    const { clientWidth } = event.target;
    const newTime = (offsetX / clientWidth) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress((newTime / audioRef.current.duration) * 100);
  };

  return (
    selectedSong && (
      <div className="flex flex-col items-center  border">
        <div className='flex flex-col border '>
         <h3 className="text-white text-base lg:text-[32px] font-[700]">{selectedSong.name}</h3>
        <p className="text-gray-400 mb-4 text-sm lg:text-base">{selectedSong.artist}</p>
        </div>
        <img src={`https://cms.samespace.com/assets/${selectedSong.cover}`} alt={selectedSong.name} className="w-32 h-32 lg:w-[480px] lg:h-[480px] mb-4" />
       
        <div className="w-full h-1 bg-gray-600 rounded-full cursor-pointer mb-4 border max-w-[480px] w-[100%]" onClick={handleProgressClick}>
          <div className="h-full bg-green-500 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex items-center space-x-4">
          <FiSkipBack onClick={playPreviousSong} className="text-white text-2xl cursor-pointer" />
          {isPlaying ? 
            <FiPause onClick={() => setIsPlaying(false)} className="text-white text-3xl cursor-pointer" /> :
            <FiPlay onClick={() => setIsPlaying(true)} className="text-white text-3xl cursor-pointer" />
          }
          <FiSkipForward onClick={playNextSong} className="text-white text-2xl cursor-pointer" />
        </div>
        <div className="flex items-center mt-4">
          <FiVolume2 className="text-white mr-2" />
          <input 
            type="range" 
            min="0" 
            max="100" 
            className="bg-gray-800 w-24 lg:w-32" 
            onChange={(e) => audioRef.current.volume = e.target.value / 100}
          />
        </div>
      </div>
    )
  );
};

export default Player;
