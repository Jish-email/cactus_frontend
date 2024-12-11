import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
  const [oldpassword, setOldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    if (newpassword !== confirmpassword) {
      setError('New password and confirm password do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://cactus-t49s.onrender.com/users/changepassword',
        { oldpassword, newpassword, confirmpassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      setSuccessMessage('Password updated successfully');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      navigate("/home")

      alert('Password updated successfully');

    } catch (error) {
      setError('There was an error updating the password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Update Password</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {successMessage && <div className="mb-4 text-green-500">{successMessage}</div>}
      <form onSubmit={handleUpdatePassword} className="bg-card shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-3/4">
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="oldpassword">
            Old Password
          </label>
          <input
            type="text"
            id="oldPassword"
            name="oldPassword"
            value={oldpassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="newpassword">
            New Password
          </label>
          <input
            type="text"
            id="newPassword"
            name="newPassword"
            value={newpassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="confirmpassword">
            Confirm Password
          </label>
          <input
            type="text"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green hover:bg-green text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;