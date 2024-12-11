import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuthentication }) => {
  const [Y_id, setY_id] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'https://cactus-t49s.onrender.com/users/login',
        { Y_id, password }
      );

      const { accessToken, refreshToken, user } = response.data.data;

      localStorage.setItem('authToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      localStorage.setItem('user', JSON.stringify(user));

      setAuthentication(true);
      navigate('/home');
    } catch (error) {
      setError('Invalid Y_id or password');
      setLoading(false);
    }
  };



  return (
    <div className="container mx-auto p-4 flex flex-wrap justify-center items-center min-h-screen">
      <div className="w-full md:w-1/2 p-4">
        <div className="flex flex-wrap gap-6">
          <h1 className="text-3xl font-bold mb-4 my-auto">
            Welcome to <span className="text-mirage">Cactus</span>
          </h1>
          <img src="cactus.png" alt="Welcome to Cactus" className="rounded-lg shadow-lg w-24 max-w-full h-auto quicksand" />
        </div>
        <p className="text-lg mb-4">Where Campus Life Meets Connectivity</p>
        <p className="text-base mb-4">
          Cactus is designed to be the digital hub for students to connect, share, and engage in a dynamic, interactive
          community. Whether you're here to chat, tweet, or explore, Cactus is your platform to stay connected with
          peers, showcase your interests, and discover what’s happening on campus.
        </p>
      </div>
      <div className="w-full md:w-1/2 p-4">
        <form onSubmit={handleLogin} className="bg-card shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="Y_id">
              Y_id
            </label>
            <input
              type="text"
              id="Y_id"
              name="Y_id"
              value={Y_id}
              onChange={(e) => setY_id(e.target.value)}
              placeholder=" Y_id should be in capital letters "
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="text"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-home text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
