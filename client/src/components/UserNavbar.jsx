import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserNavbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <nav className="bg-white bg-opacity-80 shadow p-4 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Link to="/dashboard" className="text-pink-600 font-bold text-xl">User Dashboard</Link>
        <Link to="/apply" className="text-gray-700 hover:text-pink-600 font-semibold">Apply</Link>
        <Link to="/status" className="text-gray-700 hover:text-pink-600 font-semibold">Status</Link>
        <Link to="/certificate" className="text-gray-700 hover:text-pink-600 font-semibold">Certificate</Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-600 text-sm">{user?.name}</span>
        <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1 rounded">Logout</button>
      </div>
    </nav>
  );
};

export default UserNavbar; 