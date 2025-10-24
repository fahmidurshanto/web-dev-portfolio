import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaHackerrank, FaDev, FaFreeCodeCamp, FaFacebook, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import { FaSquareThreads } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { createMessage } from '../utils/api';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isMessageFocused, setIsMessageFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = {
      senderName: name,
      senderEmail: email,
      message: message,
    };

    try {
      await createMessage(newMessage);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Message sent successfully!',
        showConfirmButton: false,
        timer: 1500
      });
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error saving message:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to send message. Please try again.',
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-4 text-[var(--primary-color)] animate__animated animate__fadeInDown">Get In Touch</h2>
        <p className="text-lg text-center text-[var(--text-color)] mb-12 max-w-2xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
          Have a question or want to work together? Feel free to reach out!
        </p>
        
        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="w-full lg:w-7/12 bg-[var(--secondary-color)] p-8 rounded-2xl shadow-2xl backdrop-blur-sm bg-opacity-90 border border-[var(--primary-color)] border-opacity-20 animate__animated animate__fadeInLeft animate__delay-1s">
            <div className="mb-6 relative">
              <label htmlFor="name" className={`block text-[var(--text-color)] text-lg font-semibold mb-2 transition-all duration-300 ${isNameFocused ? 'text-[var(--primary-color)] scale-105' : ''}`}>Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  onFocus={() => setIsNameFocused(true)}
                  onBlur={() => setIsNameFocused(false)}
                  className={`shadow-sm appearance-none border rounded-lg w-full py-4 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none transition-all duration-300 ${
                    isNameFocused 
                      ? 'border-[var(--primary-color)] ring-2 ring-[var(--primary-color)] ring-opacity-50' 
                      : 'border-[var(--text-color)] border-opacity-30'
                  }`} 
                  placeholder="Your Name" 
                />
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 transition-opacity duration-300 ${
                  isNameFocused ? 'opacity-20' : ''
                } pointer-events-none`}></div>
              </div>
            </div>
            
            <div className="mb-6 relative">
              <label htmlFor="email" className={`block text-[var(--text-color)] text-lg font-semibold mb-2 transition-all duration-300 ${isEmailFocused ? 'text-[var(--primary-color)] scale-105' : ''}`}>Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  className={`shadow-sm appearance-none border rounded-lg w-full py-4 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none transition-all duration-300 ${
                    isEmailFocused 
                      ? 'border-[var(--primary-color)] ring-2 ring-[var(--primary-color)] ring-opacity-50' 
                      : 'border-[var(--text-color)] border-opacity-30'
                  }`} 
                  placeholder="your.email@example.com" 
                />
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 transition-opacity duration-300 ${
                  isEmailFocused ? 'opacity-20' : ''
                } pointer-events-none`}></div>
              </div>
            </div>
            
            <div className="mb-8 relative">
              <label htmlFor="message" className={`block text-[var(--text-color)] text-lg font-semibold mb-2 transition-all duration-300 ${isMessageFocused ? 'text-[var(--primary-color)] scale-105' : ''}`}>Message</label>
              <div className="relative">
                <textarea 
                  id="message" 
                  name="message" 
                  rows="6" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  onFocus={() => setIsMessageFocused(true)}
                  onBlur={() => setIsMessageFocused(false)}
                  className={`shadow-sm appearance-none border rounded-lg w-full py-4 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none transition-all duration-300 resize-none ${
                    isMessageFocused 
                      ? 'border-[var(--primary-color)] ring-2 ring-[var(--primary-color)] ring-opacity-50' 
                      : 'border-[var(--text-color)] border-opacity-30'
                  }`} 
                  placeholder="Your message..."
                ></textarea>
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 transition-opacity duration-300 ${
                  isMessageFocused ? 'opacity-20' : ''
                } pointer-events-none`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <button 
                type="submit" 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* Contact Info */}
          <div className="w-full lg:w-5/12 animate__animated animate__fadeInRight animate__delay-1s">
            <div className="bg-[var(--secondary-color)] p-8 rounded-2xl shadow-2xl backdrop-blur-sm bg-opacity-90 border border-[var(--primary-color)] border-opacity-20 mb-8">
              <h3 className="text-2xl font-bold mb-6 text-[var(--text-color)] border-l-4 border-[var(--primary-color)] pl-4">Connect with me</h3>
              <div className="space-y-4">
                <Link to="https://www.linkedin.com/in/fahmidurshanto" target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 group">
                  <div className="p-3 rounded-full bg-[var(--background-color)] mr-4 group-hover:bg-[var(--primary-color)] group-hover:text-white transition duration-300">
                    <FaLinkedin size={20} />
                  </div>
                  <span className="font-medium">LinkedIn</span>
                </Link>
                <Link to="https://github.com/fahmidurshanto" target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 group">
                  <div className="p-3 rounded-full bg-[var(--background-color)] mr-4 group-hover:bg-[var(--primary-color)] group-hover:text-white transition duration-300">
                    <FaGithub size={20} />
                  </div>
                  <span className="font-medium">GitHub</span>
                </Link>
                <Link to="https://twitter.com/FahmidurRShanto" target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 group">
                  <div className="p-3 rounded-full bg-[var(--background-color)] mr-4 group-hover:bg-[var(--primary-color)] group-hover:text-white transition duration-300">
                    <FaTwitter size={20} />
                  </div>
                  <span className="font-medium">Twitter</span>
                </Link>
                <Link to="https://www.hackerrank.com/profile/fahmidurrahaman1" target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 group">
                  <div className="p-3 rounded-full bg-[var(--background-color)] mr-4 group-hover:bg-[var(--primary-color)] group-hover:text-white transition duration-300">
                    <FaHackerrank size={20} />
                  </div>
                  <span className="font-medium">HackerRank</span>
                </Link>
                <Link to="https://devpost.com/fahmidurrahamanshanto" target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 group">
                  <div className="p-3 rounded-full bg-[var(--background-color)] mr-4 group-hover:bg-[var(--primary-color)] group-hover:text-white transition duration-300">
                    <FaDev size={20} />
                  </div>
                  <span className="font-medium">Devpost</span>
                </Link>
                <Link to="https://www.freecodecamp.org/fahmidurshanto" target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 group">
                  <div className="p-3 rounded-full bg-[var(--background-color)] mr-4 group-hover:bg-[var(--primary-color)] group-hover:text-white transition duration-300">
                    <FaFreeCodeCamp size={20} />
                  </div>
                  <span className="font-medium">freeCodeCamp</span>
                </Link>
                <Link to="https://www.facebook.com/mdfahmidurrahman.shanto.9/" target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 group">
                  <div className="p-3 rounded-full bg-[var(--background-color)] mr-4 group-hover:bg-[var(--primary-color)] group-hover:text-white transition duration-300">
                    <FaFacebook size={20} />
                  </div>
                  <span className="font-medium">Facebook</span>
                </Link>
                <Link to="https://www.instagram.com/fahmidurrahamanshanto/" target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 group">
                  <div className="p-3 rounded-full bg-[var(--background-color)] mr-4 group-hover:bg-[var(--primary-color)] group-hover:text-white transition duration-300">
                    <FaInstagram size={20} />
                  </div>
                  <span className="font-medium">Instagram</span>
                </Link>
                <Link to="https://www.threads.com/@fahmidurrahamanshanto" target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 group">
                  <div className="p-3 rounded-full bg-[var(--background-color)] mr-4 group-hover:bg-[var(--primary-color)] group-hover:text-white transition duration-300">
                    <FaSquareThreads size={20} />
                  </div>
                  <span className="font-medium">Threads</span>
                </Link>
              </div>
            </div>
            
            <div className="bg-[var(--secondary-color)] p-8 rounded-2xl shadow-2xl backdrop-blur-sm bg-opacity-90 border border-[var(--primary-color)] border-opacity-20">
              <h3 className="text-2xl font-bold mb-6 text-[var(--text-color)] border-l-4 border-[var(--primary-color)] pl-4">Direct Contact</h3>
              <div className="space-y-4">
                <a href="mailto:fahmidurrahamanshanto@gmail.com" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 group">
                  <div className="p-3 rounded-full bg-[var(--background-color)] mr-4 group-hover:bg-[var(--primary-color)] group-hover:text-white transition duration-300">
                    <FaEnvelope size={20} />
                  </div>
                  <span className="font-medium">fahmidurrahamanshanto@gmail.com</span>
                </a>
                <a href="tel:+8801640301028" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300 group">
                  <div className="p-3 rounded-full bg-[var(--background-color)] mr-4 group-hover:bg-[var(--primary-color)] group-hover:text-white transition duration-300">
                    <FaPhone size={20} />
                  </div>
                  <span className="font-medium">+8801640301028</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;