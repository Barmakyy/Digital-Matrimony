import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full text-center py-4 bg-white bg-opacity-80 mt-12 shadow-inner flex flex-col md:flex-row items-center justify-center gap-4">
      <span className="text-gray-600">&copy; {year} Digital Matrimony Portal. All rights reserved.</span>
      <a
        href="mailto:support@example.com"
        className="text-pink-600 hover:underline font-semibold ml-2"
        title="Contact Support"
      >
        Contact Us
      </a>
    </footer>
  );
};

export default Footer; 