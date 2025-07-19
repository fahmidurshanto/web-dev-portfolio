import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../utils/api';




const SkillsManagement = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: '',
    icon: '', // New field for icon URL
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
      console.log('Submitting skill data:', skillData); // Log the data being sent
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
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-[var(--text-color)]">Skills Management</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-[var(--secondary-color)] p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-[var(--text-color)] text-sm font-bold mb-2">Skill Name</label>
          <input type="text" id="name" name="name" value={newSkill.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-[var(--text-color)] text-sm font-bold mb-2">Category</label>
          <select id="category" name="category" value={newSkill.category} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] bg-base-500 leading-tight focus:outline-none focus:shadow-outline" required>
            <option value="">Select Category</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="tools">Tools</option>
            <option value="language">Language</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="icon" className="block text-[var(--text-color)] text-sm font-bold mb-2">Icon Image</label>
          <input type="file" id="icon" name="icon" onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" />
          {newSkill.icon && (
            <div className="mt-2">
              <img src={newSkill.icon} alt="Skill Icon" className="w-16 h-16 object-contain" />
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-center">
          <button type="submit" className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{editingSkill ? 'Update Skill' : 'Add Skill'}</button>
        </div>
      </form>

      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6 text-[var(--text-color)]">Current Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => {
            return (
            <div key={skill._id} className="bg-[var(--secondary-color)] rounded-lg shadow-lg p-8">
              {skill.icon && <img src={skill.icon} alt={skill.name} className="w-16 h-16 object-contain mb-4" />}
              <h4 className="text-xl font-bold mb-2 text-[var(--text-color)]">{skill.name}</h4>
              <p className="text-[var(--text-color)] mb-2">Category: {skill.category}</p>
              <div className="flex justify-end mt-4 space-x-2">
                <button onClick={() => handleEdit(skill)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                <button onClick={() => handleDelete(skill._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
              </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
};

export default SkillsManagement;
