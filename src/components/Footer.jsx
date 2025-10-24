import React from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { FaLinkedin, FaGithub, FaTwitter, FaHackerrank, FaDev, FaFreeCodeCamp, FaFacebook, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import { FaSquareThreads } from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaLinkedin size={20} />, url: "https://www.linkedin.com/in/fahmidurshanto", name: "LinkedIn" },
    { icon: <FaGithub size={20} />, url: "https://github.com/fahmidurshanto", name: "GitHub" },
    { icon: <FaTwitter size={20} />, url: "https://twitter.com/FahmidurRShanto", name: "Twitter" },
    { icon: <FaHackerrank size={20} />, url: "https://www.hackerrank.com/profile/fahmidurrahaman1", name: "HackerRank" },
    { icon: <FaDev size={20} />, url: "https://devpost.com/fahmidurrahamanshanto", name: "Devpost" },
    { icon: <FaFreeCodeCamp size={20} />, url: "https://www.freecodecamp.org/fahmidurshanto", name: "freeCodeCamp" },
    { icon: <FaFacebook size={20} />, url: "https://www.facebook.com/mdfahmidurrahman.shanto.9/", name: "Facebook" },
    { icon: <FaInstagram size={20} />, url: "https://www.instagram.com/fahmidurrahamanshanto/", name: "Instagram" },
    { icon: <FaSquareThreads size={20} />, url: "https://www.threads.com/@fahmidurrahamanshanto", name: "Threads" },
  ];

  return (
    <footer className="bg-[var(--background-color)] text-[var(--text-color)] pt-16 pb-8 border-t border-[var(--primary-color)] border-opacity-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="animate__animated animate__fadeInUp">
            <h3 className="text-2xl font-bold mb-6 text-[var(--primary-color)] border-l-4 border-[var(--primary-color)] pl-4">About Me</h3>
            <p className="text-[var(--text-color)] mb-6 leading-relaxed">
              I'm a passionate MERN Stack Developer dedicated to creating exceptional digital experiences that are fast, accessible, and visually appealing.
            </p>
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Fahmidur Rahaman Shanto
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate__animated animate__fadeInUp animate__delay-1s">
            <h3 className="text-2xl font-bold mb-6 text-[var(--primary-color)] border-l-4 border-[var(--primary-color)] pl-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full mr-3 group-hover:animate-ping"></span>
                  Home
                </Link>
              </li>
              <li>
                <ScrollLink to="about" smooth={true} className="text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 flex items-center group cursor-pointer">
                  <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full mr-3 group-hover:animate-ping"></span>
                  About
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="skills" smooth={true} className="text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 flex items-center group cursor-pointer">
                  <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full mr-3 group-hover:animate-ping"></span>
                  Skills
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="experience" smooth={true} className="text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 flex items-center group cursor-pointer">
                  <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full mr-3 group-hover:animate-ping"></span>
                  Experience
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="services" smooth={true} className="text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 flex items-center group cursor-pointer">
                  <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full mr-3 group-hover:animate-ping"></span>
                  Services
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="projects" smooth={true} className="text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 flex items-center group cursor-pointer">
                  <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full mr-3 group-hover:animate-ping"></span>
                  Projects
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="certifications" smooth={true} className="text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 flex items-center group cursor-pointer">
                  <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full mr-3 group-hover:animate-ping"></span>
                  Certifications
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="contact" smooth={true} className="text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 flex items-center group cursor-pointer">
                  <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full mr-3 group-hover:animate-ping"></span>
                  Contact
                </ScrollLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate__animated animate__fadeInUp animate__delay-2s">
            <h3 className="text-2xl font-bold mb-6 text-[var(--primary-color)] border-l-4 border-[var(--primary-color)] pl-4">Contact Info</h3>
            <div className="space-y-4">
              <a href="mailto:fahmidurrahamanshanto@gmail.com" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 group">
                <div className="p-2 rounded-full bg-[var(--secondary-color)] mr-4 group-hover:bg-[var(--primary-color)] group-hover:text-white transition duration-300">
                  <FaEnvelope size={16} />
                </div>
                <span>fahmidurrahamanshanto@gmail.com</span>
              </a>
              <a href="tel:+8801640301028" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 group">
                <div className="p-2 rounded-full bg-[var(--secondary-color)] mr-4 group-hover:bg-[var(--primary-color)] group-hover:text-white transition duration-300">
                  <FaPhone size={16} />
                </div>
                <span>+8801640301028</span>
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="animate__animated animate__fadeInUp animate__delay-3s">
            <h3 className="text-2xl font-bold mb-6 text-[var(--primary-color)] border-l-4 border-[var(--primary-color)] pl-4">Connect</h3>
            <div className="grid grid-cols-3 gap-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-3 rounded-full bg-[var(--secondary-color)] text-[var(--text-color)] hover:bg-[var(--primary-color)] hover:text-white transition duration-300 transform hover:scale-110 shadow-md"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[var(--primary-color)] border-opacity-20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[var(--text-color)] mb-4 md:mb-0">
              &copy; {currentYear} Fahmidur Rahaman Shanto. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              <ScrollLink to="hero" smooth={true} className="text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 cursor-pointer">
                Back to Top
              </ScrollLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;