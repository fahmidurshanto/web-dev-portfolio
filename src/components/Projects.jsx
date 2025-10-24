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
            className="bg-[var(--primary-color)] text-white text-xs font-semibold px-2 py-1 rounded-full"
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
                    <div className="bg-[var(--secondary-color)] rounded-xl shadow-lg p-5 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl border border-[var(--primary-color)] border-opacity-20 h-full">
                      {project.imageUrl && (
                        <img src={project.imageUrl} alt={project.title} className="w-full h-36 object-cover rounded-md mb-3" />
                      )}
                      <h3 className="text-xl font-bold mb-2 text-[var(--text-color)]">{project.title}</h3>
                      <p className="text-[var(--text-color)] text-sm mb-3 leading-relaxed line-clamp-3">{project.description}</p>
                      
                      {/* Technologies section */}
                      {renderTechnologies(project.technologies)}
                      
                      <div className="flex justify-between mt-4 space-x-2">
                        {project.projectUrl && (
                          <a 
                            href={project.projectUrl} 
                            className="flex-1 text-center bg-[var(--primary-color)] hover:bg-opacity-90 text-white text-sm font-bold py-2 px-3 rounded-full transition duration-300 truncate"
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl} 
                            className="flex-1 text-center bg-black hover:bg-opacity-90 text-white text-sm font-bold py-2 px-3 rounded-full transition duration-300 truncate"
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