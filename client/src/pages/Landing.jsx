import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import LandingNavbar from '../components/LandingNavbar';

const bgUrl = 'https://images.pexels.com/photos/33066197/pexels-photo-33066197.jpeg';

const features = [
  {
    icon: (
      <svg className="w-10 h-10 text-pink-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657-2.239-3-5-3s-5 1.343-5 3v5a2 2 0 002 2h6a2 2 0 002-2v-5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M17 11V7a5 5 0 00-10 0v4" /><path strokeLinecap="round" strokeLinejoin="round" d="M17 11c0-1.657 2.239-3 5-3s5 1.343 5 3v5a2 2 0 01-2 2h-6a2 2 0 01-2-2v-5z" /></svg>
    ),
    title: 'Secure',
    desc: 'Your data is encrypted and privacy is our top priority.'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-blue-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 0a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2m-6 0h6" /></svg>
    ),
    title: 'Paperless',
    desc: 'No paperwork. Apply, track, and download certificates online.'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-green-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 20h10a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    ),
    title: 'Fast Approval',
    desc: 'Officers review and approve applications quickly.'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-purple-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
    ),
    title: 'Official Certificates',
    desc: 'Download your legally recognized marriage certificate anytime.'
  }
];

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-pink-100 via-blue-100 to-purple-200">
      <LandingNavbar />
      <main className="flex flex-1 flex-col items-center justify-center w-full px-2">
        <section
          className="relative w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden mt-12"
          style={{ minHeight: 500 }}
          aria-label="Hero section with background image"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgUrl})`, filter: 'brightness(0.5)' }}
            aria-hidden="true"
            role="presentation"
          />
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 md:p-10 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-pink-100 mb-4 drop-shadow-lg">Digital Matrimony Portal</h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-6 drop-shadow">Seamlessly register, apply, and manage your marriage process online.</p>
            <p className="text-base sm:text-lg text-pink-100 mb-8 drop-shadow">Secure. Paperless. Trusted by families and officials.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/register" className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-pink-400" aria-label="Register">Get Started</Link>
              <Link to="/login" className="bg-white border border-pink-500 text-pink-600 hover:bg-pink-50 font-semibold px-8 py-3 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-pink-400" aria-label="Login">Login</Link>
            </div>
          </div>
        </section>
        {/* Feature Highlights */}
        <section className="w-full max-w-4xl mx-auto mt-12 mb-8 px-2">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white bg-opacity-90 rounded-lg shadow p-6 flex flex-col items-center text-center">
                {React.cloneElement(f.icon, { 'aria-hidden': true, focusable: false })}
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-gray-700 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Landing; 