import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../utils/api';

const SkillsManagement = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: '',
    icon: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleChange = (e) => {
    setNewSkill({ ...newSkill, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let iconUrl = newSkill.icon;

    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
        const imgbbResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=ebc8e8779676d69b4a0f03efe9e939c2`,
          {
            method: 'POST',
            body: formData,
          }
        );
        const imgbbData = await imgbbResponse.json();
        if (imgbbData.success) {
          iconUrl = imgbbData.data.url;
        } else {
          throw new Error('Image upload failed');
        }
      } catch (error) {
        console.error('Error uploading image to imgbb:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to upload image. Please try again.',
        });
        return;
      }
    }

    try {
      const skillData = { ...newSkill, icon: iconUrl };
      console.log('Submitting skill data:', skillData);
      if (editingSkill) {
        await updateSkill(editingSkill._id, skillData);
        Swal.fire({
          icon: 'success',
          title: 'Skill Updated!',
          text: 'Your skill has been successfully updated.',
          showConfirmButton: false,
          timer: 1500
        });
        console.log("Skill successfully sent to the database");
      } else {
        await createSkill(skillData);
        Swal.fire({
          icon: 'success',
          title: 'Skill Added!',
          text: 'Your new skill has been successfully added to the database.',
          showConfirmButton: false,
          timer: 1500
        });
        console.log("Skill successfully sent to the database");
      }
      fetchSkills(); // Refresh the list
      setEditingSkill(null);
      setNewSkill({
        name: '',
        category: '',
        icon: '',
      });
      setSelectedFile(null);
    } catch (error) {
      console.error('Error saving skill:', error.response);
      if (error.response && error.response.data && error.response.data.message) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to save skill. Please try again.',
        });
      }
    }
  };

  const handleEdit = (skill) => {
    setNewSkill({
      name: skill.name,
      category: skill.category,
      icon: skill.icon || '',
    });
    setSelectedFile(null);
    setEditingSkill(skill);
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
          await deleteSkill(id);
          fetchSkills(); // Refresh the list
          Swal.fire(
            'Deleted!',
            'Your skill has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting skill:', error);
          Swal.fire(
            'Error!',
            'Failed to delete skill. Please try again.',
            'error'
          );
        }
      }
    });
  };

  const fetchSkills = async () => {
    try {
      const response = await getSkills();
      setSkills(response.data || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to fetch skills. Please try again.',
      });
    }
  };

  // Group skills by category for better display
  const groupSkillsByCategory = () => {
    const grouped = {};
    skills.forEach(skill => {
      if (!grouped[skill.category]) {
        grouped[skill.category] = [];
      }
      grouped[skill.category].push(skill);
    });
    return grouped;
  };

  const groupedSkills = groupSkillsByCategory();

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-6 text-[var(--text-color)] animate__animated animate__fadeInDown">
          Skills Management
        </h1>
        <p className="text-xl text-[var(--text-color)] max-w-3xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
          Add, edit, and organize your technical skills by category
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-[var(--secondary-color)] p-8 rounded-2xl shadow-2xl backdrop-blur-sm bg-opacity-90 border border-[var(--primary-color)] border-opacity-20 mb-16 animate__animated animate__fadeInUp animate__delay-2s">
          <h2 className="text-2xl font-bold mb-6 text-[var(--text-color)] border-l-4 border-[var(--primary-color)] pl-4">
            {editingSkill ? 'Edit Skill' : 'Add New Skill'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Skill Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={newSkill.name} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                placeholder="e.g., React, JavaScript, Python"
                required 
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="category" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Category</label>
              <select 
                id="category" 
                name="category" 
                value={newSkill.category} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300"
                required
              >
                <option value="">Select Category</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Database</option>
                <option value="tools">Tools</option>
                <option value="language">Language</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="mb-6 md:col-span-2">
              <label htmlFor="icon" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Icon Image</label>
              <input 
                type="file" 
                id="icon" 
                name="icon" 
                onChange={handleFileChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                accept="image/*"
              />
              {newSkill.icon && (
                <div className="mt-4 flex items-center">
                  <img src={newSkill.icon} alt="Skill Icon" className="w-16 h-16 object-contain rounded-lg border-2 border-[var(--primary-color)]" />
                  <span className="ml-4 text-[var(--text-color)]">Preview of uploaded icon</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-8">
            <button 
              type="submit" 
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {editingSkill ? 'Update Skill' : 'Add Skill'}
            </button>
            
            {editingSkill && (
              <button 
                type="button" 
                onClick={() => {
                  setEditingSkill(null);
                  setNewSkill({
                    name: '',
                    category: '',
                    icon: '',
                  });
                  setSelectedFile(null);
                }}
                className="ml-4 bg-[var(--secondary-color)] border-2 border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-[var(--text-color)] text-center animate__animated animate__fadeInDown">Current Skills</h2>
          
          {skills.length > 0 ? (
            Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category} className="mb-12 animate__animated animate__fadeInUp">
                <h3 className="text-2xl font-bold mb-6 text-[var(--text-color)] capitalize border-l-4 border-[var(--primary-color)] pl-4">
                  {category} Skills
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {categorySkills.map((skill, index) => (
                    <div 
                      key={skill._id} 
                      className="bg-[var(--secondary-color)] rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 border border-[var(--primary-color)] border-opacity-20 backdrop-blur-sm bg-opacity-80"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="mb-4">
                        {skill.icon ? (
                          <img src={skill.icon} alt={skill.name} className="w-16 h-16 object-contain mx-auto" />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-[var(--background-color)] border-2 border-dashed border-[var(--primary-color)] flex items-center justify-center mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <h4 className="text-lg font-bold mb-2 text-[var(--text-color)]">{skill.name}</h4>
                      <p className="text-sm text-[var(--text-color)] mb-4 capitalize">{skill.category}</p>
                      
                      <div className="flex space-x-2 mt-auto">
                        <button 
                          onClick={() => handleEdit(skill)} 
                          className="p-2 rounded-full bg-[var(--background-color)] hover:bg-[var(--primary-color)] text-[var(--text-color)] hover:text-white transition duration-300"
                          aria-label="Edit skill"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleDelete(skill._id)} 
                          className="p-2 rounded-full bg-[var(--background-color)] hover:bg-red-500 text-[var(--text-color)] hover:text-white transition duration-300"
                          aria-label="Delete skill"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="bg-[var(--secondary-color)] rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[var(--primary-color)] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h3 className="text-2xl font-bold text-[var(--text-color)] mb-2">No Skills Added Yet</h3>
                <p className="text-[var(--text-color)] mb-6">Add your first skill using the form above</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsManagement;