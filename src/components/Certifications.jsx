import React, { useState, useEffect } from 'react';
import { getCertifications } from '../utils/api';

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await getCertifications();
        setCertifications(response.data || []);
      } catch (error) {
        console.error('Error fetching certifications:', error);
      }
    };
    fetchCertifications();
  }, []);

  return (
    <section id="certifications" className="py-20 bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-[var(--primary-color)] animate__animated animate__fadeInDown">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.length > 0 ? (
            certifications.map((cert) => (
              <div key={cert._id} className="bg-[var(--secondary-color)] rounded-lg shadow-2xl p-8 text-center transform transition duration-500 hover:scale-105 hover:bg-[var(--primary-color)] animate__animated animate__fadeInUp animate__delay-1s">
                <h3 className="text-2xl font-bold mb-2 text-[var(--text-color)]">{cert.name}</h3>
                <p className="text-[var(--text-color)] mb-1"><strong>Issuer:</strong> {cert.issuingOrganization}</p>
                <p className="text-[var(--text-color)]"><strong>Issue Date:</strong> {new Date(cert.issueDate).toLocaleDateString()}</p>
                {cert.expirationDate && <p className="text-[var(--text-color)]"><strong>Expiration Date:</strong> {new Date(cert.expirationDate).toLocaleDateString()}</p>}
                {cert.credentialId && <p className="text-[var(--text-color)]"><strong>Credential ID:</strong> {cert.credentialId}</p>}
                {cert.credentialUrl && <a href={cert.credentialUrl} className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded-full mt-4 inline-block transition duration-300" target="_blank" rel="noopener noreferrer">View Certificate</a>}
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-[var(--text-color)] text-lg">No certifications added yet. Go to <a href="/manage-certifications" className="text-[var(--primary-color)] hover:underline font-semibold">Certifications Management</a> to add some!</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Certifications;