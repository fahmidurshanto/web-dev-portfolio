import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getProjects, createProject, updateProject, deleteProject } from '../utils/api';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    projectUrl: '',
    githubUrl: '',
    imageUrl: '',
    technologies: [], // Added technologies field
  });
  const [editingProject, setEditingProject] = useState(null);
  const [techInput, setTechInput] = useState(''); // For adding technologies

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to fetch projects. Please try again.',
      });
    }
  };

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleTechInputChange = (e) => {
    setTechInput(e.target.value);
  };

  const addTechnology = () => {
    if (techInput.trim() !== '') {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, techInput.trim()]
      });
      setTechInput('');
    }
  };

  const removeTechnology = (index) => {
    const updatedTechs = [...newProject.technologies];
    updatedTechs.splice(index, 1);
    setNewProject({ ...newProject, technologies: updatedTechs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await updateProject(editingProject._id, newProject);
        Swal.fire({
          icon: 'success',
          title: 'Project Updated!',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        await createProject(newProject);
        Swal.fire({
          icon: 'success',
          title: 'Project Added!',
          showConfirmButton: false,
          timer: 1500
        });
      }
      fetchProjects(); // Refresh the list
      setEditingProject(null); // Clear editing state
      setNewProject({
        title: '',
        description: '',
        projectUrl: '',
        githubUrl: '',
        imageUrl: '',
        technologies: [],
      });
      setTechInput('');
    } catch (error) {
      console.error('Error saving project:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to save project. Please try again.',
      });
    }
  };

  const handleEdit = (project) => {
    setNewProject({
      title: project.title,
      description: project.description,
      projectUrl: project.projectUrl,
      githubUrl: project.githubUrl,
      imageUrl: project.imageUrl,
      technologies: project.technologies || [],
    });
    setEditingProject(project);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProject(id);
          fetchProjects(); // Refresh the list
          Swal.fire(
            'Deleted!',
            'Your project has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting project:', error);
          Swal.fire(
            'Error!',
            'Failed to delete project. Please try again.',
            'error'
          );
        }
      }
    });
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-6 text-[var(--text-color)] animate__animated animate__fadeInDown">
          Project Management
        </h1>
        <p className="text-xl text-[var(--text-color)] max-w-3xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
          Add, edit, and manage your portfolio projects
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-[var(--secondary-color)] p-8 rounded-2xl shadow-2xl backdrop-blur-sm bg-opacity-90 border border-[var(--primary-color)] border-opacity-20 mb-16 animate__animated animate__fadeInUp animate__delay-2s">
          <h2 className="text-2xl font-bold mb-6 text-[var(--text-color)] border-l-4 border-[var(--primary-color)] pl-4">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4 md:col-span-2">
              <label htmlFor="title" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Project Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                value={newProject.title} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                placeholder="e.g., E-commerce Website"
                required 
              />
            </div>
            
            <div className="mb-4 md:col-span-2">
              <label htmlFor="description" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Description</label>
              <textarea 
                id="description" 
                name="description" 
                value={newProject.description} 
                onChange={handleChange} 
                rows="4" 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300 resize-none" 
                placeholder="Describe your project, its features, and technologies used..."
                required
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label htmlFor="projectUrl" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Live Demo URL</label>
              <input 
                type="url" 
                id="projectUrl" 
                name="projectUrl" 
                value={newProject.projectUrl} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                placeholder="https://example.com"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="githubUrl" className="block text-[var(--text-color)] text-lg font-semibold mb-2">GitHub Repository</label>
              <input 
                type="url" 
                id="githubUrl" 
                name="githubUrl" 
                value={newProject.githubUrl} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                placeholder="https://github.com/username/repo"
              />
            </div>
            
            <div className="mb-4 md:col-span-2">
              <label htmlFor="imageUrl" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Project Image URL</label>
              <input 
                type="url" 
                id="imageUrl" 
                name="imageUrl" 
                value={newProject.imageUrl} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                placeholder="https://example.com/image.jpg"
              />
              {newProject.imageUrl && (
                <img src={newProject.imageUrl} alt="Image Preview" className="mt-4 w-32 h-32 object-cover rounded-lg border-2 border-[var(--primary-color)]" />
              )}
            </div>
            
            <div className="mb-6 md:col-span-2">
              <label className="block text-[var(--text-color)] text-lg font-semibold mb-2">Technologies Used</label>
              <div className="flex">
                <input 
                  type="text" 
                  value={techInput} 
                  onChange={handleTechInputChange} 
                  className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-l-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                  placeholder="Add a technology (e.g., React, Node.js)"
                />
                <button 
                  type="button" 
                  onClick={addTechnology}
                  className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-3 px-6 rounded-r-lg focus:outline-none transition duration-300"
                >
                  Add
                </button>
              </div>
              
              {newProject.technologies.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {newProject.technologies.map((tech, index) => (
                    <div key={index} className="bg-[var(--primary-color)] text-white px-3 py-1 rounded-full flex items-center">
                      <span>{tech}</span>
                      <button 
                        type="button" 
                        onClick={() => removeTechnology(index)}
                        className="ml-2 text-white hover:text-gray-200 focus:outline-none"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-8">
            <button 
              type="submit" 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {editingProject ? 'Update Project' : 'Add Project'}
            </button>
            
            {editingProject && (
              <button 
                type="button" 
                onClick={() => {
                  setEditingProject(null);
                  setNewProject({
                    title: '',
                    description: '',
                    projectUrl: '',
                    githubUrl: '',
                    imageUrl: '',
                    technologies: [],
                  });
                  setTechInput('');
                }}
                className="ml-4 bg-[var(--secondary-color)] border-2 border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-[var(--text-color)] text-center animate__animated animate__fadeInDown">Current Projects</h2>
          
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div 
                  key={project._id} 
                  className="bg-[var(--secondary-color)] rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-[1.02] border border-[var(--primary-color)] border-opacity-20 backdrop-blur-sm bg-opacity-80 animate__animated animate__fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-[var(--text-color)]">{project.title}</h3>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(project)} 
                        className="p-2 rounded-full bg-[var(--background-color)] hover:bg-[var(--primary-color)] text-[var(--text-color)] hover:text-white transition duration-300"
                        aria-label="Edit project"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(project._id)} 
                        className="p-2 rounded-full bg-[var(--background-color)] hover:bg-red-500 text-[var(--text-color)] hover:text-white transition duration-300"
                        aria-label="Delete project"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-[var(--text-color)] mb-4">{project.description}</p>
                  
                  {project.imageUrl && (
                    <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover rounded-lg mb-4 border border-[var(--primary-color)] border-opacity-20" />
                  )}
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-4">
                    {project.projectUrl && (
                      <a 
                        href={project.projectUrl} 
                        className="flex items-center bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 shadow-md"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Live Demo
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </a>
                    )}
                    
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        className="flex items-center bg-[var(--background-color)] border-2 border-[var(--primary-color)] text-[var(--text-color)] hover:bg-[var(--primary-color)] hover:text-white font-bold py-2 px-4 rounded-full transition duration-300"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-[var(--secondary-color)] rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[var(--primary-color)] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-2xl font-bold text-[var(--text-color)] mb-2">No Projects Yet</h3>
                <p className="text-[var(--text-color)] mb-6">Add your first project using the form above</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;