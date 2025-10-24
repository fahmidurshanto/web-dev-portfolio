import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaTasks, FaBrain, FaAward, FaGraduationCap, FaUserCircle, FaEnvelope, FaBriefcase
} from 'react-icons/fa';

const AdminDashboard = () => {
  const managementLinks = [
    {
      name: 'Project Management',
      path: '/manage-projects',
      icon: <FaTasks size={40} />,
      description: 'Add, edit, and delete your portfolio projects.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Skills Management',
      path: '/manage-skills',
      icon: <FaBrain size={40} />,
      description: 'Manage your technical skills and proficiencies.',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      name: 'Certifications Management',
      path: '/manage-certifications',
      icon: <FaAward size={40} />,
      description: 'Organize and display your professional certifications.',
      color: 'from-amber-500 to-orange-500',
    },
    {
      name: 'Education Management',
      path: '/manage-education',
      icon: <FaGraduationCap size={40} />,
      description: 'Maintain your academic and educational background.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'Experience Management',
      path: '/manage-experience',
      icon: <FaBriefcase size={40} />,
      description: 'Manage your work experience and education history.',
      color: 'from-blue-500 to-purple-500',
    },
    {
      name: 'Profile Settings',
      path: '/profile-settings',
      icon: <FaUserCircle size={40} />,
      description: 'Update your hero image and other profile details.',
      color: 'from-rose-500 to-pink-500',
    },
    {
      name: 'Messages',
      path: '/messages',
      icon: <FaEnvelope size={40} />,
      description: 'View messages sent through your contact form.',
      color: 'from-violet-500 to-purple-500',
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-[var(--text-color)] animate__animated animate__fadeInDown">
          Admin Dashboard
        </h1>
        <p className="text-xl text-[var(--text-color)] max-w-3xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
          Manage all aspects of your portfolio from one central location
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {managementLinks.map((link, index) => (
          <Link
            to={link.path}
            key={index}
            className="bg-[var(--secondary-color)] rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center text-center transform transition-all duration-500 hover:scale-105 hover:shadow-3xl border border-[var(--primary-color)] border-opacity-20 backdrop-blur-sm bg-opacity-80 animate__animated animate__fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Gradient circle background for icon */}
            <div className={`mb-6 w-24 h-24 rounded-full bg-gradient-to-br ${link.color} flex items-center justify-center shadow-lg transform transition duration-300 hover:scale-110`}>
              <div className="text-white">
                {link.icon}
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-[var(--text-color)] transition duration-300">
              {link.name}
            </h3>
            
            <p className="text-[var(--text-color)] mb-6 leading-relaxed">
              {link.description}
            </p>
            
            <div className="mt-auto">
              <button className={`px-6 py-2 rounded-full bg-gradient-to-r ${link.color} text-white font-semibold shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg`}>
                Manage
              </button>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Stats section */}
      <div className="mt-20 max-w-4xl mx-auto">
        <div className="bg-[var(--secondary-color)] rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-80 border border-[var(--primary-color)] border-opacity-20">
          <h2 className="text-3xl font-bold text-center mb-8 text-[var(--text-color)]">Quick Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-[var(--background-color)] p-6 rounded-xl text-center shadow-md">
              <div className="text-3xl font-bold text-[var(--primary-color)]">24</div>
              <div className="text-[var(--text-color)] mt-2">Projects</div>
            </div>
            <div className="bg-[var(--background-color)] p-6 rounded-xl text-center shadow-md">
              <div className="text-3xl font-bold text-[var(--primary-color)]">18</div>
              <div className="text-[var(--text-color)] mt-2">Skills</div>
            </div>
            <div className="bg-[var(--background-color)] p-6 rounded-xl text-center shadow-md">
              <div className="text-3xl font-bold text-[var(--primary-color)]">7</div>
              <div className="text-[var(--text-color)] mt-2">Certifications</div>
            </div>
            <div className="bg-[var(--background-color)] p-6 rounded-xl text-center shadow-md">
              <div className="text-3xl font-bold text-[var(--primary-color)]">12</div>
              <div className="text-[var(--text-color)] mt-2">Messages</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;