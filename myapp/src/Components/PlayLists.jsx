import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar';
import SongItem from './SongItem';

const PlayLists = ({selectedSong, selectSong ,songs}) => {
  const [searchTerm, setSearchTerm] = useState(''); 
  // console.log(songs)
  const filteredSongs = songs.filter(song=>
    song.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className='p-4'>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <div className='mt-4 space-y-2 '>
        {filteredSongs.map(song => (
          <SongItem key={song.id} song={song} selectSong={selectSong} isSelected={selectedSong && song.id === selectedSong.id}/>
        ))}
      </div>
    </div>
  )
}

export default PlayLists