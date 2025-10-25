import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { toggleTheme } from '../utils/theme';
import DigitalWatch from './DigitalWatch';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navItems = [
    { name: "Home", to: "hero" },
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Experience", to: "experience" },
    { name: "Services", to: "services" },
    { name: "Projects", to: "projects" },
    { name: "Certifications", to: "certifications" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--background-color)] bg-opacity-90 backdrop-blur-lg py-3 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-2.5">
        <div className="flex justify-between items-center">
          <RouterLink
            to="/"
            className="text-[var(--text-color)] text-2xl font-bold hover:text-[var(--primary-color)] transition duration-300 transform hover:scale-105 animate__animated animate__fadeInDown"
          >
            Fahmidur's Portfolio
          </RouterLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-1">
              <div className="text-[var(--text-color)] text-xs animate__animated animate__fadeIn animate__delay-1s">
                <DigitalWatch />
              </div>
              <button
                onClick={toggleTheme}
                className="text-[var(--text-color)] focus:outline-none cursor-pointer transform hover:scale-110 transition duration-300 animate__animated animate__fadeIn animate__delay-1s hover:animate__bounce"
                aria-label="Toggle theme"
              >
                <FaSun size={18} className="hidden dark-mode:block" />
                <FaMoon size={18} className="block dark-mode:hidden" />
              </button>

              {navItems.map((item, index) => (
                <ScrollLink
                  key={item.name}
                  to={item.to}
                  smooth={true}
                  duration={500}
                  className={`text-[var(--text-color)] text-xs font-medium hover:text-[var(--primary-color)] transition duration-300 cursor-pointer relative group px-1 py-2 whitespace-nowrap animate__animated animate__fadeInDown`}
                  onClick={closeMenu}
                  style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-color)] transition-all duration-300 group-hover:w-full"></span>
                </ScrollLink>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <div className="text-[var(--text-color)] text-xs animate__animated animate__fadeIn">
              <DigitalWatch />
            </div>
            <button
              onClick={toggleTheme}
              className="text-[var(--text-color)] focus:outline-none cursor-pointer animate__animated animate__fadeIn hover:animate__bounce"
              aria-label="Toggle theme"
            >
              <FaSun size={20} className="hidden dark-mode:block" />
              <FaMoon size={20} className="block dark-mode:hidden" />
            </button>
            <button
              onClick={toggleMenu}
              className="text-[var(--text-color)] focus:outline-none z-50 animate__animated animate__fadeIn"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed inset-0 bg-[var(--background-color)] bg-opacity-95 backdrop-blur-lg z-40 transition-all duration-500 ease-in-out ${
            isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
          } animate__animated ${
            isOpen ? "animate__slideInLeft" : "animate__slideOutLeft"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navItems.map((item, index) => (
              <ScrollLink
                key={item.name}
                to={item.to}
                smooth={true}
                duration={500}
                className="text-[var(--text-color)] text-2xl font-medium hover:text-[var(--primary-color)] transition duration-300 cursor-pointer relative group animate__animated animate__fadeInRight"
                onClick={closeMenu}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-color)] transition-all duration-300 group-hover:w-full"></span>
              </ScrollLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;