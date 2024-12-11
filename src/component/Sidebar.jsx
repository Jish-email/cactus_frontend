import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [profile, setProfile] = useState([]);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://cactus-t49s.onrender.com/profile/api/showuserprofile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });
        setProfile(response.data.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }

    };

    fetchProfile();
  }, []);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className='flex'>
      <div className='basis-1/4 h-screen fixed  w-1/5'>
        <Navbar />

        <div className='flex flex-col mt-10'>
          {/* icon container */}
          <div className='flex flex-col ml-8 gap-3'>
            <Link to="/home">
              <div
                className={`flex w-28 h-10 rounded-2xl cursor-pointer px-2 py-2 gap-2 transition-colors duration-300 ${activeItem === 'home' ? 'bg-home text-black' : 'bg-linkbg hover:bg-home hover:text-black'
                  }`}
                onClick={() => handleItemClick('home')}
              >
                <span className="material-symbols-outlined">home</span>
                <p>Home</p>
              </div>
            </Link>

            <Link to="/message">
              <div
                className={`flex w-28 h-10 rounded-2xl cursor-pointer px-2 py-2 gap-2 transition-colors duration-300 ${activeItem === 'message' ? 'bg-message text-black' : 'bg-linkbg hover:bg-message hover:text-black'
                  }`}
                onClick={() => handleItemClick('message')}
              >
                <span className="material-symbols-outlined">chat</span>
                <p>Message</p>
              </div>
            </Link>

            <Link to="/mirage">
              <div
                className={`flex w-28 h-10 rounded-2xl cursor-pointer px-2 py-2 gap-2 transition-colors duration-300 ${activeItem === 'mirage' ? 'bg-mirage text-black' : 'bg-linkbg hover:bg-mirage hover:text-black'
                  }`}
                onClick={() => handleItemClick('mirage')}
              >
                <span className="material-symbols-outlined">psychiatry</span>
                <p>Mirage</p>
              </div>
            </Link>

            <Link to="/search">
              <div
                className={`flex w-32 h-10 rounded-2xl cursor-pointer px-2 py-2 gap-2 transition-colors duration-300 ${activeItem === 'search' ? 'bg-search text-black' : 'hover:bg-search hover:text-black bg-linkbg'
                  }`}
                onClick={() => handleItemClick('search')}
              >
                <span className="material-symbols-outlined">group</span>
                <p>ProfileHub</p>
              </div>
            </Link>

            <Link to="/updatepassword">
              <div
                className={`flex w-32 h-10 rounded-2xl cursor-pointer px-2 py-2 gap-2 transition-colors duration-300 ${activeItem === 'updatepassword' ? 'bg-green text-black' : 'bg-linkbg hover:bg-green hover:text-black'
                  }`}
                onClick={() => handleItemClick('updatepassword')}
              >
                <span className="material-symbols-outlined">
                  lock_reset
                </span>
                <p>Password</p>
              </div>
            </Link>
          </div>





          <div className='flex flex-col absolute bottom-5 ml-8 gap-3'>
            <Link to="/userprofile">
              <div
                className={`flex w-14 h-14 border-solid border-2 border-gray-300 mx-auto rounded-full cursor-pointer overflow-hidden transition-colors duration-300 ${activeItem === 'profile' ? 'border-2 border-pink-600' : ''
                  }`}
                onClick={() => handleItemClick('profile')}
              >
                <img
                  className="w-full h-full object-cover "
                  src={profile.profilepic || 'https://static-00.iconduck.com/assets.00/user-circle-icon-2048x2048-rbk3fbd1.png'}
                  alt="profile"
                />
              </div>
            </Link>


            <Link to="/logout">
              <div
                className={`flex w-28 h-10 rounded-2xl cursor-pointer px-2 py-2 gap-2 transition-colors duration-300 ${activeItem === 'logout' ? 'bg-red-600 text-white' : 'bg-linkbg hover:bg-red-700'
                  }`}
                onClick={() => handleItemClick('logout')}
              >
                <span className="material-symbols-outlined">logout</span>
                <p>Log Out</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
