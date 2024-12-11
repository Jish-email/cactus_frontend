import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from "react-router-dom";

// Reusable TextInput Component
const TextInput = ({
  label,
  id,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  labelStyle,
  inputStyle,
  wrapperStyle,
}) => (
  <div className="mb-4 " style={wrapperStyle}>
    <label
      className="block text-sm font-bold mb-2"
      htmlFor={id}
      style={labelStyle}
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className=" px-3 py-2 border text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      style={inputStyle}
    />
  </div>
);

// Reusable ArrayInput Component
const ArrayInput = ({ label, id, array, setArray }) => {
  const handleArrayChange = (index, value) => {
    const updatedArray = [...array];
    updatedArray[index] = value;
    setArray(updatedArray);
  };

  const addItem = () => {
    setArray([...array, ""]);
  };

  const removeItem = (index) => {
    const updatedArray = array.filter((_, i) => i !== index);
    setArray(updatedArray);
  };

  return (
    <div className="mb-4 w-2/3">
    <label className="block text-sm font-bold mb-2">{label}</label>
    {array.map((item, index) => (
      <div key={index} className="flex items-center mb-2 space-x-2">
        <input
          type="text"
          value={item}
          onChange={(e) => handleArrayChange(index, e.target.value)}
          className="flex-grow px-3 py-2  bg-card border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          placeholder={`Enter ${label.toLowerCase()} #${index + 1}`}
        />
        <button
          type="button"
          onClick={() => removeItem(index)}
          className="ml-2 px-2 py-1 bg-card text-white rounded  text-sm sm:text-base"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={addItem}
      className="mt-2 px-4 py-2 bg-card text-white rounded-lg flex items-center text-sm sm:text-base"
    >
      <span className="material-symbols-outlined">shopping_cart</span>
    </button>
  </div>
  
  );
};

const EditProfile = () => {
  const { Y_id } = useParams(); // Get Y_id from URL parameters
  const navigate = useNavigate(); // Hook for navigation

  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    bio: "",
    profilepic: "",
    about: "",
    dob: new Date(),
    hobbies: [],
    favmovies: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [profilePicFile, setProfilePicFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `https://cactus-t49s.onrender.com/profile/api/showuserprofile`,{
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
          }
        
        );
        const profileData = response.data.data;
        setProfile({
          ...profileData,
          dob: profileData.dob ? new Date(profileData.dob) : new Date(),
          hobbies: profileData.hobbies || [],
          favmovies: profileData.favmovies || [],
        });
        setLoading(false);
      } catch (error) {
        // setError("Error fetching profile data");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [Y_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      dob: date,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setProfile((prev) => ({
        ...prev,
        profilepic: URL.createObjectURL(file), // Temporary preview
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstname", profile.firstname);
    formData.append("lastname", profile.lastname);
    formData.append("bio", profile.bio);
    formData.append("about", profile.about);

    // Format DOB as "MMM DD" (e.g., "Nov 23")
    const formattedDob = profile.dob.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    formData.append("dob", formattedDob);

    // Append hobbies and favmovies directly as arrays
    profile.hobbies.forEach((hobby) => formData.append("hobbies[]", hobby));
    profile.favmovies.forEach((movie) => formData.append("favmovies[]", movie));

    if (profilePicFile) {
      formData.append("profilepic", profilePicFile);
    }

    try {
      const response = await axios.put(
        `https://cactus-t49s.onrender.com/profile/api/editprofile`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        }
      );
      alert("Profile updated successfully");
      setTimeout(() => navigate(`/userprofile`), 2000);
    } catch (error) {
      setError("Error updating profile");
    }
  };


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

  if (error) {
    return (
      <div className="container mx-auto p-8 min-h-screen flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="container  p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-white">Edit Profile</h1>
      {successMessage && (
        <div className="mb-4 text-green-500 text-center">
          {successMessage}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg  shadow-md "
      >
        {/* Profile Picture Update Section */}
        <div className="mb-8 relative w-32 h-32 mx-auto">
          <img
            src={profile.profilepic || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-gray-300"
          />
          <label
            htmlFor="profilePicInput"
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity"
          >
            <span className="material-symbols-outlined mr-2">edit</span>
            Update
          </label>
          <input
            type="file"
            id="profilePicInput"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* First Name */}
        <TextInput
          label="First Name"
          id="firstname"
          name="firstname"
          value={profile.firstname}
          onChange={handleChange}
          labelStyle={{ color: "white" }}
          inputStyle={{ backgroundColor: "#242526" }}
        />

        {/* Last Name */}
        <TextInput
          label="Last Name"
          id="lastname"
          name="lastname"
          value={profile.lastname}
          onChange={handleChange}
          labelStyle={{ color: "white" }}
          inputStyle={{ backgroundColor: "#242526" }}
        />

        {/* Bio */}
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2 text-white"
            htmlFor="bio"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className=" px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-card"
            rows="4"
            placeholder="Tell us about yourself"
          ></textarea>
        </div>

        {/* About */}
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2 text-white"
            htmlFor="about"
          >
            About
          </label>
          <textarea
            id="about"
            name="about"
            value={profile.about}
            onChange={handleChange}
            className=" px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-card"
            rows="4"
            placeholder="Additional information about you"
          ></textarea>
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2 text-pink-500"
            htmlFor="dob"
          >
             Birthday
          </label>
          <DatePicker
            selected={profile.dob}
            onChange={handleDateChange}
            className="w-full px-3 py-2 border bg-card text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            dateFormat="MMM dd"
          />
        </div>

        {/* Hobbies */}
        <ArrayInput
          label="Hobbies"
          id="hobbies"
          array={profile.hobbies}
          setArray={(newHobbies) =>
            setProfile((prev) => ({ ...prev, hobbies: newHobbies }))
          }
        />

        {/* Favorite Movies */}
        <ArrayInput
          label="Favorite Movies"
          id="favmovies"
          array={profile.favmovies}
          setArray={(newFavMovies) =>
            setProfile((prev) => ({ ...prev, favmovies: newFavMovies }))
          }
        />

        {/* Submit Button */}
        <button
          type="submit"
          className=" px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors mt-4 flex items-center justify-center"
        >
          <span className="material-symbols-outlined mr-2">save</span>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
