import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getEducation, createEducation, updateEducation, deleteEducation } from '../utils/api';

const EducationManagement = () => {
  const [educationEntries, setEducationEntries] = useState([]);
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const [editingEducation, setEditingEducation] = useState(null);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await getEducation();
      setEducationEntries(response.data || []);
    } catch (error) {
      console.error('Error fetching education:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to fetch education entries. Please try again.',
      });
    }
  };

  const handleChange = (e) => {
    setNewEducation({ ...newEducation, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEducation) {
        await updateEducation(editingEducation._id, newEducation);
        Swal.fire({
          icon: 'success',
          title: 'Education Updated!',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        await createEducation(newEducation);
        Swal.fire({
          icon: 'success',
          title: 'Education Added!',
          showConfirmButton: false,
          timer: 1500
        });
      }
      fetchEducation(); // Refresh the list
      setEditingEducation(null);
      setNewEducation({
        degree: '',
        institution: '',
        startDate: '',
        endDate: '',
        description: '',
      });
    } catch (error) {
      console.error('Error saving education:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to save education. Please try again.',
      });
    }
  };

  const handleEdit = (entry) => {
    setNewEducation({
      degree: entry.degree,
      institution: entry.institution,
      startDate: entry.startDate ? entry.startDate.substring(0, 10) : '',
      endDate: entry.endDate ? entry.endDate.substring(0, 10) : '',
      description: entry.description,
    });
    setEditingEducation(entry);
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
          await deleteEducation(id);
          fetchEducation(); // Refresh the list
          Swal.fire(
            'Deleted!',
            'Your education entry has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting education:', error);
          Swal.fire(
            'Error!',
            'Failed to delete education. Please try again.',
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
          Education Management
        </h1>
        <p className="text-xl text-[var(--text-color)] max-w-3xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
          Add, edit, and manage your educational background
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-[var(--secondary-color)] p-8 rounded-2xl shadow-2xl backdrop-blur-sm bg-opacity-90 border border-[var(--primary-color)] border-opacity-20 mb-16 animate__animated animate__fadeInUp animate__delay-2s">
          <h2 className="text-2xl font-bold mb-6 text-[var(--text-color)] border-l-4 border-[var(--primary-color)] pl-4">
            {editingEducation ? 'Edit Education' : 'Add New Education'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label htmlFor="degree" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Degree/Field of Study</label>
              <input 
                type="text" 
                id="degree" 
                name="degree" 
                value={newEducation.degree} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                placeholder="e.g., Bachelor of Science in Computer Science"
                required 
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="institution" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Institution</label>
              <input 
                type="text" 
                id="institution" 
                name="institution" 
                value={newEducation.institution} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                placeholder="e.g., University of Example"
                required 
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="startDate" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Start Date</label>
              <input 
                type="date" 
                id="startDate" 
                name="startDate" 
                value={newEducation.startDate} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                required 
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="endDate" className="block text-[var(--text-color)] text-lg font-semibold mb-2">End Date (Optional)</label>
              <input 
                type="date" 
                id="endDate" 
                name="endDate" 
                value={newEducation.endDate} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
              />
            </div>
            
            <div className="mb-6 md:col-span-2">
              <label htmlFor="description" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Description (Optional)</label>
              <textarea 
                id="description" 
                name="description" 
                value={newEducation.description} 
                onChange={handleChange} 
                rows="4" 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300 resize-none" 
                placeholder="Describe your educational experience, achievements, or relevant coursework..."
              ></textarea>
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-8">
            <button 
              type="submit" 
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {editingEducation ? 'Update Education' : 'Add Education'}
            </button>
            
            {editingEducation && (
              <button 
                type="button" 
                onClick={() => {
                  setEditingEducation(null);
                  setNewEducation({
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                  });
                }}
                className="ml-4 bg-[var(--secondary-color)] border-2 border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-[var(--text-color)] text-center animate__animated animate__fadeInDown">Current Education</h2>
          
          {educationEntries.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {educationEntries.map((entry, index) => (
                <div 
                  key={entry._id} 
                  className="bg-[var(--secondary-color)] rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-[1.02] border border-[var(--primary-color)] border-opacity-20 backdrop-blur-sm bg-opacity-80 animate__animated animate__fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--text-color)]">{entry.degree}</h3>
                      <p className="text-[var(--text-color)] text-lg mt-1">{entry.institution}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(entry)} 
                        className="p-2 rounded-full bg-[var(--background-color)] hover:bg-[var(--primary-color)] text-[var(--text-color)] hover:text-white transition duration-300"
                        aria-label="Edit education"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(entry._id)} 
                        className="p-2 rounded-full bg-[var(--background-color)] hover:bg-red-500 text-[var(--text-color)] hover:text-white transition duration-300"
                        aria-label="Delete education"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-[var(--text-color)]">
                      <span className="font-semibold">Duration:</span> {new Date(entry.startDate).toLocaleDateString()} - {entry.endDate ? new Date(entry.endDate).toLocaleDateString() : 'Present'}
                    </p>
                    {entry.description && (
                      <p className="text-[var(--text-color)]">
                        <span className="font-semibold">Description:</span> {entry.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-[var(--secondary-color)] rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[var(--primary-color)] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-2xl font-bold text-[var(--text-color)] mb-2">No Education Entries Yet</h3>
                <p className="text-[var(--text-color)] mb-6">Add your first education entry using the form above</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationManagement;