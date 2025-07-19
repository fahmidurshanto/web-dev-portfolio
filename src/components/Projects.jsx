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
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  return (
    <section id="projects" className="py-20 bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-[var(--primary-color)] animate__animated animate__fadeInDown">Projects</h2>
        {
          projects.length > 0 ? (
            <Slider {...settings}>
              {projects.map((project) => (
                <div key={project._id} className="p-4">
                  <div className="bg-[var(--secondary-color)] rounded-lg shadow-2xl p-8 transform transition duration-500 hover:scale-105 hover:bg-[var(--primary-color)] animate__animated animate__fadeInUp animate__delay-1s">
                    {project.imageUrl && (
                      <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover rounded-md mb-4" />
                    )}
                    <h3 className="text-2xl font-bold mb-3 text-[var(--text-color)]">{project.title}</h3>
                    <p className="text-[var(--text-color)] mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex justify-between mt-6">
                      {project.projectUrl && <a href={project.projectUrl} className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded-full transition duration-300" target="_blank" rel="noopener noreferrer">Live Demo</a>}
                      {project.githubUrl && <a href={project.githubUrl} className="bg-black hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded-full transition duration-300" target="_blank" rel="noopener noreferrer">GitHub</a>}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-center col-span-full text-[var(--text-color)] text-lg">No projects added yet. Go to <a href="/manage-projects" className="text-[var(--primary-color)] hover:underline font-semibold">Project Management</a> to add some!</p>
          )
        }
      </div>
    </section>
  );
};

export default Projects;