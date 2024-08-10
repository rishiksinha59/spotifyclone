// import React, { useEffect, useState } from "react";
// import Header from "../Components/Header";
// import Player from "../Components/Players";
// import PlayLists from "../Components/PlayLists";
// import axios from "axios";
// import { FaMusic } from "react-icons/fa6";
// import Logo from "../Assets/Logo.svg";
// import defaultUser from "../Assets/user.png";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "../firebase/firebaseConfig";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { IoMenu } from "react-icons/io5";

// const Home = () => {
//   const [selectedSong, setSelectedSong] = useState(null);
//   const [songs, setSongs] = useState([]);
//   const [user, setUser] = useState(null);
//   const [play, setPlay] = useState(false);

//   // console.log(selectedSong);
//   useEffect(() => {
//     axios
//       .get("https://cms.samespace.com/items/songs")
//       .then((res) => {
//         setSongs(res.data.data);
//       })
//       .catch((error) => console.error(error));
//   }, []);

//   const handleGoogle = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       setUser(user);
//       toast.success("Logged in successfully!");
//     } catch (error) {
//       toast.error("Login failed. Please try again.");
//     }
//   };
//   const backgroundColor = selectedSong ? selectedSong.accent : "#1a202c"; // Default color

//   return (
//     <div
//       className="h-screen overflow-clip text-white transition-background bg-gradient-to-l from-gray-900"
//       style={{ backgroundColor }} // Apply the dynamic background color
//     >
//       {" "}
//       <div className=" md:hidden">
//         <div className="flex md:flex-col min-w-[60px]  flex-shrink-0 justify-between  md:h-full py-3 md:py-[32px]  px-5 md:px-0">
//           <img src={Logo} alt="Spotify logo" className="w-24 lg:w-24 md:mb-4 flex-shrink-0" />
//           <div className="flex gap-3 max-w-[140px] justify-between w-full items-center">
//             <img src={user ? user.photoURL : defaultUser} alt="User" className="w-10 lg:w-12  flex-shrink-0 rounded-full  bg-[black] hover: -[2px] hover:cursor-pointer  -[#cc4545]" onClick={handleGoogle} />
//             <IoMenu size={40} className="bg-gray-800 p-[2px] " onClick={() => setPlay(!play)}  />
//           </div>
//         </div>
//       </div>
//       <div className="sm:flex h-[100%] overflow-clip max-w-[1450px] md:px-[32px] px-5 mx-auto gap-5 justify-around">
//         <div className="hidden md:block">
//           <Header />
//         </div>
//         <div className="hidden sm:block h-[100%] overflow-y-scroll ">
//           <PlayLists selectSong={setSelectedSong} selectedSong={selectedSong} setSongs={setSongs} songs={songs} />
//         </div>
//         {play && (
//             <div className="absolute mx-5 rounded-b-lg rounded-tl-lg -mt-3 z-40 right-0 left-0  bg-slate-800 h-[85%] overflow-y-scroll ">
//               <PlayLists selectSong={setSelectedSong} selectedSong={selectedSong} setSongs={setSongs} songs={songs} />
//             </div>
//           )}
//         {selectedSong ? (
//           <div className="flex flex-col justify-center  ">
//             <Player selectedSong={selectedSong} songs={songs} setSelectedSong={setSelectedSong} />
//           </div>
//         ) : (
//           <div className="flex flex-col h-[70svh] sm:h-auto  justify-center text-[30px] sm:text-[35px] lg:text-[45px] font-semibold items-center text-center tracking-wider opacity-50">
//             {" "}
//             <span className="ml-4">
//               Plese Select
//               <br />a Song
//             </span>
//             <FaMusic className="mx-auto text-[40px]  sm:text-[50px] md:text-[60px] m-5 " />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Player from "../Components/Players";
import PlayLists from "../Components/PlayLists";
import axios from "axios";
import { FaMusic } from "react-icons/fa6";
import Logo from "../Assets/Logo.svg";
import defaultUser from "../Assets/user.png";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMenu } from "react-icons/io5";

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
      style={{ backgroundColor }} // Apply the dynamic background color
    >
      <div className="md:hidden">
        <div className="flex md:flex-col min-w-[60px] flex-shrink-0 justify-between md:h-full py-3 md:py-[32px] px-5 md:px-0">
          <img src={Logo} alt="Spotify logo" className="w-24 lg:w-24 md:mb-4 flex-shrink-0" />
          <img src={user ? user.photoURL : defaultUser} alt="User" className="w-10 hidden sm:block lg:w-12 flex-shrink-0 rounded-full bg-[black] hover:-[2px] hover:cursor-pointer -[#cc4545]" onClick={handleGoogle} />
          <div className="flex  sm:hidden gap-3 max-w-[140px] justify-between w-full items-center">
            <img src={user ? user.photoURL : defaultUser} alt="User" className="w-10 lg:w-12 flex-shrink-0 rounded-full bg-[black] hover:-[2px] hover:cursor-pointer -[#cc4545]" onClick={handleGoogle} />
            <IoMenu size={40} className="bg-gray-800 p-[2px] sm:hidden" onClick={() => setPlay(!play)} />
          </div>
        </div>
      </div>
      <div className="sm:flex max-h-[1000px] h-[100%] overflow-clip max-w-[1450px] md:px-[32px] px-5 mx-auto gap-5 justify-around">
      <div className="hidden md:block">

      <Header/>
      </div>
        <div className="hidden sm:block h-[100%] w-full overflow-y-scroll">
          <PlayLists selectSong={setSelectedSong} selectedSong={selectedSong} setSongs={setSongs} songs={songs} />
        </div>
        {play && (
          <div className="absolute mx-5 rounded-b-lg rounded-tl-lg -mt-3 z-40 right-0 left-0 bg-slate-800 h-[85%] overflow-y-scroll sm:hidden">
            <PlayLists selectSong={setSelectedSong} selectedSong={selectedSong} setSongs={setSongs} songs={songs} />
          </div>
        )}
        {selectedSong ? (
          <div className="flex flex-col justify-center w-full">
            <Player selectedSong={selectedSong} songs={songs} setSelectedSong={setSelectedSong} />
          </div>
        ) : (
          <div className="flex flex-col h-[70svh] sm:h-auto justify-center text-[30px] sm:text-[35px] lg:text-[45px] font-semibold items-center text-center tracking-wider opacity-50">
            <span className="ml-4">
              Please Select
              <br />a Song
            </span>
            <FaMusic className="mx-auto text-[40px] sm:text-[50px] md:text-[60px] m-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
