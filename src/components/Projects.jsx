import React, { useState, useEffect } from 'react';
import localforage from 'localforage';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const storedProjects = await localforage.getItem('projects');
      if (storedProjects) {
        setProjects(storedProjects);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-[var(--primary-color)] animate__animated animate__fadeInDown">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div key={index} className="bg-[var(--secondary-color)] rounded-lg shadow-2xl p-8 transform transition duration-500 hover:scale-105 hover:bg-[var(--primary-color)] animate__animated animate__fadeInUp animate__delay-1s">
                {project.thumbnail && (
                  <img src={project.thumbnail} alt={project.title} className="w-full h-48 object-cover rounded-md mb-4" />
                )}
                <h3 className="text-2xl font-bold mb-3 text-[var(--text-color)]">{project.title}</h3>
                <p className="text-[var(--text-color)] mb-4 leading-relaxed">{project.description}</p>
                <div className="flex justify-between mt-6">
                  {project.liveLink && <a href={project.liveLink} className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded-full transition duration-300" target="_blank" rel="noopener noreferrer">Live Demo</a>}
                  {project.githubLink && <a href={project.githubLink} className="bg-black hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded-full transition duration-300" target="_blank" rel="noopener noreferrer">GitHub</a>}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-[var(--text-color)] text-lg">No projects added yet. Go to <a href="/manage-projects" className="text-[var(--primary-color)] hover:underline font-semibold">Project Management</a> to add some!</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
