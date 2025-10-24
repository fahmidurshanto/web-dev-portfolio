import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getCertifications, createCertification, updateCertification, deleteCertification } from '../utils/api';

const CertificationsManagement = () => {
  const [certifications, setCertifications] = useState([]);
  const [newCertification, setNewCertification] = useState({
    name: '',
    issuingOrganization: '',
    issueDate: '',
    expirationDate: '',
    credentialId: '',
    credentialUrl: '',
  });
  const [editingCertification, setEditingCertification] = useState(null);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const response = await getCertifications();
      setCertifications(response.data || []);
    } catch (error) {
      console.error('Error fetching certifications:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to fetch certifications. Please try again.',
      });
    }
  };

  const handleChange = (e) => {
    setNewCertification({ ...newCertification, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCertification) {
        await updateCertification(editingCertification._id, newCertification);
        Swal.fire({
          icon: 'success',
          title: 'Certification Updated!',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        await createCertification(newCertification);
        Swal.fire({
          icon: 'success',
          title: 'Certification Added!',
          showConfirmButton: false,
          timer: 1500
        });
      }
      fetchCertifications(); // Refresh the list
      setEditingCertification(null);
      setNewCertification({
        name: '',
        issuingOrganization: '',
        issueDate: '',
        expirationDate: '',
        credentialId: '',
        credentialUrl: '',
      });
    } catch (error) {
      console.error('Error saving certification:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to save certification. Please try again.',
      });
    }
  };

  const handleEdit = (cert) => {
    setNewCertification({
      name: cert.name,
      issuingOrganization: cert.issuingOrganization,
      issueDate: cert.issueDate ? cert.issueDate.substring(0, 10) : '', // Format date for input type="date"
      expirationDate: cert.expirationDate ? cert.expirationDate.substring(0, 10) : '',
      credentialId: cert.credentialId,
      credentialUrl: cert.credentialUrl,
    });
    setEditingCertification(cert);
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
          await deleteCertification(id);
          fetchCertifications(); // Refresh the list
          Swal.fire(
            'Deleted!',
            'Your certification has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting certification:', error);
          Swal.fire(
            'Error!',
            'Failed to delete certification. Please try again.',
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
          Certifications Management
        </h1>
        <p className="text-xl text-[var(--text-color)] max-w-3xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
          Add, edit, and manage your professional certifications
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-[var(--secondary-color)] p-8 rounded-2xl shadow-2xl backdrop-blur-sm bg-opacity-90 border border-[var(--primary-color)] border-opacity-20 mb-16 animate__animated animate__fadeInUp animate__delay-2s">
          <h2 className="text-2xl font-bold mb-6 text-[var(--text-color)] border-l-4 border-[var(--primary-color)] pl-4">
            {editingCertification ? 'Edit Certification' : 'Add New Certification'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Certification Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={newCertification.name} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                placeholder="e.g., AWS Certified Solutions Architect"
                required 
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="issuingOrganization" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Issuing Organization</label>
              <input 
                type="text" 
                id="issuingOrganization" 
                name="issuingOrganization" 
                value={newCertification.issuingOrganization} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                placeholder="e.g., Amazon Web Services"
                required 
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="issueDate" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Issue Date</label>
              <input 
                type="date" 
                id="issueDate" 
                name="issueDate" 
                value={newCertification.issueDate} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                required 
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="expirationDate" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Expiration Date (Optional)</label>
              <input 
                type="date" 
                id="expirationDate" 
                name="expirationDate" 
                value={newCertification.expirationDate} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="credentialId" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Credential ID (Optional)</label>
              <input 
                type="text" 
                id="credentialId" 
                name="credentialId" 
                value={newCertification.credentialId} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                placeholder="e.g., ABC123XYZ"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="credentialUrl" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Credential URL (Optional)</label>
              <input 
                type="url" 
                id="credentialUrl" 
                name="credentialUrl" 
                value={newCertification.credentialUrl} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                placeholder="https://example.com/certificate"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-8">
            <button 
              type="submit" 
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {editingCertification ? 'Update Certification' : 'Add Certification'}
            </button>
            
            {editingCertification && (
              <button 
                type="button" 
                onClick={() => {
                  setEditingCertification(null);
                  setNewCertification({
                    name: '',
                    issuingOrganization: '',
                    issueDate: '',
                    expirationDate: '',
                    credentialId: '',
                    credentialUrl: '',
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
          <h2 className="text-3xl font-bold mb-8 text-[var(--text-color)] text-center animate__animated animate__fadeInDown">Current Certifications</h2>
          
          {certifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certifications.map((cert, index) => (
                <div 
                  key={cert._id} 
                  className="bg-[var(--secondary-color)] rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-105 border border-[var(--primary-color)] border-opacity-20 backdrop-blur-sm bg-opacity-80 animate__animated animate__fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-[var(--text-color)]">{cert.name}</h3>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(cert)} 
                        className="p-2 rounded-full bg-[var(--background-color)] hover:bg-[var(--primary-color)] text-[var(--text-color)] hover:text-white transition duration-300"
                        aria-label="Edit certification"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(cert._id)} 
                        className="p-2 rounded-full bg-[var(--background-color)] hover:bg-red-500 text-[var(--text-color)] hover:text-white transition duration-300"
                        aria-label="Delete certification"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-[var(--text-color)]">
                      <span className="font-semibold">Issuer:</span> {cert.issuingOrganization}
                    </p>
                    <p className="text-[var(--text-color)]">
                      <span className="font-semibold">Issue Date:</span> {new Date(cert.issueDate).toLocaleDateString()}
                    </p>
                    {cert.expirationDate && (
                      <p className="text-[var(--text-color)]">
                        <span className="font-semibold">Expiration Date:</span> {new Date(cert.expirationDate).toLocaleDateString()}
                      </p>
                    )}
                    {cert.credentialId && (
                      <p className="text-[var(--text-color)]">
                        <span className="font-semibold">Credential ID:</span> {cert.credentialId}
                      </p>
                    )}
                    {cert.credentialUrl && (
                      <a 
                        href={cert.credentialUrl} 
                        className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-2 px-4 rounded-full mt-2 transition duration-300 shadow-md"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        View Certificate
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-[var(--secondary-color)] rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[var(--primary-color)] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-2xl font-bold text-[var(--text-color)] mb-2">No Certifications Yet</h3>
                <p className="text-[var(--text-color)] mb-6">Add your first certification using the form above</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificationsManagement;