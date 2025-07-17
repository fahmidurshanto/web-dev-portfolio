import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import Swal from 'sweetalert2';

const EducationManagement = () => {
  const [educationEntries, setEducationEntries] = useState([]);
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    year: '',
    description: '',
  });
  const [editingEducation, setEditingEducation] = useState(null);

  useEffect(() => {
    const fetchEducation = async () => {
      const storedEducation = await localforage.getItem('education');
      if (storedEducation) {
        setEducationEntries(storedEducation);
      }
    };
    fetchEducation();
  }, []);

  const handleChange = (e) => {
    setNewEducation({ ...newEducation, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedEducationEntries;
    if (editingEducation) {
      updatedEducationEntries = educationEntries.map((entry) =>
        entry === editingEducation ? newEducation : entry
      );
      setEditingEducation(null);
    } else {
      updatedEducationEntries = [...educationEntries, newEducation];
    }
    setEducationEntries(updatedEducationEntries);
    await localforage.setItem('education', updatedEducationEntries);
    Swal.fire({
      icon: 'success',
      title: editingEducation ? 'Education Updated!' : 'Education Added!',
      showConfirmButton: false,
      timer: 1500
    });
    setNewEducation({
      degree: '',
      institution: '',
      year: '',
      description: '',
    });
  };

  const handleEdit = (entry) => {
    setNewEducation(entry);
    setEditingEducation(entry);
  };

  const handleDelete = async (entryToDelete) => {
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
        const updatedEducationEntries = educationEntries.filter(
          (entry) => entry !== entryToDelete
        );
        setEducationEntries(updatedEducationEntries);
        await localforage.setItem('education', updatedEducationEntries);
        Swal.fire(
          'Deleted!',
          'Your education entry has been deleted.',
          'success'
        );
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
          <label htmlFor="year" className="block text-[var(--text-color)] text-sm font-bold mb-2">Year (e.g., 2020-2024)</label>
          <input type="text" id="year" name="year" value={newEducation.year} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" />
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
          {educationEntries.map((entry, index) => (
            <div key={index} className="bg-[var(--secondary-color)] rounded-lg shadow-lg p-8">
              <h4 className="text-xl font-bold mb-2 text-[var(--text-color)]">{entry.degree}</h4>
              <p className="text-[var(--text-color)] mb-1"><strong>Institution:</strong> {entry.institution}</p>
              <p className="text-[var(--text-color)] mb-1"><strong>Year:</strong> {entry.year}</p>
              {entry.description && <p className="text-[var(--text-color)] mb-4">{entry.description}</p>}
              <div className="flex justify-end mt-4 space-x-2">
                <button onClick={() => handleEdit(entry)} className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded">Edit</button>
                <button onClick={() => handleDelete(entry)} className="bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)] text-white font-bold py-2 px-4 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationManagement;
