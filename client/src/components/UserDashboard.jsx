import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserNavbar from './UserNavbar';

const apiUrl = import.meta.env.VITE_API_URL;

const UserDashboard = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`${apiUrl}/api/applications`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApplications(res.data);
      } catch (err) {
        setError('Failed to fetch applications');
      }
      setLoading(false);
    };
    fetchApplications();
  }, [token]);

  return (
    <div className="p-8">
      <UserNavbar />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">User Dashboard</h2>
      </div>
      <button
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => navigate('/apply')}
      >
        Submit New Marriage Application
      </button>
      <h3 className="text-xl font-semibold mb-2">My Applications</h3>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : applications.length === 0 ? (
        <div>No applications found.</div>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Spouse 1</th>
              <th className="p-2 border">Spouse 2</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Scheduled</th>
              <th className="p-2 border">Certificate</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id} className="border-b">
                <td className="p-2 border">{app.spouse1?.name}</td>
                <td className="p-2 border">{app.spouse2?.name}</td>
                <td className="p-2 border">{app.status}</td>
                <td className="p-2 border">{app.scheduledDate ? new Date(app.scheduledDate).toLocaleDateString() : '-'}</td>
                <td className="p-2 border">
                  {app.certificateUrl ? (
                    <a
                      href={app.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Download
                    </a>
                  ) : (
                    <span className="text-gray-400">Not available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserDashboard; 