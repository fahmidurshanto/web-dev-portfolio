import  { useState, useEffect } from 'react';
import { getEducation } from '../utils/api';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

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
    <section id="about" className="py-20 mt-52 bg-[var(--background-color)] bg-opacity-90">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-[var(--text-color)] animate__animated animate__fadeInDown">
            About Me
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Personal Description */}
            <div className="lg:w-1/2 animate__animated animate__fadeInLeft animate__delay-1s">
              <div className="bg-[var(--secondary-color)] rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-90">
                <h3 className="text-3xl font-bold mb-6 text-[var(--text-color)] border-l-4 border-[var(--primary-color)] pl-4">
                  My Journey
                </h3>
                <p className="text-lg leading-relaxed text-[var(--text-color)] mb-6">
                  I am a passionate MERN stack developer with a strong foundation in building dynamic and responsive web applications. 
                  My expertise spans across front-end and back-end development, allowing me to create seamless user experiences 
                  and robust server-side logic.
                </p>
                <p className="text-lg leading-relaxed text-[var(--text-color)] mb-6">
                  I am proficient in JavaScript, React, Node.js, and MongoDB, and I am always eager to learn new technologies 
                  and best practices. I thrive in collaborative environments and am committed to delivering high-quality, 
                  scalable solutions.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <div className="bg-[var(--primary-color)] text-white py-2 px-4 rounded-full text-sm font-semibold">
                    Problem Solving
                  </div>
                  <div className="bg-[var(--primary-color)] text-white py-2 px-4 rounded-full text-sm font-semibold">
                    Team Collaboration
                  </div>
                  <div className="bg-[var(--primary-color)] text-white py-2 px-4 rounded-full text-sm font-semibold">
                    Continuous Learning
                  </div>
                </div>
              </div>
            </div>
            
            {/* Education Timeline */}
            <div className="lg:w-1/2 animate__animated animate__fadeInRight animate__delay-1s">
              <div className="bg-[var(--secondary-color)] rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-90">
                <h3 className="text-3xl font-bold mb-8 text-[var(--text-color)] border-l-4 border-[var(--primary-color)] pl-4">
                  Education
                </h3>
                
                {educationEntries.length > 0 ? (
                  <VerticalTimeline>
                    {educationEntries.map((entry, index) => (
                      <VerticalTimelineElement
                        key={index}
                        className="vertical-timeline-element--education"
                        contentStyle={{ 
                          background: 'var(--background-color)', 
                          color: 'var(--text-color)',
                          borderRadius: '12px',
                          boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                        }}
                        contentArrowStyle={{ borderRight: '7px solid var(--background-color)' }}
                        date={`${new Date(entry.startDate).toLocaleDateString('en-US', { year: 'numeric' })} - ${entry.endDate ? new Date(entry.endDate).toLocaleDateString('en-US', { year: 'numeric' }) : 'Present'}`}
                        dateClassName="text-[var(--primary-color)] font-bold"
                        iconStyle={{ 
                          background: 'var(--primary-color)', 
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        icon={
                          <div className="flex items-center justify-center w-full h-full text-white text-xl">
                            🎓
                          </div>
                        }
                      >
                        <h4 className="vertical-timeline-element-title text-xl font-bold text-[var(--text-color)]">
                          {entry.degree}
                        </h4>
                        <h5 className="vertical-timeline-element-subtitle text-lg font-semibold text-[var(--primary-color)] mt-2">
                          {entry.institution}
                        </h5>
                        {entry.description && (
                          <p className="mt-3 text-[var(--text-color)]">
                            {entry.description}
                          </p>
                        )}
                      </VerticalTimelineElement>
                    ))}
                    <VerticalTimelineElement
                      iconStyle={{ 
                        background: 'var(--primary-color)', 
                        color: '#fff' 
                      }}
                      icon={
                        <div className="flex items-center justify-center w-full h-full text-white text-xl">
                          ✓
                        </div>
                      }
                    />
                  </VerticalTimeline>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-[var(--text-color)] mb-4">
                      No education details added yet.
                    </p>
                    <a 
                      href="/manage-education" 
                      className="inline-block bg-[var(--primary-color)] hover:bg-opacity-90 text-white font-bold py-2 px-6 rounded-full transition duration-300"
                    >
                      Add Education
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Skills Summary */}
          <div className="mt-16 animate__animated animate__fadeInUp animate__delay-2s">
            <div className="bg-[var(--secondary-color)] rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-90">
              <h3 className="text-3xl font-bold mb-8 text-[var(--text-color)] text-center">
                Technical Expertise
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-[var(--background-color)] p-6 rounded-xl text-center shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="text-4xl mb-3">💻</div>
                  <h4 className="font-bold text-[var(--text-color)]">Frontend</h4>
                  <p className="text-sm text-[var(--text-color)] mt-2">React, JavaScript, HTML/CSS</p>
                </div>
                <div className="bg-[var(--background-color)] p-6 rounded-xl text-center shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="text-4xl mb-3">⚙️</div>
                  <h4 className="font-bold text-[var(--text-color)]">Backend</h4>
                  <p className="text-sm text-[var(--text-color)] mt-2">Node.js, Express, REST APIs</p>
                </div>
                <div className="bg-[var(--background-color)] p-6 rounded-xl text-center shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="text-4xl mb-3">🗄️</div>
                  <h4 className="font-bold text-[var(--text-color)]">Database</h4>
                  <p className="text-sm text-[var(--text-color)] mt-2">MongoDB, Mongoose</p>
                </div>
                <div className="bg-[var(--background-color)] p-6 rounded-xl text-center shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="text-4xl mb-3">🔧</div>
                  <h4 className="font-bold text-[var(--text-color)]">Tools</h4>
                  <p className="text-sm text-[var(--text-color)] mt-2">Git, VS Code, Vercel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default About;