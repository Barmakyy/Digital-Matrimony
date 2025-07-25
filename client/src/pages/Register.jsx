import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');
    try {
      await axios.post(`${apiUrl}/api/auth/register`, data);
      setSuccess('Registration successful! Please login.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input type="text" {...register('name', { required: true })} className="w-full border px-2 py-1 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input type="email" {...register('email', { required: true })} className="w-full border px-2 py-1 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input type="password" {...register('password', { required: true })} className="w-full border px-2 py-1 rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
      </form>
    </div>
  );
};

export default Register; 