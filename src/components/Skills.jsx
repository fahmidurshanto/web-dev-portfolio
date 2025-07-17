import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub, FaTools, FaTerminal, FaMagic,
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

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const storedSkills = await localforage.getItem('skills');
      if (storedSkills) {
        setSkills(storedSkills);
      }
    };
    fetchSkills();
  }, []);

  const categorizedSkills = skills.reduce((acc, skill) => {
    (acc[skill.category] = acc[skill.category] || []).push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-20 bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 animate__animated animate__fadeInDown">Skills</h2>
        {Object.entries(categorizedSkills).map(([category, skillsArr]) => (
          <div key={category} className="mb-12">
            <h3 className="text-3xl font-bold mb-8 text-[var(--primary-color)] animate__animated animate__fadeInDown animate__delay-1s">{category}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {skillsArr.map((skill, index) => {
                const IconComponent = iconComponents[skill.iconClass];
                return (
                  <div key={index} className="bg-[var(--secondary-color)] rounded-lg shadow-xl p-6 text-center flex flex-col items-center justify-center transform transition duration-500 hover:scale-105 hover:bg-[var(--primary-color)] animate__animated animate__fadeInUp">
                    {IconComponent && <IconComponent size={40} color={skill.iconColor} />}
                    <h4 className="text-lg font-semibold mt-3 text-[var(--text-color)]">{skill.name}</h4>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;