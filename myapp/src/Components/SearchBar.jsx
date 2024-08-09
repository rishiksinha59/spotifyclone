import React from 'react'
import { FiSearch } from 'react-icons/fi';
const SearchBar = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='flex items-center mb-4'>
        <FiSearch className="text-gray-400 mr-2" />
        <input type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder='Search Song, Artist'
        className="w-full p-2 bg-gray-800 text-white rounded-md focus:outline-none"
        />
    </div>
  )
}

export default SearchBar