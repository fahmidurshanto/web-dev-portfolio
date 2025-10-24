import React, { useState, useEffect } from 'react';
import { Parallax } from 'react-parallax';
import axios from 'axios';
import { Link } from "react-router-dom";
import { getUsers } from '../utils/api';

const defaultProfileImg = 'https://res.cloudinary.com/dvtkiwkn2/image/upload/v1757499619/fahmidurshanto_profile_rm86tp.png'

const Hero = () => {
  const [heroImage, setHeroImage] = useState(defaultProfileImg);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Try to get user data from the backend
        const usersResponse = await getUsers();
        if (usersResponse.data && usersResponse.data.length > 0) {
          // Use the first user's profile picture if available
          const user = usersResponse.data[0];
          if (user.profilePicture) {
            setHeroImage(user.profilePicture);
            return;
          }
        }
        
        // Fallback to the api.json if no users exist or user has no profile picture
        const response = await axios.get('/api.json');
        const storedImage = response.data.profile.heroImage;
        if (storedImage) {
          setHeroImage(storedImage);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Final fallback to api.json
        try {
          const response = await axios.get('/api.json');
          const storedImage = response.data.profile.heroImage;
          if (storedImage) {
            setHeroImage(storedImage);
          }
        } catch (jsonError) {
          console.error('Error fetching hero image from api.json:', jsonError);
          // Ensure we always have a fallback image
          setHeroImage(defaultProfileImg);
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <Parallax bgImage="https://res.cloudinary.com/dvtkiwkn2/image/upload/v1757499619/fahmidurshanto_profile_rm86tp.png" strength={600}>
      <section id="hero" className="h-screen text-[var(--text-color)] flex items-center bg-[var(--background-color)] bg-opacity-50">
        <div className="container mx-auto text-center p-8">
          <img src={heroImage} alt="Fahmidur Rahaman Shanto" className="w-56 h-56 rounded-full mx-auto mb-6 border-4 border-[var(--text-color)] shadow-2xl animate__animated animate__zoomIn" />
          <h1 className="text-6xl font-extrabold leading-tight animate__animated animate__fadeInUp text-[var(--text-color)]">Fahmidur Rahaman Shanto</h1>
          <p className="text-3xl mt-4 font-light animate__animated animate__fadeInUp animate__delay-1s">MERN Stack Developer</p>
          <button className="mt-10 inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105 animate__animated animate__fadeInUp animate__delay-2s"><Link to="https://drive.google.com/file/d/1Z95aDgDRR1d17xzx5JwPZmcFUYoO9hqH/view?usp=sharing">Download Resume</Link></button>
        </div>
      </section>
    </Parallax>
  );
};

export default Hero;