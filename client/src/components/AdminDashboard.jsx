import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const apiUrl = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [promoteRole, setPromoteRole] = useState('officer');
  const [tab, setTab] = useState('users'); // 'users' or 'applications'

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const usersRes = await axios.get(`${apiUrl}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(usersRes.data);
        const appsRes = await axios.get(`${apiUrl}/api/applications/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApplications(appsRes.data);
      } catch (err) {
        setError('Failed to fetch data');
      }
      setLoading(false);
    };
    fetchData();
  }, [token]);

  const handlePromote = async (userId) => {
    try {
      await axios.post(`${apiUrl}/api/admin/promote`, { userId, newRole: promoteRole }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users => users.map(u => u._id === userId ? { ...u, role: promoteRole } : u));
    } catch (err) {
      alert('Failed to promote user');
    }
  };

  const handleDelete = async (userId) => {
    // Placeholder: implement backend delete endpoint if needed
    alert('Delete user not implemented');
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <AdminNavbar />
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded font-semibold transition border-b-4 ${tab === 'users' ? 'border-purple-600 text-purple-700 bg-purple-50' : 'border-transparent text-gray-600 bg-white hover:bg-gray-100'}`}
          onClick={() => setTab('users')}
        >
          Users
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition border-b-4 ${tab === 'applications' ? 'border-purple-600 text-purple-700 bg-purple-50' : 'border-transparent text-gray-600 bg-white hover:bg-gray-100'}`}
          onClick={() => setTab('applications')}
        >
          Applications
        </button>
      </div>
      {tab === 'users' && (
        <>
          <h3 className="text-xl font-semibold mb-2">Users & Officers</h3>
          <table className="min-w-full mb-8 border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Created</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-b">
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.role}</td>
                  <td className="p-2 border">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="p-2 border flex gap-2">
                    <select value={promoteRole} onChange={e => setPromoteRole(e.target.value)} className="border rounded px-1">
                      <option value="officer">Officer</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button onClick={() => handlePromote(user._id)} className="bg-green-600 text-white px-2 py-1 rounded">Promote</button>
                    <button onClick={() => handleDelete(user._id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {tab === 'applications' && (
        <>
          <h3 className="text-xl font-semibold mb-2">All Marriage Applications</h3>
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Applicant</th>
                <th className="p-2 border">Spouse 1</th>
                <th className="p-2 border">Spouse 2</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Officer</th>
                <th className="p-2 border">Scheduled</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app._id} className="border-b">
                  <td className="p-2 border">{app.applicant?.name || '-'}</td>
                  <td className="p-2 border">{app.spouse1?.name}</td>
                  <td className="p-2 border">{app.spouse2?.name}</td>
                  <td className="p-2 border">{app.status}</td>
                  <td className="p-2 border">{app.officer?.name || '-'}</td>
                  <td className="p-2 border">{app.scheduledDate ? new Date(app.scheduledDate).toLocaleDateString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Reports & Legal Requirements</h3>
        <p className="text-gray-600">(Placeholder for reports and legal requirements management)</p>
      </div>
    </div>
  );
};

export default AdminDashboard; 