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
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-[var(--text-color)]">Education Management</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-[var(--secondary-color)] p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="degree" className="block text-[var(--text-color)] text-sm font-bold mb-2">Degree/Field of Study</label>
          <input type="text" id="degree" name="degree" value={newEducation.degree} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="institution" className="block text-[var(--text-color)] text-sm font-bold mb-2">Institution</label>
          <input type="text" id="institution" name="institution" value={newEducation.institution} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-[var(--text-color)] text-sm font-bold mb-2">Start Date</label>
          <input type="date" id="startDate" name="startDate" value={newEducation.startDate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-[var(--text-color)] text-sm font-bold mb-2">End Date (Optional)</label>
          <input type="date" id="endDate" name="endDate" value={newEducation.endDate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-[var(--text-color)] text-sm font-bold mb-2">Description (Optional)</label>
          <textarea id="description" name="description" value={newEducation.description} onChange={handleChange} rows="3" className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline"></textarea>
        </div>
        <div className="flex items-center justify-center">
          <button type="submit" className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{editingEducation ? 'Update Education' : 'Add Education'}</button>
        </div>
      </form>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-center mb-6 text-[var(--text-color)]">Current Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {educationEntries.map((entry) => (
            <div key={entry._id} className="bg-[var(--secondary-color)] rounded-lg shadow-lg p-8">
              <h4 className="text-xl font-bold mb-2 text-[var(--text-color)]">{entry.degree}</h4>
              <p className="text-[var(--text-color)] mb-1"><strong>Institution:</strong> {entry.institution}</p>
              <p className="text-[var(--text-color)] mb-1"><strong>Dates:</strong> {new Date(entry.startDate).toLocaleDateString()} - {entry.endDate ? new Date(entry.endDate).toLocaleDateString() : 'Present'}</p>
              {entry.description && <p className="text-[var(--text-color)] mb-4">{entry.description}</p>}
              <div className="flex justify-end mt-4 space-x-2">
                <button onClick={() => handleEdit(entry)} className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded">Edit</button>
                <button onClick={() => handleDelete(entry._id)} className="bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)] text-white font-bold py-2 px-4 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationManagement;
