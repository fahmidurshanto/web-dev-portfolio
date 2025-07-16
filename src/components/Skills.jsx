import React from 'react';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub, FaTools, FaTerminal, FaMagic } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiFirebase, SiJsonwebtokens } from 'react-icons/si';
import { IoLogoJavascript } from 'react-icons/io';
import { VscVscode } from 'react-icons/vsc';

const Skills = () => {
  const skills = [
    { name: 'React', icon: <FaReact size={40} color="#61DAFB" />, category: 'Frontend' },
    { name: 'React Router', icon: <FaReact size={40} color="#F44250" />, category: 'Frontend' },
    { name: 'JavaScript', icon: <IoLogoJavascript size={40} color="#F7DF1E" />, category: 'Frontend' },
    { name: 'HTML', icon: <FaHtml5 size={40} color="#E34F26" />, category: 'Frontend' },
    { name: 'CSS', icon: <FaCss3Alt size={40} color="#1572B6" />, category: 'Frontend' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss size={40} color="#06B6D4" />, category: 'Frontend' },
    { name: 'Node.js', icon: <FaNodeJs size={40} color="#339933" />, category: 'Backend' },
    { name: 'Express.js', icon: <SiExpress size={40} color="#000000" />, category: 'Backend' },
    { name: 'JWT', icon: <SiJsonwebtokens size={40} color="#000000" />, category: 'Backend' },
    { name: 'MongoDB', icon: <SiMongodb size={40} color="#47A248" />, category: 'Database' },
    { name: 'Firebase', icon: <SiFirebase size={40} color="#FFCA28" />, category: 'Database' },
    { name: 'Git', icon: <FaGitAlt size={40} color="#F05032" />, category: 'Tools' },
    { name: 'GitHub', icon: <FaGithub size={40} color="#181717" />, category: 'Tools' },
    { name: 'VS Code', icon: <VscVscode  size={40} color="#007ACC" />, category: 'Tools' },
    { name: 'Cursor', icon: <FaTools size={40} color="#4A90E2" />, category: 'Tools' },
    { name: 'Windsurf', icon: <FaTools size={40} color="#FF6F00" />, category: 'Tools' },
    { name: 'Gemini CLI', icon: <FaTerminal size={40} color="#4285F4" />, category: 'Tools' },
    { name: 'Framer Motion', icon: <FaMagic size={40} color="#0055FF" />, category: 'Animation' },
    { name: 'Animate.css', icon: <FaCss3Alt size={40} color="#FF0000" />, category: 'Animation' },
  ];

  const categorizedSkills = skills.reduce((acc, skill) => {
    (acc[skill.category] = acc[skill.category] || []).push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 animate__animated animate__fadeInDown">Skills</h2>
        {Object.entries(categorizedSkills).map(([category, skillsArr]) => (
          <div key={category} className="mb-12">
            <h3 className="text-3xl font-bold text-center mb-8 text-blue-400 animate__animated animate__fadeInDown animate__delay-1s">{category}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {skillsArr.map((skill, index) => (
                <div key={index} className="bg-gray-800 rounded-lg shadow-xl p-6 text-center flex flex-col items-center justify-center transform transition duration-500 hover:scale-105 hover:bg-gray-700 animate__animated animate__fadeInUp">
                  {skill.icon}
                  <h4 className="text-lg font-semibold mt-3 text-white">{skill.name}</h4>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
