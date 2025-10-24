import React, { useState, useEffect } from 'react';
import { FaCode, FaLaptopCode, FaMobileAlt, FaServer, FaDatabase, FaCloud } from 'react-icons/fa';
import { getServices } from '../utils/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        setServices(response.data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to fetch services. Please try again later.');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Function to get the appropriate icon for each service
  const getServiceIcon = (category) => {
    switch (category) {
      case 'frontend':
        return <FaCode className="text-3xl" />;
      case 'backend':
        return <FaServer className="text-3xl" />;
      case 'database':
        return <FaDatabase className="text-3xl" />;
      case 'fullstack':
        return <FaLaptopCode className="text-3xl" />;
      case 'mobile':
        return <FaMobileAlt className="text-3xl" />;
      case 'devops':
        return <FaCloud className="text-3xl" />;
      default:
        return <FaCode className="text-3xl" />;
    }
  };

  if (loading) {
    return (
      <section id="services" className="py-20 bg-[var(--background-color)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4 text-[var(--primary-color)] animate__animated animate__fadeInDown">
              Services I Offer
            </h2>
            <p className="text-xl text-[var(--text-color)] max-w-3xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
              Loading my services...
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
      <section id="services" className="py-20 bg-[var(--background-color)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4 text-[var(--primary-color)] animate__animated animate__fadeInDown">
              Services I Offer
            </h2>
          </div>
          <div className="text-center py-12 bg-[var(--secondary-color)] rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-[var(--text-color)] text-lg">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-[var(--background-color)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 text-[var(--primary-color)] animate__animated animate__fadeInDown">
            Services I Offer
          </h2>
          <p className="text-xl text-[var(--text-color)] max-w-3xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
            I help businesses bring their ideas to life with modern web technologies and best practices
          </p>
        </div>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={service._id}
                className="bg-[var(--secondary-color)] rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:scale-105 border border-[var(--primary-color)] border-opacity-20 backdrop-blur-sm bg-opacity-80 animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full text-white">
                    {getServiceIcon(service.category)}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-center mb-4 text-[var(--text-color)]">
                  {service.title}
                </h3>
                
                <p className="text-[var(--text-color)] mb-6 text-center">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap justify-center gap-2">
                  {service.technologies && service.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="bg-[var(--background-color)] text-[var(--text-color)] text-xs font-semibold px-3 py-1 rounded-full border border-[var(--primary-color)] border-opacity-30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[var(--secondary-color)] rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-[var(--text-color)] mb-4">No Services Available</h3>
            <p className="text-[var(--text-color)]">
              I'm currently updating my service offerings. Please check back soon!
            </p>
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 shadow-2xl animate__animated animate__fadeInUp animate__delay-2s">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-white">Ready to start your project?</h3>
            <p className="text-white mb-6 max-w-2xl mx-auto">
              Whether you need a simple website, a complex web application, or anything in between, 
              I can help bring your vision to life with clean code and modern technologies.
            </p>
            <a 
              href="#contact" 
              className="inline-block bg-white text-[var(--primary-color)] font-bold py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;