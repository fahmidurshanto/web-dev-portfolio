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
        <h2 className="text-4xl font-extrabold text-center mb-12 text-[var(--primary-color)] animate__animated animate__fadeInDown">Contact Me</h2>
        <p className="text-lg text-center text-[var(--text-color)] mb-10 max-w-2xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
          Have a question or want to work together? Feel free to reach out using the form below or connect with me on social media.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-start md:space-x-8">
          <form onSubmit={handleSubmit} className="w-full md:w-7/12 bg-[var(--secondary-color)] p-10 rounded-lg shadow-2xl animate__animated animate__fadeInUp animate__delay-2s">
            <div className="mb-6">
              <label htmlFor="name" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Name</label>
              <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="shadow-sm appearance-none border border-[var(--primary-color)] rounded w-full py-3 px-4 bg-[var(--secondary-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" placeholder="Your Name" />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Email</label>
              <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow-sm appearance-none border border-[var(--primary-color)] rounded w-full py-3 px-4 bg-[var(--secondary-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" placeholder="your.email@example.com" />
            </div>
            <div className="mb-8">
              <label htmlFor="message" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Message</label>
              <textarea id="message" name="message" rows="6" value={message} onChange={(e) => setMessage(e.target.value)} className="shadow-sm appearance-none border border-[var(--primary-color)] rounded w-full py-3 px-4 bg-[var(--secondary-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" placeholder="Your message..."></textarea>
            </div>
            <div className="flex items-center justify-center">
              <button type="submit" className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105">Send Message</button>
            </div>
          </form>

          <div className="mt-8 md:mt-0 w-full md:w-5/12 bg-[var(--secondary-color)] p-10 rounded-lg shadow-2xl animate__animated animate__fadeInUp animate__delay-2s">
            <h3 className="text-2xl font-bold mb-6 text-[var(--text-color)]">Connect with me</h3>
            <div className="flex flex-col space-y-4">
              <Link to="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300">
                <FaLinkedin size={30} className="mr-4" /> LinkedIn
              </Link>
              <Link to="https://github.com/fahmidurshanto" target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300">
                <FaGithub size={30} className="mr-4" /> GitHub
              </Link>
              <Link to="https://twitter.com/FahmidurRShanto" target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300">
                <FaTwitter size={30} className="mr-4" /> Twitter
              </Link>
              <Link to="https://www.hackerrank.com/profile/fahmidurrahaman1" target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300">
                <FaHackerrank size={30} className="mr-4" /> HackerRank
              </Link>
              <Link to="https://devpost.com/fahmidurrahamanshanto" target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300">
                <FaDev size={30} className="mr-4" /> Devpost
              </Link>
              <Link to="https://www.freecodecamp.org/fahmidurshanto" target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300">
                <FaFreeCodeCamp size={30} className="mr-4" /> freeCodeCamp
              </Link>
              <Link to="https://www.facebook.com/mdfahmidurrahman.shanto.9/" target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300">
                <FaFacebook size={30} className="mr-4" /> Facebook
              </Link>
              <Link to="https://www.instagram.com/fahmidurrahamanshanto/" target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300">
                <FaInstagram size={30} className="mr-4" /> Instagram
              </Link>
              <Link to="https://www.threads.com/@fahmidurrahamanshanto" target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300">
                <FaSquareThreads size={30} className="mr-4" /> Threads
              </Link>
              <a href="mailto:fahmidurrahamanshanto@gmail.com" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300">
                <FaEnvelope size={30} className="mr-4" /> fahmidurrahamanshanto@gmail.com
              </a>
              <a href="tel:+8801640301028" className="flex items-center text-[var(--text-color)] hover:text-[var(--primary-color)] transition duration-300">
                <FaPhone size={30} className="mr-4" /> +8801640301028
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
