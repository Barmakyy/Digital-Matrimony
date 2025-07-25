import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const apiUrl = import.meta.env.VITE_API_URL;

const ApplicationForm = () => {
  const [role, setRole] = useState('');
  const { token, user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      spouse2: { name: '', dob: '', address: '' },
      witnesses: [{ name: '', address: '' }, { name: '', address: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'witnesses',
  });

  const onUpload = async (e) => {
    setUploading(true);
    setError('');
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post(`${apiUrl}/api/applications/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadedDocs((docs) => [...docs, res.data]);
    } catch (err) {
      setError('Failed to upload document');
    }
    setUploading(false);
  };

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');
    const spouse1 = {
      name: user?.name || '',
      dob: data.spouse1Dob,
      address: data.spouse1Address,
    };
    const spouse2 = data.spouse2;
    const witnesses = data.witnesses;
    const documents = uploadedDocs;
    try {
      await axios.post(
        `${apiUrl}/api/applications`,
        { spouse1, spouse2, witnesses, documents },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Application submitted successfully!');
      reset();
      setUploadedDocs([]);
    } catch (err) {
      setError('Failed to submit application');
    }
  };

  if (!role) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Marriage Application</h1>
        <p className="mb-4">Who are you applying as?</p>
        <div className="flex gap-6">
          <button
            className="bg-pink-500 text-white px-6 py-3 rounded hover:bg-pink-600 text-lg"
            onClick={() => setRole('bride')}
          >
            I am the Bride
          </button>
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 text-lg"
            onClick={() => setRole('groom')}
          >
            I am the Groom
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Marriage Application</h1>
      <p className="mb-4">You are applying as the <span className="font-semibold">{role === 'bride' ? 'Bride' : 'Groom'}</span>.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
        <h2 className="text-lg font-semibold mb-2">Your Details ({role === 'bride' ? 'Bride' : 'Groom'})</h2>
        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input type="text" value={user?.name || ''} disabled className="w-full border px-2 py-1 rounded bg-gray-100" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Date of Birth</label>
          <input type="date" {...register('spouse1Dob', { required: true })} className="w-full border px-2 py-1 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Address</label>
          <input type="text" {...register('spouse1Address', { required: true })} className="w-full border px-2 py-1 rounded" />
        </div>
        <h2 className="text-lg font-semibold mb-2 mt-6">Spouse Details ({role === 'bride' ? 'Groom' : 'Bride'})</h2>
        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input type="text" {...register('spouse2.name', { required: true })} className="w-full border px-2 py-1 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Date of Birth</label>
          <input type="date" {...register('spouse2.dob', { required: true })} className="w-full border px-2 py-1 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Address</label>
          <input type="text" {...register('spouse2.address', { required: true })} className="w-full border px-2 py-1 rounded" />
        </div>
        <h2 className="text-lg font-semibold mb-2 mt-6">Witnesses (at least 2 required)</h2>
        {fields.map((field, idx) => (
          <div key={field.id} className="mb-4 border p-2 rounded">
            <label className="block mb-1">Witness {idx + 1} Name</label>
            <input type="text" {...register(`witnesses.${idx}.name`, { required: true })} className="w-full border px-2 py-1 rounded mb-2" />
            <label className="block mb-1">Witness {idx + 1} Address</label>
            <input type="text" {...register(`witnesses.${idx}.address`, { required: true })} className="w-full border px-2 py-1 rounded" />
            {fields.length > 2 && (
              <button type="button" className="mt-2 text-red-600 underline" onClick={() => remove(idx)}>
                Remove Witness
              </button>
            )}
          </div>
        ))}
        <button type="button" className="mb-4 bg-gray-200 px-3 py-1 rounded" onClick={() => append({ name: '', address: '' })}>
          Add Witness
        </button>
        <h2 className="text-lg font-semibold mb-2 mt-6">Upload Documents</h2>
        <input type="file" onChange={onUpload} className="mb-2" />
        {uploading && <div className="text-blue-600 mb-2">Uploading...</div>}
        <ul className="mb-4">
          {uploadedDocs.map((doc, idx) => (
            <li key={idx} className="text-green-700">{doc.type} - {doc.url}</li>
          ))}
        </ul>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplicationForm; 