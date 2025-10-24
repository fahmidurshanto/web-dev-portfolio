import React, { useState, useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { getExperiences } from '../utils/api';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await getExperiences();
        setExperiences(response.data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching experiences:', err);
        setError('Failed to fetch experiences. Please try again later.');
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="py-20 bg-[var(--background-color)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4 text-[var(--primary-color)] animate__animated animate__fadeInDown">
              Experience & Education
            </h2>
            <p className="text-xl text-[var(--text-color)] max-w-3xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
              Loading my professional journey...
            </p>
          </div>
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-color)]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="experience" className="py-20 bg-[var(--background-color)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4 text-[var(--primary-color)] animate__animated animate__fadeInDown">
              Experience & Education
            </h2>
          </div>
          <div className="text-center py-12 bg-[var(--secondary-color)] rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-[var(--text-color)] text-lg">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Function to determine icon based on type
  const getIcon = (type) => {
    return type === 'education' ? <FaGraduationCap /> : <FaBriefcase />;
  };

  return (
    <section id="experience" className="py-20 bg-[var(--background-color)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 text-[var(--primary-color)] animate__animated animate__fadeInDown">
            Experience & Education
          </h2>
          <p className="text-xl text-[var(--text-color)] max-w-3xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
            A timeline of my professional journey and educational background
          </p>
        </div>

        {experiences.length > 0 ? (
          <VerticalTimeline>
            {experiences.map((experience, index) => (
              <VerticalTimelineElement
                key={experience._id}
                className="vertical-timeline-element animate__animated"
                style={{ animationDelay: `${index * 0.2}s` }}
                contentStyle={{ 
                  background: 'var(--secondary-color)', 
                  color: 'var(--text-color)',
                  borderRadius: '1rem',
                  boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }}
                contentArrowStyle={{ borderRight: '7px solid var(--primary-color)' }}
                date={experience.date}
                dateClassName="text-[var(--text-color)]"
                iconStyle={{ 
                  background: 'linear-gradient(135deg, var(--primary-color) 0%, #8a2be2 100%)', 
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 0 4px var(--background-color), inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)'
                }}
                icon={getIcon(experience.type)}
              >
                <div>
                  <h3 className="vertical-timeline-element-title text-2xl font-bold text-[var(--text-color)] mb-2">
                    {experience.title}
                  </h3>
                  <h4 className="vertical-timeline-element-subtitle text-lg font-semibold text-[var(--primary-color)] mb-3">
                    {experience.company}
                  </h4>
                  <p className="vertical-timeline-element-location text-[var(--text-color)] mb-4 italic">
                    {experience.location}
                  </p>
                  <p className="mb-4 text-[var(--text-color)]">
                    {experience.description}
                  </p>
                  {experience.skills && experience.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {experience.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex} 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        ) : (
          <div className="text-center py-12 bg-[var(--secondary-color)] rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-[var(--text-color)] mb-4">No Experience Data Available</h3>
            <p className="text-[var(--text-color)]">
              I'm currently building my professional experience. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;