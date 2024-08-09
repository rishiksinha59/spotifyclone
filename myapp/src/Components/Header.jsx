import React from 'react'
import Logo from '../Assets/Logo.svg'
import user from '../Assets/user.png'

const Header = () => {
  return (
    <div className='flex flex-col justify-between h-full p-[32px]'>
        <img src={Logo} alt="Spotify logo" className="w-24 lg:w-24 mb-4"/>
        <img src={user} alt="User" className='w-10 lg:w-12 rounded-full mt-auto'/>
    </div>
  )
}

export default Header