import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ searchTerm, setSearchTerm, backgroundColor }) => {
  return (
    <div className="flex items-center mb-4 shadow-2xl sm:border-0 border sticky top-1 rounded-xl " style={{backgroundColor: backgroundColor}}>

      <div className="flex items-center  p-3 rounded-md w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Song, Artist"
          className="w-full bg-transparent text-white focus:outline-none "
        />
          <FiSearch className="text-gray-400 text-[19px]" />
      </div>
    </div>
  );
};

export default SearchBar;
