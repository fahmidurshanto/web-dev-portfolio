import React from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FaLinkedin size={20} />,
      url: "https://www.linkedin.com/in/fahmidurshanto",
      name: "LinkedIn",
    },
    {
      icon: <FaGithub size={20} />,
      url: "https://github.com/fahmidurshanto",
      name: "GitHub",
    },
    {
      icon: <FaTwitter size={20} />,
      url: "https://twitter.com/FahmidurRShanto",
      name: "Twitter",
    },
    {
      icon: <FaEnvelope size={20} />,
      url: "mailto:fahmidurrahamanshanto@gmail.com",
      name: "Email",
    },
  ];

  return (
    <footer className="bg-[var(--background-color)] text-[var(--text-color)] pt-12 pb-6 border-t border-[var(--primary-color)] border-opacity-20 relative overflow-hidden">
      {/* Electric effect background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1/4 h-0.5 bg-blue-500 animate-pulse"></div>
        <div
          className="absolute top-0 right-1/4 w-1/4 h-0.5 bg-purple-500 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-0 left-1/3 w-1/3 h-0.5 bg-cyan-500 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div className="md:col-span-1 animate__animated animate__fadeInUp">
            <h3 className="text-xl font-bold mb-4 text-[var(--primary-color)] relative inline-block animate__animated animate__pulse animate__delay-1s">
              Fahmidur Rahaman Shanto
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-pulse"></span>
            </h3>
            <p className="text-[var(--text-color)] mb-4 text-sm animate__animated animate__fadeIn animate__delay-2s">
              MERN Stack Developer passionate about creating exceptional digital
              experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1 animate__animated animate__fadeInUp animate__delay-1s">
            <h3 className="text-xl font-bold mb-4 text-[var(--primary-color)] relative inline-block animate__animated animate__pulse animate__delay-2s">
              Navigation
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-pulse"></span>
            </h3>
            <ul className="space-y-2">
              <li className="animate__animated animate__fadeInLeft animate__delay-2s">
                <Link
                  to="/"
                  className="text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 text-sm relative group"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-color)] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li className="animate__animated animate__fadeInLeft animate__delay-3s">
                <ScrollLink
                  to="about"
                  smooth={true}
                  className="text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 text-sm cursor-pointer relative group"
                >
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-color)] transition-all duration-300 group-hover:w-full"></span>
                </ScrollLink>
              </li>
              <li className="animate__animated animate__fadeInLeft animate__delay-4s">
                <ScrollLink
                  to="projects"
                  smooth={true}
                  className="text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 text-sm cursor-pointer relative group"
                >
                  Projects
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-color)] transition-all duration-300 group-hover:w-full"></span>
                </ScrollLink>
              </li>
              <li className="animate__animated animate__fadeInLeft animate__delay-5s">
                <ScrollLink
                  to="contact"
                  smooth={true}
                  className="text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 text-sm cursor-pointer relative group"
                >
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-color)] transition-all duration-300 group-hover:w-full"></span>
                </ScrollLink>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="md:col-span-1 animate__animated animate__fadeInUp animate__delay-2s">
            <h3 className="text-xl font-bold mb-4 text-[var(--primary-color)] relative inline-block animate__animated animate__pulse animate__delay-3s">
              Connect
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-pulse"></span>
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[var(--secondary-color)] text-[var(--text-color)] hover:bg-[var(--primary-color)] hover:text-white transition duration-300 transform hover:scale-110 relative overflow-hidden animate__animated animate__bounceIn animate__delay-4s"
                  style={{ animationDelay: `${index * 0.2 + 4}s` }}
                  aria-label={link.name}
                >
                  {link.icon}
                  {/* Electric glow effect on hover */}
                  <span className="absolute inset-0 rounded-full shadow-[0_0_10px_2px_rgba(59,130,246,0.5)] opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[var(--primary-color)] border-opacity-20 pt-6 mt-6 animate__animated animate__fadeIn animate__delay-5s">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[var(--text-color)] text-sm mb-4 md:mb-0 animate__animated animate__fadeIn animate__delay-6s">
              &copy; {currentYear} Fahmidur Rahaman Shanto. All Rights Reserved.
            </p>
            <div className="flex space-x-4 animate__animated animate__fadeIn animate__delay-7s">
              <ScrollLink
                to="hero"
                smooth={true}
                className="text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 text-sm cursor-pointer relative group animate__animated animate__heartBeat animate__delay-8s animate__slow"
              >
                Back to Top
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-color)] transition-all duration-300 group-hover:w-full"></span>
              </ScrollLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;