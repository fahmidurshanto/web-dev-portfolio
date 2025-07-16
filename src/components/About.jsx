import React from 'react';
import { Parallax } from 'react-parallax';

const About = () => {
  return (
    <Parallax bgImage="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" strength={300}>
      <section id="about" className="py-20 bg-white bg-opacity-90">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 animate__animated animate__fadeInDown">About Me</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="md:w-1/2 animate__animated animate__fadeInLeft animate__delay-1s">
              <img src="https://i.ibb.co/pP9GzG1/shanto.png" alt="About Me" className="rounded-lg shadow-2xl w-full h-auto object-cover transform transition duration-500 hover:scale-105" />
            </div>
            <div className="md:w-1/2 md:pl-8 animate__animated animate__fadeInRight animate__delay-1s">
              <p className="text-lg leading-relaxed text-gray-700 mb-4">
                I am a passionate MERN stack developer with a strong foundation in building dynamic and responsive web applications. My expertise spans across front-end and back-end development, allowing me to create seamless user experiences and robust server-side logic.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                I am proficient in JavaScript, React, Node.js, and MongoDB, and I am always eager to learn new technologies and best practices. I thrive in collaborative environments and am committed to delivering high-quality, scalable solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Parallax>
  );
};

export default About;
