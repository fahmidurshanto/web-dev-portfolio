import React, { useState, useEffect } from 'react';
import { Parallax } from 'react-parallax';
import axios from 'axios';
import defaultProfileImg from "../assets/fahmidurshanto.jpg";

const Hero = () => {
  const [heroImage, setHeroImage] = useState(defaultProfileImg);

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const response = await axios.get('/api.json');
        const storedImage = response.data.profile.heroImage;
        if (storedImage) {
          setHeroImage(storedImage);
        }
      } catch (error) {
        console.error('Error fetching hero image:', error);
      }
    };
    fetchHeroImage();
  }, []);

  return (
    <Parallax bgImage="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" strength={600}>
      <section id="hero" className="h-screen text-[var(--text-color)] flex items-center bg-[var(--background-color)] bg-opacity-50">
        <div className="container mx-auto text-center p-8">
          <img src={heroImage} alt="Fahmidur Rahaman Shanto" className="w-56 h-56 rounded-full mx-auto mb-6 border-4 border-[var(--text-color)] shadow-2xl animate__animated animate__zoomIn" />
          <h1 className="text-6xl font-extrabold leading-tight animate__animated animate__fadeInUp text-[var(--text-color)]">Fahmidur Rahaman Shanto</h1>
          <p className="text-3xl mt-4 font-light animate__animated animate__fadeInUp animate__delay-1s">MERN Stack Developer</p>
          <a href="#" className="mt-10 inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105 animate__animated animate__fadeInUp animate__delay-2s">Download Resume</a>
        </div>
      </section>
    </Parallax>
  );
};

export default Hero;
