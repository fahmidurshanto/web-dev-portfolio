import React, { useState, useEffect } from 'react';
import { getProjects } from '../utils/api';
import Slider from 'react-slick';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  // Function to render technology tags
  const renderTechnologies = (technologies) => {
    if (!technologies || !Array.isArray(technologies) || technologies.length === 0) return null;
    
    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {technologies.map((tech, index) => (
          <span 
            key={index} 
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    );
  };

  return (
    <section id="projects" className="py-16 bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-[var(--primary-color)] animate__animated animate__fadeInDown">Projects</h2>
        {
          projects.length > 0 ? (
            <div className="px-4">
              <Slider {...settings}>
                {projects.map((project) => (
                  <div key={project._id} className="p-2">
                    <div className="bg-[var(--secondary-color)] rounded-xl shadow-lg p-5 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl border border-[var(--primary-color)] border-opacity-20 h-full relative overflow-hidden">
                      {/* Ice effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-20 pointer-events-none"></div>
                      <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-200 rounded-full filter blur-3xl opacity-30 pointer-events-none animate-pulse"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-200 rounded-full filter blur-3xl opacity-20 pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>
                      
                      {project.imageUrl && (
                        <img src={project.imageUrl} alt={project.title} className="w-full h-36 object-cover rounded-md mb-3 relative z-10" />
                      )}
                      <h3 className="text-xl font-bold mb-2 text-[var(--text-color)] relative z-10">{project.title}</h3>
                      <p className="text-[var(--text-color)] text-sm mb-3 leading-relaxed line-clamp-3 relative z-10">{project.description}</p>
                      
                      {/* Technologies section */}
                      {renderTechnologies(project.technologies)}
                      
                      <div className="flex justify-between mt-4 space-x-2 relative z-10">
                        {project.projectUrl && (
                          <a 
                            href={project.projectUrl} 
                            className="flex-1 text-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-sm font-bold py-2 px-3 rounded-full transition duration-300 truncate shadow-lg"
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl} 
                            className="flex-1 text-center bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white text-sm font-bold py-2 px-3 rounded-full transition duration-300 truncate shadow-lg"
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <p className="text-center col-span-full text-[var(--text-color)] text-lg">No projects added yet. Go to <a href="/manage-projects" className="text-[var(--primary-color)] hover:underline font-semibold">Project Management</a> to add some!</p>
          )
        }
      </div>
    </section>
  );
};

export default Projects;