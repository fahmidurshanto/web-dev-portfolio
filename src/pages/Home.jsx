import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Certifications from '../components/Certifications';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Certifications />
      <Projects />
      <Contact />
    </div>
  );
};

export default Home;