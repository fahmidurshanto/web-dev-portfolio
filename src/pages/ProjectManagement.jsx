import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getProjects, createProject, updateProject, deleteProject } from '../utils/api';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    projectUrl: '', // Changed from liveLink
    githubUrl: '',  // Changed from githubLink
    imageUrl: '',   // Changed from thumbnail
  });
  const [editingProject, setEditingProject] = useState(null); // State to hold the project being edited

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
      });
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
    }); // Populate form with project data
    setEditingProject(project); // Set project to be edited
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
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-[var(--text-color)]">Project Management</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-[var(--secondary-color)] p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="title" className="block text-[var(--text-color)] text-sm font-bold mb-2">Title</label>
          <input type="text" id="title" name="title" value={newProject.title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-[var(--text-color)] text-sm font-bold mb-2">Description</label>
          <textarea id="description" name="description" value={newProject.description} onChange={handleChange} rows="3" className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" required></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="projectUrl" className="block text-[var(--text-color)] text-sm font-bold mb-2">Live Link</label>
          <input type="url" id="projectUrl" name="projectUrl" value={newProject.projectUrl} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="githubUrl" className="block text-[var(--text-color)] text-sm font-bold mb-2">GitHub Link</label>
          <input type="url" id="githubUrl" name="githubUrl" value={newProject.githubUrl} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label htmlFor="imageUrl" className="block text-[var(--text-color)] text-sm font-bold mb-2">Project Image URL</label>
          <input type="text" id="imageUrl" name="imageUrl" value={newProject.imageUrl} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" />
          {newProject.imageUrl && (
            <img src={newProject.imageUrl} alt="Image Preview" className="mt-2 w-24 h-24 object-cover rounded" />
          )}
        </div>
        <div className="flex items-center justify-center">
          <button type="submit" className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{editingProject ? 'Update Project' : 'Add Project'}</button>
        </div>
      </form>

      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6 text-[var(--text-color)]">Current Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project._id} className="bg-[var(--secondary-color)] rounded-lg shadow-lg p-8">
              <h4 className="text-xl font-bold mb-2 text-[var(--text-color)]">{project.title}</h4>
              <p className="text-[var(--text-color)] mb-4">{project.description}</p>
              {project.imageUrl && <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover rounded mb-4" />}
              <div className="flex justify-between">
                {project.projectUrl && <a href={project.projectUrl} className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded" target="_blank" rel="noopener noreferrer">Live Demo</a>}
                {project.githubUrl && <a href={project.githubUrl} className="bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded" target="_blank" rel="noopener noreferrer">GitHub</a>}
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button onClick={() => handleEdit(project)} className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded">Edit</button>
                <button onClick={() => handleDelete(project._id)} className="bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)] text-white font-bold py-2 px-4 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;
