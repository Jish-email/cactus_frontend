import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = ({ setAuthentication }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.post('https://cactus-t49s.onrender.com/users/logout', {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
          withCredentials: true, // Ensure credentials (like cookies) are sent with the request
        });
  
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        console.log('Logged out successfully');
  
        setAuthentication(false); 
  
        navigate('/');
      } catch (error) {
        console.error('There was an error logging out!', error);
      }
    };
  
    logoutUser();
  }, [navigate, setAuthentication]);
  

  return (
    <div className="container mx-auto p-4">
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
