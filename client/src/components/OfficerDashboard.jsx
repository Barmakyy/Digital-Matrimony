import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import OfficerNavbar from './OfficerNavbar';

const apiUrl = import.meta.env.VITE_API_URL;

const OfficerDashboard = () => {
  const { token } = useAuth();
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [tab, setTab] = useState('pending'); // 'pending', 'approved', 'rejected'

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError('');
      try {
        const pendingRes = await axios.get(`${apiUrl}/api/applications/pending`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPending(pendingRes.data);
        const allRes = await axios.get(`${apiUrl}/api/applications/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApproved(allRes.data.filter(app => app.status === 'approved'));
        setRejected(allRes.data.filter(app => app.status === 'rejected'));
      } catch (err) {
        setError('Failed to fetch applications');
      }
      setLoading(false);
    };
    fetchApplications();
  }, [token]);

  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleApprove = async (id) => {
    setActionLoading(true);
    try {
      await axios.post(`${apiUrl}/api/applications/${id}/approve`, { scheduledDate }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPending(pending.filter(app => app._id !== id));
      setExpanded(null);
      setScheduledDate('');
    } catch (err) {
      alert('Failed to approve application');
    }
    setActionLoading(false);
  };

  const handleReject = async (id) => {
    setActionLoading(true);
    try {
      await axios.post(`${apiUrl}/api/applications/${id}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPending(pending.filter(app => app._id !== id));
      setExpanded(null);
    } catch (err) {
      alert('Failed to reject application');
    }
    setActionLoading(false);
  };

  const handleGenerateCertificate = async (id) => {
    setActionLoading(true);
    try {
      await axios.post(`${apiUrl}/api/applications/${id}/generate-certificate`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Certificate generated!');
    } catch (err) {
      alert('Failed to generate certificate');
    }
    setActionLoading(false);
  };

  return (
    <div className="p-8">
      <OfficerNavbar />
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded font-semibold transition border-b-4 ${tab === 'pending' ? 'border-blue-600 text-blue-700 bg-blue-50' : 'border-transparent text-gray-600 bg-white hover:bg-gray-100'}`}
          onClick={() => setTab('pending')}
        >
          Pending
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition border-b-4 ${tab === 'approved' ? 'border-green-600 text-green-700 bg-green-50' : 'border-transparent text-gray-600 bg-white hover:bg-gray-100'}`}
          onClick={() => setTab('approved')}
        >
          Approved
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition border-b-4 ${tab === 'rejected' ? 'border-red-600 text-red-700 bg-red-50' : 'border-transparent text-gray-600 bg-white hover:bg-gray-100'}`}
          onClick={() => setTab('rejected')}
        >
          Rejected
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          {tab === 'pending' && (
            <>
              <h3 className="text-xl font-semibold mb-2">Pending Applications</h3>
              <table className="min-w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">Applicant</th>
                    <th className="p-2 border">Spouse 1</th>
                    <th className="p-2 border">Spouse 2</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pending.map(app => (
                    <React.Fragment key={app._id}>
                      <tr className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => handleExpand(app._id)}>
                        <td className="p-2 border">{app.applicant?.name || '-'}</td>
                        <td className="p-2 border">{app.spouse1?.name}</td>
                        <td className="p-2 border">{app.spouse2?.name}</td>
                        <td className="p-2 border text-blue-600 underline">{expanded === app._id ? 'Hide' : 'View'}</td>
                      </tr>
                      {expanded === app._id && (
                        <tr>
                          <td colSpan={4} className="bg-gray-50 p-4">
                            <div className="mb-2"><b>Spouse 1 DOB:</b> {app.spouse1?.dob ? new Date(app.spouse1.dob).toLocaleDateString() : '-'}</div>
                            <div className="mb-2"><b>Spouse 1 Address:</b> {app.spouse1?.address}</div>
                            <div className="mb-2"><b>Spouse 2 DOB:</b> {app.spouse2?.dob ? new Date(app.spouse2.dob).toLocaleDateString() : '-'}</div>
                            <div className="mb-2"><b>Spouse 2 Address:</b> {app.spouse2?.address}</div>
                            <div className="mb-2"><b>Witnesses:</b>
                              <ul className="list-disc ml-6">
                                {app.witnesses.map((w, i) => (
                                  <li key={i}>{w.name} ({w.address})</li>
                                ))}
                              </ul>
                            </div>
                            <div className="mb-2"><b>Documents:</b>
                              <ul className="list-disc ml-6">
                                {app.documents.map((doc, i) => (
                                  <li key={i}><a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{doc.type}</a></li>
                                ))}
                              </ul>
                            </div>
                            <div className="mb-2"><b>Submitted:</b> {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : '-'}</div>
                            <div className="flex gap-4 mt-4">
                              <input
                                type="date"
                                value={scheduledDate}
                                onChange={e => setScheduledDate(e.target.value)}
                                className="border px-2 py-1 rounded"
                                placeholder="Schedule Date"
                              />
                              <button
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                onClick={() => handleApprove(app._id)}
                                disabled={actionLoading}
                              >
                                Approve
                              </button>
                              <button
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                onClick={() => handleReject(app._id)}
                                disabled={actionLoading}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </>
          )}
          {tab === 'approved' && (
            <>
              <h3 className="text-xl font-semibold mb-2">Approved Applications</h3>
              <table className="min-w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">Applicant</th>
                    <th className="p-2 border">Spouse 1</th>
                    <th className="p-2 border">Spouse 2</th>
                    <th className="p-2 border">Scheduled</th>
                    <th className="p-2 border">Certificate</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {approved.map(app => (
                    <tr key={app._id} className="border-b">
                      <td className="p-2 border">{app.applicant?.name || '-'}</td>
                      <td className="p-2 border">{app.spouse1?.name}</td>
                      <td className="p-2 border">{app.spouse2?.name}</td>
                      <td className="p-2 border">{app.scheduledDate ? new Date(app.scheduledDate).toLocaleDateString() : '-'}</td>
                      <td className="p-2 border">
                        {app.certificateUrl ? (
                          <a href={app.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Download</a>
                        ) : (
                          <span className="text-gray-400">Not generated</span>
                        )}
                      </td>
                      <td className="p-2 border">
                        {!app.certificateUrl && (
                          <button
                            className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                            onClick={() => handleGenerateCertificate(app._id)}
                            disabled={actionLoading}
                          >
                            Generate Certificate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          {tab === 'rejected' && (
            <>
              <h3 className="text-xl font-semibold mb-2">Rejected Applications</h3>
              <table className="min-w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">Applicant</th>
                    <th className="p-2 border">Spouse 1</th>
                    <th className="p-2 border">Spouse 2</th>
                    <th className="p-2 border">Rejected On</th>
                  </tr>
                </thead>
                <tbody>
                  {rejected.map(app => (
                    <tr key={app._id} className="border-b">
                      <td className="p-2 border">{app.applicant?.name || '-'}</td>
                      <td className="p-2 border">{app.spouse1?.name}</td>
                      <td className="p-2 border">{app.spouse2?.name}</td>
                      <td className="p-2 border">{app.updatedAt ? new Date(app.updatedAt).toLocaleDateString() : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default OfficerDashboard; 