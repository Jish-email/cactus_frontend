import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

const Mirage = () => {
  const [data, setData] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate(); // Use useNavigate to handle redirection

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://cactus-t49s.onrender.com/post/showmiragepost');
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handlePostSubmit = async () => {
    if (newPost.trim()) {
      try {
        const response = await axios.post(
          'https://cactus-t49s.onrender.com/post/createmiragepost',
          { content: newPost },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
            },
          }
        );
        setData([response.data.data.post, ...data]);
        setNewPost('');
        setSuccessMessage('Post submitted successfully!');
        setTimeout(() => {
          setSuccessMessage(''); // Clear success message after a short delay
        }, 3000); 
        alert('Post submitted successfully!');
        navigate('/mirage'); // Redirect to current page or wherever you want to navigate
      } catch (error) {
        setError('Error creating post');
      }
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
    );  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container p-0 min-h-screen">
      {/* Post Input Section */}
      <div className="container py-2 gap-2">
        <div className="flex flex-col gap-2 p-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-lg shadow-md mx-auto">
          <textarea
            className="w-full p-2 bg-card border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="What's happening?"
            value={newPost}
            onChange={handlePostChange}
          ></textarea>
          <button
            className="self-end px-4 py-2 bg-mirage text-black rounded-lg hover:bg-mirage active:bg-mirage focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            onClick={handlePostSubmit}
          >
            Post
          </button>
        </div>
      </div>

      {/* Success Alert */}
      {successMessage && (
        <div className="alert-success p-4 bg-green-500 text-white rounded-md text-center mb-4">
          {successMessage}
        </div>
      )}

      {/* Posts Display Section */}
      <div className="flex flex-col gap-2 p-0">
        {data.map((d) => (
          d && d.content ? (  // Check if 'd' exists and has 'content' property
            <div
              key={d._id}
              className="flex flex-col w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 text-white p-4 shadow-md rounded-lg mx-auto"
            >
              <div className="flex flex-row w-full">
                <div className="basis-1/6">
                  <img
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer"
                    src= "cactus logo.jpg"
                    alt="profile"
                  />
                </div>
                <div className="basis-5/6 flex-grow ">
                  <div className="my-5 w-full  h-auto text-xs sm:text-sm md:text-base lg:text-base text-white">
                    <p className="quicksand-text text-sm md:text-lg">{d.content}</p>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-base">
                  {new Date(d.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short',  year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-4">
                {d.image && (
                  <div className="relative w-full pt-[100%] overflow-hidden rounded-lg">
                    <img
                      src={d.image}
                      alt="post"
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : null // Render nothing if 'd' or 'd.content' is undefined
        ))}
      </div>

    </div>
  );
};

export default Mirage;
