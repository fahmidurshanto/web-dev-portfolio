import React, { useState, useEffect } from 'react';
import localforage from 'localforage';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    liveLink: '',
    githubLink: '',
  });
  const [editingProject, setEditingProject] = useState(null); // State to hold the project being edited

  useEffect(() => {
    const fetchProjects = async () => {
      const storedProjects = await localforage.getItem('projects');
      if (storedProjects) {
        setProjects(storedProjects);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedProjects;
    if (editingProject) {
      // Update existing project
      updatedProjects = projects.map((project) =>
        project === editingProject ? newProject : project
      );
      setEditingProject(null); // Clear editing state
    } else {
      // Add new project
      updatedProjects = [...projects, newProject];
    }
    setProjects(updatedProjects);
    await localforage.setItem('projects', updatedProjects);
    setNewProject({
      title: '',
      description: '',
      liveLink: '',
      githubLink: '',
    });
  };

  const handleEdit = (project) => {
    setNewProject(project); // Populate form with project data
    setEditingProject(project); // Set project to be edited
  };

  const handleDelete = async (projectToDelete) => {
    const updatedProjects = projects.filter(
      (project) => project !== projectToDelete
    );
    setProjects(updatedProjects);
    await localforage.setItem('projects', updatedProjects);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Project Management</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input type="text" id="title" name="title" value={newProject.title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea id="description" name="description" value={newProject.description} onChange={handleChange} rows="3" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="liveLink" className="block text-gray-700 text-sm font-bold mb-2">Live Link</label>
          <input type="url" id="liveLink" name="liveLink" value={newProject.liveLink} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label htmlFor="githubLink" className="block text-gray-700 text-sm font-bold mb-2">GitHub Link</label>
          <input type="url" id="githubLink" name="githubLink" value={newProject.githubLink} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex items-center justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{editingProject ? 'Update Project' : 'Add Project'}</button>
        </div>
      </form>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-center mb-6">Current Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8">
              <h4 className="text-xl font-bold mb-2">{project.title}</h4>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <div className="flex justify-between">
                {project.liveLink && <a href={project.liveLink} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" target="_blank" rel="noopener noreferrer">Live Demo</a>}
                {project.githubLink && <a href={project.githubLink} className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded" target="_blank" rel="noopener noreferrer">GitHub</a>}
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button onClick={() => handleEdit(project)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                <button onClick={() => handleDelete(project)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;
