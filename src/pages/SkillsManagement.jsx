import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub, FaTools, FaTerminal, FaMagic,
  FaBars, FaTimes, FaSun, FaMoon // Include these if you want to use them in the form for selection
} from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiFirebase, SiJsonwebtokens } from 'react-icons/si';
import { IoLogoJavascript } from 'react-icons/io5'; // Corrected import for IoLogoJavascript
import { VscVscode } from 'react-icons/vsc';

// Mapping of icon class names to actual components
const iconComponents = {
  FaReact: FaReact,
  FaNodeJs: FaNodeJs,
  FaHtml5: FaHtml5,
  FaCss3Alt: FaCss3Alt,
  FaGitAlt: FaGitAlt,
  FaGithub: FaGithub,
  FaTools: FaTools,
  FaTerminal: FaTerminal,
  FaMagic: FaMagic,
  SiMongodb: SiMongodb,
  SiExpress: SiExpress,
  SiTailwindcss: SiTailwindcss,
  SiFirebase: SiFirebase,
  SiJsonwebtokens: SiJsonwebtokens,
  IoLogoJavascript: IoLogoJavascript,
  VscVscode: VscVscode,
  // Add other icons as needed
};

const SkillsManagement = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({
    name: '',
    iconClass: '',
    category: '',
    iconColor: '#000000', // Default color for the icon
  });
  const [editingSkill, setEditingSkill] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      const storedSkills = await localforage.getItem('skills');
      if (storedSkills) {
        setSkills(storedSkills);
      }
    };
    fetchSkills();
  }, []);

  const handleChange = (e) => {
    setNewSkill({ ...newSkill, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedSkills;
    if (editingSkill) {
      updatedSkills = skills.map((skill) =>
        skill === editingSkill ? newSkill : skill
      );
      setEditingSkill(null);
    } else {
      updatedSkills = [...skills, newSkill];
    }
    setSkills(updatedSkills);
    await localforage.setItem('skills', updatedSkills);
    setNewSkill({
      name: '',
      iconClass: '',
      category: '',
      iconColor: '#000000',
    });
  };

  const handleEdit = (skill) => {
    setNewSkill(skill);
    setEditingSkill(skill);
  };

  const handleDelete = async (skillToDelete) => {
    const updatedSkills = skills.filter(
      (skill) => skill !== skillToDelete
    );
    setSkills(updatedSkills);
    await localforage.setItem('skills', updatedSkills);
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
          <label htmlFor="iconClass" className="block text-[var(--text-color)] text-sm font-bold mb-2">Icon Class (e.g., FaReact)</label>
          <input type="text" id="iconClass" name="iconClass" value={newSkill.iconClass} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label htmlFor="category" className="block text-[var(--text-color)] text-sm font-bold mb-2">Category</label>
          <input type="text" id="category" name="category" value={newSkill.category} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-6">
          <label htmlFor="iconColor" className="block text-[var(--text-color)] text-sm font-bold mb-2">Icon Color</label>
          <input type="color" id="iconColor" name="iconColor" value={newSkill.iconColor} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex items-center justify-center">
          <button type="submit" className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{editingSkill ? 'Update Skill' : 'Add Skill'}</button>
        </div>
      </form>

      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6 text-[var(--text-color)]">Current Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const IconComponent = iconComponents[skill.iconClass];
            return (
              <div key={index} className="bg-[var(--secondary-color)] rounded-lg shadow-lg p-8">
                <h4 className="text-xl font-bold mb-2 text-[var(--text-color)]">{skill.name}</h4>
                <p className="text-[var(--text-color)] mb-4">Category: {skill.category}</p>
                {IconComponent && <IconComponent size={40} color={skill.iconColor} />}
                <div className="flex justify-end mt-4 space-x-2">
                  <button onClick={() => handleEdit(skill)} className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded">Edit</button>
                  <button onClick={() => handleDelete(skill)} className="bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)] text-white font-bold py-2 px-4 rounded">Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillsManagement;
