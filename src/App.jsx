import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import Home from "./component/Home";
import Message from "./component/Message";
import Mirage from "./component/Mirage";
import Profile from "./component/Profile";
import UserCard from "./component/userscard";
import Login from "./component/login";
import Logout from "./component/logout";
import axios from "axios";
import EditProfile from "./component/editprofile";
import UpdatePassword from "./component/updatepassword";
import Userprofile from "./component/userprofile";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/";
  const [authentication, setAuthentication] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});

  const authenticateUser = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setAuthentication(false);
      setLoading(false);
      return;
    }

    try {
      const authResponse = await axios.get('https://cactus-t49s.onrender.com/users/auth', {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });

      if (authResponse.status === 200) {
        setAuthentication(true);

        const profileResponse = await axios.get('https://cactus-t49s.onrender.com/profile/api/showuserprofile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });
        setProfile(profileResponse.data.data || {});
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      setAuthentication(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  useEffect(() => {
    if (authentication && location.pathname === "/") {
      navigate("/home");
    }
  }, [authentication, navigate, location.pathname]);

  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>;
    }
    return authentication ? children : <Navigate to="/" />;
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthentication(false);
    navigate("/");
  };

  return (
    <>
      {!isLoginPage && (
        <div className="w-full block md:hidden">
          <Navbar />
        </div>
      )}

      <div className="flex">
        {!isLoginPage && (
          <div className="w-full md:w-1/4 p-4 md:block hidden">
            <Sidebar />
          </div>
        )}

        <div className="w-full md:w-3/4 pb-20">
          <Routes>
            <Route path="/" element={<Login setAuthentication={setAuthentication} />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/message" element={<ProtectedRoute><Message /></ProtectedRoute>} />
            <Route path="/mirage" element={<ProtectedRoute><Mirage /></ProtectedRoute>} />
            <Route path="/profile/:_id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute><UserCard /></ProtectedRoute>} />
            <Route path="/userprofile" element={<ProtectedRoute><Userprofile /></ProtectedRoute>} />
            <Route path="/editprofile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            <Route path="/updatepassword" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
            <Route path="/logout" element={<ProtectedRoute><Logout setAuthentication={setAuthentication} /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>

      {!isLoginPage && (
        <div className="fixed bottom-0 w-full bg-monav text-white md:hidden">
          <div className="flex justify-between px-5 py-2">
            <div className="flex flex-col items-center cursor-pointer">
              <Link to="/home" className={`text-sm ${location.pathname === '/home' ? 'text-blue-500' : ''}`}>
                <span className={`material-symbols-outlined text-xl ${location.pathname === '/home' ? 'text-home' : ''}`}>home</span>
              </Link>
            </div>

            <div className="flex flex-col items-center cursor-pointer">
              <Link to="/mirage" className={`text-sm ${location.pathname === '/mirage' ? 'text-blue-500' : ''}`}>
                <span className={`material-symbols-outlined text-xl ${location.pathname === '/mirage' ? 'text-mirage' : ''}`}>psychiatry</span>
              </Link>
            </div>

            <div className="flex flex-col items-center cursor-pointer">
              <Link to="/message" className={`text-sm ${location.pathname === '/message' ? 'text-message' : ''}`}>
                <span className={`material-symbols-outlined text-xl ${location.pathname === '/message' ? 'text-message' : ''}`}>chat</span>
              </Link>
            </div>

            <div className="flex flex-col items-center cursor-pointer">
              <Link to="/search" className={`text-sm ${location.pathname === '/search' ? 'text-search' : ''}`}>
                <span className={`material-symbols-outlined text-xl ${location.pathname === '/search' ? 'text-search' : ''}`}>group</span>
              </Link>
            </div>

            <div className="flex flex-col items-center cursor-pointer">
              <Link to="/userprofile" className={`text-sm ${location.pathname === '/userprofile' ? 'text-blue-500' : ''}`}>
                <img className={`w-8 h-8 rounded-full cursor-pointer ${location.pathname === '/userprofile' ? 'border-2 border-pink-500' : ''}`} src={profile.profilepic || 'https://static-00.iconduck.com/assets.00/user-circle-icon-2048x2048-rbk3fbd1.png'} alt="profile" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
