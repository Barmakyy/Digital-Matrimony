import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    setError('');
    try {
      const res = await axios.post(`${apiUrl}/api/auth/login`, data);
      login(res.data.user, res.data.token);
      // Redirect based on role
      const role = res.data.user.role;
      if (role === 'admin') {
        navigate('/dashboard');
      } else if (role === 'officer') {
        navigate('/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input type="email" {...register('email', { required: true })} className="w-full border px-2 py-1 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input type="password" {...register('password', { required: true })} className="w-full border px-2 py-1 rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
};

export default Login; 