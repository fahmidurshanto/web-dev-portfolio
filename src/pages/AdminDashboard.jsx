import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaTasks, FaBrain, FaAward, FaGraduationCap, FaUserCircle, FaEnvelope,
} from 'react-icons/fa';

const AdminDashboard = () => {
  const managementLinks = [
    {
      name: 'Project Management',
      path: '/manage-projects',
      icon: <FaTasks size={40} />,
      description: 'Add, edit, and delete your portfolio projects.',
    },
    {
      name: 'Skills Management',
      path: '/manage-skills',
      icon: <FaBrain size={40} />,
      description: 'Manage your technical skills and proficiencies.',
    },
    {
      name: 'Certifications Management',
      path: '/manage-certifications',
      icon: <FaAward size={40} />,
      description: 'Organize and display your professional certifications.',
    },
    {
      name: 'Education Management',
      path: '/manage-education',
      icon: <FaGraduationCap size={40} />,
      description: 'Maintain your academic and educational background.',
    },
    {
      name: 'Profile Settings',
      path: '/profile-settings',
      icon: <FaUserCircle size={40} />,
      description: 'Update your hero image and other profile details.',
    },
    {
      name: 'Messages',
      path: '/messages',
      icon: <FaEnvelope size={40} />,
      description: 'View messages sent through your contact form.',
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-12 text-[var(--text-color)] animate__animated animate__fadeInDown">
        Admin Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {managementLinks.map((link, index) => (
          <Link
            to={link.path}
            key={index}
            className="bg-[var(--secondary-color)] rounded-lg shadow-xl p-8 flex flex-col items-center justify-center text-center transform transition duration-300 hover:scale-105 hover:bg-[var(--primary-color)] hover:text-white animate__animated animate__fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="mb-4 text-[var(--primary-color)] hover:text-white transition duration-300">
              {link.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-[var(--text-color)] hover:text-white transition duration-300">
              {link.name}
            </h3>
            <p className="text-[var(--text-color)] hover:text-white transition duration-300">
              {link.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
