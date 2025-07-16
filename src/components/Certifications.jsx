import React from 'react';

const Certifications = () => {
  const certifications = [
    {
      name: 'MERN Stack Developer Certification',
      issuer: 'Coursera',
      date: 'Jan 2023',
      link: '#',
    },
    {
      name: 'JavaScript Algorithms and Data Structures',
      issuer: 'freeCodeCamp',
      date: 'Dec 2022',
      link: '#',
    },
  ];

  return (
    <section id="certifications" className="py-20 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-400 animate__animated animate__fadeInDown">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-gray-700 rounded-lg shadow-2xl p-8 text-center transform transition duration-500 hover:scale-105 hover:bg-gray-600 animate__animated animate__fadeInUp animate__delay-1s">
              <h3 className="text-2xl font-bold mb-2 text-white">{cert.name}</h3>
              <p className="text-gray-300 mb-1"><strong>Issuer:</strong> {cert.issuer}</p>
              <p className="text-gray-300"><strong>Date:</strong> {cert.date}</p>
              {cert.link && <a href={cert.link} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4 inline-block transition duration-300" target="_blank" rel="noopener noreferrer">View Certificate</a>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
