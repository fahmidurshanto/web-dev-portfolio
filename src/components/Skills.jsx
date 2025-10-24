import React, { useState, useEffect, useRef } from 'react';
import { getSkills } from '../utils/api';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const timelineRef = useRef(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await getSkills();
        setSkills(response.data || []);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };
    fetchSkills();
  }, []);

  // Group skills by category for the timeline
  const categorizedSkills = skills.reduce((acc, skill) => {
    (acc[skill.category] = acc[skill.category] || []).push(skill);
    return acc;
  }, {});

  // Convert categorized skills to timeline format
  const timelineItems = Object.entries(categorizedSkills).map(([category, skillsArr], index) => ({
    id: index,
    category: category,
    skills: skillsArr
  }));

  // Handle scroll for electric effect
  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const timelineTop = timelineRef.current.getBoundingClientRect().top;
        const timelineHeight = timelineRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress (0 to 1)
        const progress = Math.max(0, Math.min(1, (windowHeight - timelineTop) / (windowHeight + timelineHeight)));
        
        // Update visible items based on scroll progress
        const itemsToShow = Math.floor(progress * timelineItems.length);
        setVisibleItems(Array.from({ length: itemsToShow }, (_, i) => i));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [timelineItems.length]);

  return (
    <section id="skills" className="py-20 bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 animate__animated animate__fadeInDown">Skills</h2>
        
        {/* Timeline Version with Electric Effect */}
        <div 
          ref={timelineRef}
          className="mb-16 relative"
          style={{
            '--electric-color': 'var(--primary-color)',
            '--electric-glow': '0 0 10px var(--primary-color), 0 0 20px var(--primary-color)'
          }}
        >
          {/* Electric effect overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full"
              style={{
                background: 'linear-gradient(to bottom, var(--primary-color), transparent)',
                boxShadow: '0 0 10px var(--primary-color), 0 0 20px var(--primary-color)',
                opacity: 0.7,
                animation: 'pulse 2s infinite'
              }}
            />
          </div>
          
          <VerticalTimeline>
            {timelineItems.map((item, index) => (
              <VerticalTimelineElement
                key={item.id}
                className={`vertical-timeline-element--work ${
                  visibleItems.includes(index) ? 'animate__animated animate__fadeInUp' : ''
                }`}
                contentStyle={{ 
                  background: 'var(--secondary-color)', 
                  color: 'var(--text-color)',
                  borderRadius: '12px',
                  boxShadow: visibleItems.includes(index) 
                    ? '0 0 15px var(--primary-color), 0 10px 20px rgba(0,0,0,0.1)' 
                    : '0 10px 20px rgba(0,0,0,0.1)',
                  transition: 'box-shadow 0.5s ease-in-out',
                  border: visibleItems.includes(index) 
                    ? '1px solid var(--primary-color)' 
                    : '1px solid transparent'
                }}
                contentArrowStyle={{ 
                  borderRight: '7px solid var(--secondary-color)',
                  boxShadow: visibleItems.includes(index) 
                    ? '5px 0 10px var(--primary-color)' 
                    : 'none',
                  transition: 'box-shadow 0.5s ease-in-out'
                }}
                date={item.category}
                dateClassName={`text-lg font-bold ${
                  visibleItems.includes(index) 
                    ? 'text-[var(--primary-color)] animate__animated animate__pulse' 
                    : 'text-[var(--text-color)]'
                }`}
                iconStyle={{ 
                  background: visibleItems.includes(index) 
                    ? 'var(--primary-color)' 
                    : 'var(--secondary-color)',
                  color: visibleItems.includes(index) ? '#fff' : 'var(--text-color)',
                  border: visibleItems.includes(index) 
                    ? '2px solid var(--primary-color)' 
                    : '2px solid var(--text-color)',
                  boxShadow: visibleItems.includes(index) 
                    ? '0 0 10px var(--primary-color), 0 0 20px var(--primary-color)' 
                    : 'none',
                  transition: 'all 0.5s ease-in-out'
                }}
                icon={
                  <div className="flex items-center justify-center w-full h-full text-white text-xl font-bold">
                    {item.category.charAt(0)}
                  </div>
                }
              >
                <h3 className={`vertical-timeline-element-title text-2xl font-bold mb-4 ${
                  visibleItems.includes(index) 
                    ? 'text-[var(--primary-color)]' 
                    : 'text-[var(--text-color)]'
                }`}>
                  {item.category}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                  {item.skills.map((skill) => (
                    <div 
                      key={skill._id} 
                      className={`rounded-lg p-3 text-center flex flex-col items-center justify-center transition-all duration-300 ${
                        visibleItems.includes(index) 
                          ? 'bg-[var(--background-color)] bg-opacity-50 hover:scale-105 hover:shadow-lg' 
                          : 'bg-[var(--background-color)] bg-opacity-30'
                      }`}
                      style={{
                        boxShadow: visibleItems.includes(index) 
                          ? '0 0 5px var(--primary-color)' 
                          : 'none',
                        border: visibleItems.includes(index) 
                          ? '1px solid var(--primary-color)' 
                          : '1px solid transparent'
                      }}
                    >
                      {skill.icon && (
                        <img 
                          src={skill.icon} 
                          alt={skill.name} 
                          className={`w-12 h-12 object-contain mb-2 mx-auto ${
                            visibleItems.includes(index) 
                              ? 'animate__animated animate__fadeIn' 
                              : ''
                          }`} 
                        />
                      )}
                      <h4 className={`text-sm font-semibold ${
                        visibleItems.includes(index) 
                          ? 'text-[var(--text-color)]' 
                          : 'text-[var(--text-color)] opacity-70'
                      }`}>{skill.name}</h4>
                    </div>
                  ))}
                </div>
              </VerticalTimelineElement>
            ))}
            <VerticalTimelineElement
              iconStyle={{ 
                background: visibleItems.length === timelineItems.length 
                  ? 'var(--primary-color)' 
                  : 'var(--secondary-color)',
                color: visibleItems.length === timelineItems.length ? '#fff' : 'var(--text-color)',
                border: '2px solid var(--primary-color)',
                boxShadow: visibleItems.length === timelineItems.length 
                  ? '0 0 10px var(--primary-color), 0 0 20px var(--primary-color)' 
                  : 'none',
                transition: 'all 0.5s ease-in-out'
              }}
              icon={
                <div className="flex items-center justify-center w-full h-full text-white text-xl">
                  ✓
                </div>
              }
            />
          </VerticalTimeline>
        </div>
      </div>
      
      {/* Add animation styles */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 0.5;
            box-shadow: 0 0 5px var(--electric-color);
          }
          50% {
            opacity: 1;
            box-shadow: var(--electric-glow);
          }
          100% {
            opacity: 0.5;
            box-shadow: 0 0 5px var(--electric-color);
          }
        }
        
        .vertical-timeline-element-content {
          transition: box-shadow 0.5s ease-in-out, border 0.5s ease-in-out;
        }
        
        .vertical-timeline-element-date {
          transition: color 0.5s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Skills;