import React, { useState } from "react";
import Logo from "../Assets/Logo.svg";
import defaultUser from "../Assets/user.png";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMenu } from "react-icons/io5";

const Header = ({ user, handleGoogle, play, setPlay }) => {


  return (
    <div className="flex min-w-[132px]   md:flex-col  max-h-[1000px]  flex-shrink-0 justify-between  md:h-full py-3 md:py-[32px]  px-5 md:px-0">
      <img src={Logo} alt="Spotify logo" className=" md:mb-4 flex-shrink-0" />
      <div className="flex gap-3 max-w-[140px] justify-between w-full items-center">
        <img src={user ? user.photoURL : defaultUser} alt="User" className="w-10 lg:w-12  flex-shrink-0 rounded-full  bg-[black] hover: -[2px] hover:cursor-pointer  -[#cc4545]" onClick={handleGoogle} />
        <IoMenu size={40} className="bg-gray-800 p-[2px] rounded sm:hidden cursor-pointer" onClick={() => setPlay(!play)} />
      </div>
    </div>
  );
};

export default Header;