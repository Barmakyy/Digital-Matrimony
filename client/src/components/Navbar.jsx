import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/apply">Application Form</Link></li>
        <li><Link to="/status">Status</Link></li>
        <li><Link to="/certificate">Certificate</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar; 