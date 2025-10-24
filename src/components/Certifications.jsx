import React, { useState, useEffect, useRef } from 'react';
import { getCertifications } from '../utils/api';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const timelineRef = useRef(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await getCertifications();
        setCertifications(response.data || []);
      } catch (error) {
        console.error('Error fetching certifications:', error);
      }
    };
    fetchCertifications();
  }, []);

  // Handle scroll for fire effect
  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const timelineTop = timelineRef.current.getBoundingClientRect().top;
        const timelineHeight = timelineRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress (0 to 1)
        const progress = Math.max(0, Math.min(1, (windowHeight - timelineTop) / (windowHeight + timelineHeight)));
        
        // Update visible items based on scroll progress
        const itemsToShow = Math.floor(progress * certifications.length);
        setVisibleItems(Array.from({ length: itemsToShow }, (_, i) => i));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [certifications.length]);

  return (
    <section id="certifications" className="py-20 bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-[var(--primary-color)] animate__animated animate__fadeInDown">Certifications</h2>
        
        {/* Timeline Version with Fire Effect */}
        <div 
          ref={timelineRef}
          className="mb-16 relative"
        >
          {/* Fire effect overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full"
              style={{
                background: 'linear-gradient(to bottom, #ff4500, #ffa500, transparent)',
                boxShadow: '0 0 10px #ff4500, 0 0 20px #ffa500',
                opacity: 0.7,
                animation: 'firePulse 1.5s infinite'
              }}
            />
          </div>
          
          <VerticalTimeline>
            {certifications.map((cert, index) => (
              <VerticalTimelineElement
                key={cert._id}
                className={`vertical-timeline-element--work ${
                  visibleItems.includes(index) ? 'animate__animated animate__fadeInUp' : ''
                }`}
                contentStyle={{ 
                  background: 'var(--secondary-color)', 
                  color: 'var(--text-color)',
                  borderRadius: '12px',
                  boxShadow: visibleItems.includes(index) 
                    ? '0 0 15px #ff4500, 0 10px 20px rgba(0,0,0,0.1)' 
                    : '0 10px 20px rgba(0,0,0,0.1)',
                  transition: 'box-shadow 0.5s ease-in-out',
                  border: visibleItems.includes(index) 
                    ? '1px solid #ff4500' 
                    : '1px solid transparent'
                }}
                contentArrowStyle={{ 
                  borderRight: '7px solid var(--secondary-color)',
                  boxShadow: visibleItems.includes(index) 
                    ? '5px 0 10px #ff4500' 
                    : 'none',
                  transition: 'box-shadow 0.5s ease-in-out'
                }}
                date={`Issued: ${new Date(cert.issueDate).toLocaleDateString()}`}
                dateClassName={`text-lg font-bold ${
                  visibleItems.includes(index) 
                    ? 'text-[#ff4500] animate__animated animate__pulse' 
                    : 'text-[var(--text-color)]'
                }`}
                iconStyle={{ 
                  background: visibleItems.includes(index) 
                    ? '#ff4500' 
                    : 'var(--secondary-color)',
                  color: visibleItems.includes(index) ? '#fff' : 'var(--text-color)',
                  border: visibleItems.includes(index) 
                    ? '2px solid #ff4500' 
                    : '2px solid var(--text-color)',
                  boxShadow: visibleItems.includes(index) 
                    ? '0 0 10px #ff4500, 0 0 20px #ffa500' 
                    : 'none',
                  transition: 'all 0.5s ease-in-out'
                }}
                icon={
                  <div className="flex items-center justify-center w-full h-full text-white text-xl font-bold">
                    🏆
                  </div>
                }
              >
                <h3 className={`vertical-timeline-element-title text-2xl font-bold mb-4 ${
                  visibleItems.includes(index) 
                    ? 'text-[#ff4500]' 
                    : 'text-[var(--text-color)]'
                }`}>
                  {cert.name}
                </h3>
                <p className={`mb-2 ${
                  visibleItems.includes(index) 
                    ? 'text-[var(--text-color)]' 
                    : 'text-[var(--text-color)] opacity-80'
                }`}>
                  <strong>Issuer:</strong> {cert.issuingOrganization}
                </p>
                {cert.expirationDate && (
                  <p className={`mb-2 ${
                    visibleItems.includes(index) 
                      ? 'text-[var(--text-color)]' 
                      : 'text-[var(--text-color)] opacity-80'
                  }`}>
                    <strong>Expiration Date:</strong> {new Date(cert.expirationDate).toLocaleDateString()}
                  </p>
                )}
                {cert.credentialId && (
                  <p className={`mb-4 ${
                    visibleItems.includes(index) 
                      ? 'text-[var(--text-color)]' 
                      : 'text-[var(--text-color)] opacity-80'
                  }`}>
                    <strong>Credential ID:</strong> {cert.credentialId}
                  </p>
                )}
                {cert.credentialUrl && (
                  <a 
                    href={cert.credentialUrl} 
                    className={`inline-block bg-[#ff4500] hover:bg-[#ffa500] text-white font-bold py-2 px-4 rounded-full mt-2 transition duration-300 ${
                      visibleItems.includes(index) 
                        ? 'animate__animated animate__fadeIn' 
                        : ''
                    }`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      boxShadow: visibleItems.includes(index) 
                        ? '0 0 10px #ff4500' 
                        : 'none'
                    }}
                  >
                    View Certificate
                  </a>
                )}
              </VerticalTimelineElement>
            ))}
            <VerticalTimelineElement
              iconStyle={{ 
                background: visibleItems.length === certifications.length 
                  ? '#ff4500' 
                  : 'var(--secondary-color)',
                color: visibleItems.length === certifications.length ? '#fff' : 'var(--text-color)',
                border: '2px solid #ff4500',
                boxShadow: visibleItems.length === certifications.length 
                  ? '0 0 10px #ff4500, 0 0 20px #ffa500' 
                  : 'none',
                transition: 'all 0.5s ease-in-out'
              }}
              icon={
                <div className="flex items-center justify-center w-full h-full text-white text-xl">
                  🔥
                </div>
              }
            />
          </VerticalTimeline>
        </div>
      </div>
      
      {/* Add fire animation styles */}
      <style jsx>{`
        @keyframes firePulse {
          0% {
            opacity: 0.5;
            box-shadow: 0 0 5px #ff4500;
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 10px #ff4500, 0 0 20px #ffa500, 0 0 30px #ff4500;
          }
          100% {
            opacity: 0.5;
            box-shadow: 0 0 5px #ff4500;
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

export default Certifications;