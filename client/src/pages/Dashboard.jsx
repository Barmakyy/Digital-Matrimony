import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../components/AdminDashboard';
import OfficerDashboard from '../components/OfficerDashboard';
import UserDashboard from '../components/UserDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return <div className="p-8">Loading...</div>;

  if (user.role === 'admin') return <AdminDashboard />;
  if (user.role === 'officer') return <OfficerDashboard />;
  return <UserDashboard />;
};

export default Dashboard; 