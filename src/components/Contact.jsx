import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-400 animate__animated animate__fadeInDown">Contact Me</h2>
        <p className="text-lg text-center text-gray-300 mb-10 max-w-2xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
          Have a question or want to work together? Feel free to reach out using the form below or connect with me on social media.
        </p>
        <form className="max-w-lg mx-auto bg-gray-800 p-10 rounded-lg shadow-2xl animate__animated animate__fadeInUp animate__delay-2s">
          <div className="mb-6">
            <label htmlFor="name" className="block text-white text-lg font-semibold mb-2">Name</label>
            <input type="text" id="name" name="name" className="shadow-sm appearance-none border border-gray-700 rounded w-full py-3 px-4 bg-gray-700 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300" placeholder="Your Name" />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-white text-lg font-semibold mb-2">Email</label>
            <input type="email" id="email" name="email" className="shadow-sm appearance-none border border-gray-700 rounded w-full py-3 px-4 bg-gray-700 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300" placeholder="your.email@example.com" />
          </div>
          <div className="mb-8">
            <label htmlFor="message" className="block text-white text-lg font-semibold mb-2">Message</label>
            <textarea id="message" name="message" rows="6" className="shadow-sm appearance-none border border-gray-700 rounded w-full py-3 px-4 bg-gray-700 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300" placeholder="Your message..."></textarea>
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105">Send Message</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
