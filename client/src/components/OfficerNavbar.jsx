import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OfficerNavbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <nav className="bg-white bg-opacity-80 shadow p-4 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Link to="/dashboard" className="text-blue-600 font-bold text-xl">Officer Dashboard</Link>
        <span className="text-gray-700 font-semibold">Pending Applications</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-600 text-sm">{user?.name}</span>
        <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1 rounded">Logout</button>
      </div>
    </nav>
  );
};

export default OfficerNavbar; 