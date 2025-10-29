import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center animate__animated animate__fadeInUp">
        <div className="mb-6">
          <FaExclamationTriangle className="text-[var(--primary-color)] mx-auto text-6xl animate__animated animate__headShake animate__delay-1s" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-color)] mb-4 animate__animated animate__fadeIn">
          Oops!
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-color)] mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Something went wrong
        </h2>
        
        <p className="text-lg text-[var(--text-color)] mb-8 max-w-2xl mx-auto animate__animated animate__fadeIn animate__delay-2s">
          The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate__animated animate__fadeIn animate__delay-3s">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            <FaHome /> Go Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 bg-[var(--secondary-color)] text-[var(--text-color)] px-6 py-3 rounded-lg font-medium hover:bg-opacity-80 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;