import React, { useState, useEffect } from 'react';
import { Parallax } from 'react-parallax';
import { getEducation } from '../utils/api';

const About = () => {
  const [educationEntries, setEducationEntries] = useState([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await getEducation();
        setEducationEntries(response.data || []);
      } catch (error) {
        console.error('Error fetching education:', error);
      }
    };
    fetchEducation();
  }, []);

  return (
    <Parallax bgImage="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" strength={300}>
      <section id="about" className="py-20 bg-[var(--background-color)] bg-opacity-90">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-[var(--text-color)] animate__animated animate__fadeInDown">About Me</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="md:w-1/2 animate__animated animate__fadeInLeft animate__delay-1s">
              <h3 className="text-3xl font-bold mb-6 text-[var(--text-color)]">Education</h3>
              {educationEntries.length > 0 ? (
                educationEntries.map((entry, index) => (
                  <div key={index} className="mb-4 p-4 rounded-lg shadow-md bg-[var(--secondary-color)]">
                    <h4 className="text-xl font-bold text-[var(--text-color)]">{entry.degree}</h4>
                    <p className="text-[var(--text-color)]"><strong>Institution:</strong> {entry.institution}</p>
                    <p className="text-[var(--text-color)]"><strong>Year:</strong> {new Date(entry.startDate).toLocaleDateString('en-US', { year: 'numeric' })} - {entry.endDate ? new Date(entry.endDate).toLocaleDateString('en-US', { year: 'numeric' }) : 'Present'}</p>
                    {entry.description && <p className="text-[var(--text-color)] text-sm mt-2">{entry.description}</p>}
                  </div>
                ))
              ) : (
                <p className="text-[var(--text-color)]">No education details added yet. Go to <a href="/manage-education" className="text-[var(--primary-color)] hover:underline font-semibold">Education Management</a> to add some!</p>
              )}
            </div>
            <div className="md:w-1/2 md:pl-8 animate__animated animate__fadeInRight animate__delay-1s">
              <p className="text-lg leading-relaxed text-[var(--text-color)] mb-4">
                I am a passionate MERN stack developer with a strong foundation in building dynamic and responsive web applications. My expertise spans across front-end and back-end development, allowing me to create seamless user experiences and robust server-side logic.
              </p>
              <p className="text-lg leading-relaxed text-[var(--text-color)]">
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
