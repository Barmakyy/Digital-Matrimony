import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import ApplicationStatus from './pages/ApplicationStatus';
import CertificateDownload from './pages/CertificateDownload';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/apply" element={<ProtectedRoute><ApplicationForm /></ProtectedRoute>} />
        <Route path="/status" element={<ProtectedRoute><ApplicationStatus /></ProtectedRoute>} />
        <Route path="/certificate" element={<ProtectedRoute><CertificateDownload /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
