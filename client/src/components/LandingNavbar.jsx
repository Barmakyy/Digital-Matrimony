import React from 'react';
import { Link } from 'react-router-dom';

const LandingNavbar = () => (
  <nav className="bg-white bg-opacity-80 shadow p-4 flex justify-between items-center">
    <Link to="/" className="text-pink-600 font-bold text-xl">Matrimony Portal</Link>
    <div className="flex gap-4">
      <Link to="/login" className="text-gray-700 hover:text-pink-600 font-semibold">Login</Link>
      <Link to="/register" className="text-pink-600 hover:underline font-semibold">Register</Link>
    </div>
  </nav>
);

export default LandingNavbar; 