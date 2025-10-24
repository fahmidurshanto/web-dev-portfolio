import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getExperiences, createExperience, updateExperience, deleteExperience } from '../utils/api';

const ExperienceManagement = () => {
  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    date: '',
    type: 'work',
    skills: ''
  });
  const [editingExperience, setEditingExperience] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await getExperiences();
      setExperiences(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to fetch experiences. Please try again.',
      });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewExperience({ ...newExperience, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const experienceData = {
        ...newExperience,
        skills: newExperience.skills ? newExperience.skills.split(',').map(skill => skill.trim()) : []
      };

      if (editingExperience) {
        await updateExperience(editingExperience._id, experienceData);
        Swal.fire({
          icon: 'success',
          title: 'Experience Updated!',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        await createExperience(experienceData);
        Swal.fire({
          icon: 'success',
          title: 'Experience Added!',
          showConfirmButton: false,
          timer: 1500
        });
      }
      fetchExperiences();
      resetForm();
    } catch (error) {
      console.error('Error saving experience:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to save experience. Please try again.',
      });
    }
  };

  const handleEdit = (experience) => {
    setNewExperience({
      title: experience.title,
      company: experience.company,
      location: experience.location,
      description: experience.description,
      date: experience.date,
      type: experience.type,
      skills: experience.skills ? experience.skills.join(', ') : ''
    });
    setEditingExperience(experience);
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
          await deleteExperience(id);
          fetchExperiences();
          Swal.fire(
            'Deleted!',
            'Your experience has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting experience:', error);
          Swal.fire(
            'Error!',
            'Failed to delete experience. Please try again.',
            'error'
          );
        }
      }
    });
  };

  const resetForm = () => {
    setNewExperience({
      title: '',
      company: '',
      location: '',
      description: '',
      date: '',
      type: 'work',
      skills: ''
    });
    setEditingExperience(null);
  };

  if (loading) {
    return <div className="text-center py-12 text-[var(--text-color)]">Loading experiences...</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-6 text-[var(--text-color)] animate__animated animate__fadeInDown">
          Experience Management
        </h1>
        <p className="text-xl text-[var(--text-color)] max-w-3xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
          Add, edit, and manage your professional experience and education
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-[var(--secondary-color)] p-8 rounded-2xl shadow-2xl backdrop-blur-sm bg-opacity-90 border border-[var(--primary-color)] border-opacity-20 mb-16 animate__animated animate__fadeInUp animate__delay-2s">
          <h2 className="text-2xl font-bold mb-6 text-[var(--text-color)] border-l-4 border-[var(--primary-color)] pl-4">
            {editingExperience ? 'Edit Experience' : 'Add New Experience'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label htmlFor="title" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                value={newExperience.title} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                placeholder="e.g., Senior Developer, B.S. Computer Science"
                required 
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="company" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Company/School</label>
              <input 
                type="text" 
                id="company" 
                name="company" 
                value={newExperience.company} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                placeholder="e.g., Tech Company Inc., University Name"
                required 
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="location" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Location</label>
              <input 
                type="text" 
                id="location" 
                name="location" 
                value={newExperience.location} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                placeholder="e.g., San Francisco, CA"
                required 
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="type" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Type</label>
              <select 
                id="type" 
                name="type" 
                value={newExperience.type} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300"
                required
              >
                <option value="work">Work Experience</option>
                <option value="education">Education</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="date" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Date</label>
              <input 
                type="text" 
                id="date" 
                name="date" 
                value={newExperience.date} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                placeholder="e.g., 2020 - Present, 2016 - 2020"
                required 
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="skills" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Skills (comma separated)</label>
              <input 
                type="text" 
                id="skills" 
                name="skills" 
                value={newExperience.skills} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                placeholder="e.g., React, Node.js, MongoDB"
              />
            </div>
            
            <div className="mb-6 md:col-span-2">
              <label htmlFor="description" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Description</label>
              <textarea 
                id="description" 
                name="description" 
                value={newExperience.description} 
                onChange={handleChange} 
                rows="4" 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300 resize-none" 
                placeholder="Describe your role, responsibilities, achievements, or educational experience..."
                required
              ></textarea>
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-8">
            <button 
              type="submit" 
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {editingExperience ? 'Update Experience' : 'Add Experience'}
            </button>
            
            {editingExperience && (
              <button 
                type="button" 
                onClick={resetForm}
                className="ml-4 bg-[var(--secondary-color)] border-2 border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-[var(--text-color)] text-center animate__animated animate__fadeInDown">Current Experiences</h2>
          
          {experiences.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {experiences.map((experience, index) => (
                <div 
                  key={experience._id} 
                  className="bg-[var(--secondary-color)] rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-[1.02] border border-[var(--primary-color)] border-opacity-20 backdrop-blur-sm bg-opacity-80 animate__animated animate__fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--text-color)]">{experience.title}</h3>
                      <p className="text-[var(--text-color)] text-lg mt-1">{experience.company}</p>
                      <p className="text-[var(--text-color)] italic">{experience.location} • {experience.date}</p>
                      <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {experience.type === 'education' ? 'Education' : 'Work Experience'}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(experience)} 
                        className="p-2 rounded-full bg-[var(--background-color)] hover:bg-[var(--primary-color)] text-[var(--text-color)] hover:text-white transition duration-300"
                        aria-label="Edit experience"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(experience._id)} 
                        className="p-2 rounded-full bg-[var(--background-color)] hover:bg-red-500 text-[var(--text-color)] hover:text-white transition duration-300"
                        aria-label="Delete experience"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-[var(--text-color)]">
                      {experience.description}
                    </p>
                    {experience.skills && experience.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {experience.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex} 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-[var(--secondary-color)] rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[var(--primary-color)] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="text-2xl font-bold text-[var(--text-color)] mb-2">No Experiences Added Yet</h3>
                <p className="text-[var(--text-color)] mb-6">Add your first experience using the form above</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceManagement;