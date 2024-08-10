import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center mb-4 sticky top-1">

      <div className="flex items-center bg-gray-800 p-3 rounded-md w-full">
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
