import { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Spline from '@splinetool/react-spline';
import { getUsers } from '../utils/api';

const defaultProfileImg = 'https://res.cloudinary.com/dvtkiwkn2/image/upload/v1757499619/fahmidurshanto_profile_rm86tp.png'

const Hero = () => {
  const [heroImage, setHeroImage] = useState(defaultProfileImg);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersResponse = await getUsers();
        if (usersResponse.data && usersResponse.data.length > 0) {
          const user = usersResponse.data[0];
          if (user.profilePicture) {
            setHeroImage(user.profilePicture);
            return;
          }
        }

        const response = await axios.get('/api.json');
        const storedImage = response.data.profile.heroImage;
        if (storedImage) {
          setHeroImage(storedImage);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        try {
          const response = await axios.get('/api.json');
          const storedImage = response.data.profile.heroImage;
          if (storedImage) {
            setHeroImage(storedImage);
          }
        } catch (jsonError) {
          console.error('Error fetching hero image from api.json:', jsonError);
          setHeroImage(defaultProfileImg);
        }
      } finally {
        setIsLoaded(true);
      }
    };
    fetchUserData();
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-[var(--background-color)] overflow-hidden py-20 lg:py-0">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* Text Content Section (Left Side) */}
          <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1 relative z-20">
            <div className="animate__animated animate__fadeInLeft animate__delay-1s">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-medium text-sm mb-6 animate__animated animate__fadeInDown">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Available for new projects
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-8xl font-black leading-[1.1] mb-6 text-[var(--text-color)] tracking-tight">
                <span className="block opacity-80 text-3xl md:text-4xl lg:text-5xl font-bold mb-2">Hello, I'm</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                  Fahmidur Rahaman
                </span>
              </h1>

              <div className="mb-8 animate__animated animate__fadeInUp animate__delay-2s">
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-color)] opacity-90">
                  Expert <span className="text-blue-600">MERN Stack</span> Developer
                </h2>
              </div>

              <p className="text-lg md:text-xl text-[var(--text-color)] mb-10 leading-relaxed opacity-80 max-w-2xl mx-auto lg:mx-0 animate__animated animate__fadeInUp animate__delay-3s">
                I specialize in crafting high-performance, visually stunning, and user-centric web applications.
                Let's turn your innovative ideas into digital reality.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start animate__animated animate__fadeInUp animate__delay-4s">
                <a href="https://drive.google.com/file/d/1Z95aDgDRR1d17xzx5JwPZmcFUYoO9hqH/view?usp=sharing" target="_blank" rel="noopener noreferrer"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25 flex items-center justify-center gap-2">
                  Download Resume
                  <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                </a>
                <a href="#contact"
                  className="px-8 py-4 bg-gray-900 dark:bg-gray-800 border-2 border-gray-900 dark:border-gray-700 text-white font-bold rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:bg-transparent hover:text-gray-900 dark:hover:text-white hover:border-blue-500 flex items-center justify-center gap-2">
                  Get In Touch
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                </a>
              </div>

              {/* Social Icons */}
              <div className="flex justify-center lg:justify-start gap-4 mt-12 animate__animated animate__fadeInUp animate__delay-5s">
                {[
                  { href: "https://github.com/fahmidurshanto", icon: "github" },
                  { href: "https://www.linkedin.com/in/fahmidurshanto", icon: "linkedin" },
                  { href: "https://x.com/FahmidurRShanto", icon: "twitter" }
                ].map((social, idx) => (
                  <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-sm">
                    {social.icon === 'github' && <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>}
                    {social.icon === 'linkedin' && <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>}
                    {social.icon === 'twitter' && <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Spline 3D Section (Right Side) */}
          <div className="w-full lg:w-1/2 h-[480px] md:h-[500px] lg:h-[550px] flex justify-center items-center order-1 lg:order-2 relative z-10">
            <Suspense fallback={
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-[80px] opacity-20 animate-pulse group-hover:opacity-40 transition-opacity"></div>
                <img
                  src={heroImage}
                  alt="Fahmidur Rahaman Shanto"
                  className={`relative w-48 h-48 md:w-64 md:h-64 lg:w-[400px] lg:h-[400px] rounded-full object-cover border-8 border-white/10 shadow-2xl backdrop-blur-sm transition duration-1000 hover:scale-105 ${isLoaded ? 'animate__animated animate__zoomIn' : ''}`}
                />
              </div>
            }>
              <div className="w-full h-full min-w-[280px] select-none">
                <Spline
                  scene="https://prod.spline.design/A9ENMdKPBRXX8Rbh/scene.splinecode"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
