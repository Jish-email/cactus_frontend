import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation

const Userprofile = () => {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://cactus-t49s.onrender.com/profile/api/showuserprofile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });
        setProfile(response.data.data);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);

      }

    };

    fetchProfile();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="typewriter">
          <div className="slide">
            <i></i>
          </div>
          <div className="paper"></div>
          <div className="keyboard"></div>
        </div>
      </div>
    );  }
  return (
    <div className="flex flex-col text-white min-h-screen p-8 rounded-lg gap-12 ">
      {/* Profile Header */}
      <div className="flex flex-row flex-wrap items-center gap-3">
        {/* Profile Image */}
        <div className="w-32 h-32 md:w-36 md:h-36 rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={profile.profilepic || "https://static-00.iconduck.com/assets.00/user-circle-icon-2048x2048-rbk3fbd1.png"}
            alt="profile"
          />
        </div>
        {/* Profile Text */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-5xl font-extrabold">
            {profile.firstname}
            <br />
            {profile.lastname}
          </h1>
          <p className="text-base md:text-xl text-gray-400">{profile.Y_id}</p>

          {/* Edit Profile Button */}
          <button
            className="mt-4 px-6 py-2 border border-gray-400 rounded-lg text-gray-400 hover:bg-blue-500 hover:text-white transition duration-300 flex items-center gap-2"
            onClick={() => navigate(`/editprofile`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 3.487a1.5 1.5 0 012.121 2.122l-12 12a4.5 4.5 0 01-2.12 1.166l-3 .667.666-3a4.5 4.5 0 011.166-2.121l12-12z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 7.5l6 6m-9.25 4.25h.008v.008h-.008v-.008z"
              />
            </svg>
            Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="flex flex-col gap-8">
        {/* About Section */}
        <div className="p-6 rounded-lg shadow-md ">
          <h2 className="text-xl md:text-3xl font-semibold mb-4">About</h2>
          <p className="text-base md:text-lg text-gray-300">{profile.about}</p>
        </div>

        {/* Birthday Section */}
        <div className="p-6 rounded-lg shadow-md ">
          <h2 className="text-xl md:text-3xl font-semibold mb-4 text-pink-600">
            Birthday
          </h2>
          <p className="text-base md:text-lg text-gray-300">{profile.dob}</p>
        </div>

        {/* Hobbies Section */}
        <div className="p-6 rounded-lg shadow-md ">
          <h2 className="text-xl md:text-3xl font-semibold mb-4">Hobbies</h2>
          <div className="flex flex-wrap gap-2">
            {profile.hobbies.map((hobby, index) => (
              <span
                key={index}
                className="bg-gray-700 px-3 py-1 rounded-full text-base md:text-lg text-gray-300"
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>

        {/* Favorite Movies Section */}
        <div className="p-6 rounded-lg shadow-md ">
          <h2 className="text-xl md:text-3xl font-semibold mb-4">
            Favorite Movies
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.favmovies.map((movie, index) => (
              <span
                key={index}
                className="bg-gray-700 px-3 py-1 rounded-full text-base md:text-lg text-gray-300"
              >
                {movie}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
