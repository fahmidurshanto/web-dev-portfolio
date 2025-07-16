import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-900 p-5 sticky top-0 z-50 shadow-xl animate__animated animate__fadeInDown">
      <div className="container mx-auto flex justify-between items-center">
        <RouterLink to="/" className="text-white text-2xl font-bold hover:text-blue-400 transition duration-300">Fahmidur Rahaman Shanto</RouterLink>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <ul className={`md:flex md:space-x-8 ${isOpen ? 'flex flex-col absolute top-full left-0 w-full bg-gray-900 p-4 shadow-lg items-center space-y-4 animate__animated animate__fadeInDown animate__faster' : 'hidden'} md:relative md:p-0 md:shadow-none md:flex-row md:space-y-0`}>
          <li><ScrollLink to="hero" smooth={true} duration={500} className="text-white text-lg hover:text-blue-400 transition duration-300 cursor-pointer" onClick={closeMenu}>Home</ScrollLink></li>
          <li><ScrollLink to="about" smooth={true} duration={500} className="text-white text-lg hover:text-blue-400 transition duration-300 cursor-pointer" onClick={closeMenu}>About</ScrollLink></li>
          <li><ScrollLink to="skills" smooth={true} duration={500} className="text-white text-lg hover:text-blue-400 transition duration-300 cursor-pointer" onClick={closeMenu}>Skills</ScrollLink></li>
          <li><ScrollLink to="projects" smooth={true} duration={500} className="text-white text-lg hover:text-blue-400 transition duration-300 cursor-pointer" onClick={closeMenu}>Projects</ScrollLink></li>
          <li><ScrollLink to="certifications" smooth={true} duration={500} className="text-white text-lg hover:text-blue-400 transition duration-300 cursor-pointer" onClick={closeMenu}>Certifications</ScrollLink></li>
          <li><ScrollLink to="contact" smooth={true} duration={500} className="text-white text-lg hover:text-blue-400 transition duration-300 cursor-pointer" onClick={closeMenu}>Contact</ScrollLink></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
