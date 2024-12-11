import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const { _id } = useParams(); // Ensure the route includes :_id

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!_id) throw new Error("User ID (_id) is missing");

        const response = await axios.get(`https://cactus-t49s.onrender.com/profile/api/showprofile/${_id}`);
        setProfile(response.data.data || {}); // Fallback to an empty object
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [_id]);

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
    );
  }

  return (
    <div className="flex flex-col text-white min-h-screen p-8 rounded-lg gap-12">
      {/* Profile Header */}
      <div className="flex flex-row flex-wrap items-center gap-5">
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={profile.profilepic || "https://static-00.iconduck.com/assets.00/user-circle-icon-2048x2048-rbk3fbd1.png"} // Fallback image
            alt="profile"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            {profile.firstname || "N/A"} <br /> {profile.lastname || ""}
          </h1>
          <p className="text-base md:text-xl text-gray-400">{profile.Y_id || "N/A"}</p>
        </div>
      </div>

      {/* Profile Content */}
      <div className="flex flex-col gap-8">
        {/* About Section */}
        <div className="p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-3xl font-semibold mb-4">About</h2>
          <p className="text-base md:text-lg text-gray-300">{profile.about || "No information available."}</p>
        </div>

        {/* Birthday Section */}
        <div className="p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-3xl font-semibold mb-4 text-pink-700">Birthday</h2>
          <p className="text-base md:text-lg text-gray-300">{profile.dob || "Not provided"}</p>
        </div>

        {/* Hobbies Section */}
        <div className="p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-3xl font-semibold mb-4">Hobbies</h2>
          <div className="flex flex-wrap gap-2">
            {profile.hobbies?.map((hobby, index) => (
              <span key={index} className="bg-gray-700 px-3 py-1 rounded-full text-base md:text-lg text-gray-300">
                {hobby}
              </span>
            )) || "No hobbies listed."}
          </div>
        </div>

        {/* Favorite Movies Section */}
        <div className="p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-3xl font-semibold mb-4">Favorite Movies</h2>
          <div className="flex flex-wrap gap-2">
            {profile.favmovies?.map((movie, index) => (
              <span key={index} className="bg-gray-700 px-3 py-1 rounded-full text-base md:text-lg text-gray-300">
                {movie}
              </span>
            )) || "No favorite movies listed."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
