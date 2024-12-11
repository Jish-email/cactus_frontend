import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserCard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://cactus-t49s.onrender.com/profile/api/allprofile')
      .then(response => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the users data!', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
         <div className="flex justify-center items-center min-h-screen">
         <div className="typewriter">
           <div className="slide">
             <i></i>
           </div>
           <div className="paper"></div>
           <div className="keyboard"></div>
         </div>
       </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-5">
          {users.map((user,index) => (
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2" key={index}>
              <Link to={`/profile/${user.user._id}`}>
                <div className="rounded-lg overflow-hidden shadow-lg bg-card py-4 px-5 flex items-center transition-transform transform hover:scale-105 hover:shadow-xl h-full">
                  <div className="w-16 h-16 md:w-24 md:h-24 flex-shrink-0">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src={user.profilepic || 'https://static-00.iconduck.com/assets.00/user-circle-icon-2048x2048-rbk3fbd1.png'}
                      alt="User profile"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-lg mb-2 md:text-xl">
                      {user.firstname} {user.lastname}
                    </p>
                    <p className="text-gray-400 text-sm md:text-base">{user.user.Y_id}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCard;
