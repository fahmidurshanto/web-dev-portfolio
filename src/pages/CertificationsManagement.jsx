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
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-[var(--text-color)]">Certifications Management</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-[var(--secondary-color)] p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-[var(--text-color)] text-sm font-bold mb-2">Certification Name</label>
          <input type="text" id="name" name="name" value={newCertification.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="issuingOrganization" className="block text-[var(--text-color)] text-sm font-bold mb-2">Issuing Organization</label>
          <input type="text" id="issuingOrganization" name="issuingOrganization" value={newCertification.issuingOrganization} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="issueDate" className="block text-[var(--text-color)] text-sm font-bold mb-2">Issue Date</label>
          <input type="date" id="issueDate" name="issueDate" value={newCertification.issueDate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="expirationDate" className="block text-[var(--text-color)] text-sm font-bold mb-2">Expiration Date (Optional)</label>
          <input type="date" id="expirationDate" name="expirationDate" value={newCertification.expirationDate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="credentialId" className="block text-[var(--text-color)] text-sm font-bold mb-2">Credential ID (Optional)</label>
          <input type="text" id="credentialId" name="credentialId" value={newCertification.credentialId} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label htmlFor="credentialUrl" className="block text-[var(--text-color)] text-sm font-bold mb-2">Credential URL (Optional)</label>
          <input type="url" id="credentialUrl" name="credentialUrl" value={newCertification.credentialUrl} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex items-center justify-center">
          <button type="submit" className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{editingCertification ? 'Update Certification' : 'Add Certification'}</button>
        </div>
      </form>

      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6 text-[var(--text-color)]">Current Certifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <div key={cert._id} className="bg-[var(--secondary-color)] rounded-lg shadow-lg p-8">
              <h4 className="text-xl font-bold mb-2 text-[var(--text-color)]">{cert.name}</h4>
              <p className="text-[var(--text-color)] mb-1"><strong>Issuer:</strong> {cert.issuingOrganization}</p>
              <p className="text-[var(--text-color)]"><strong>Issue Date:</strong> {new Date(cert.issueDate).toLocaleDateString()}</p>
              {cert.expirationDate && <p className="text-[var(--text-color)]"><strong>Expiration Date:</strong> {new Date(cert.expirationDate).toLocaleDateString()}</p>}
              {cert.credentialId && <p className="text-[var(--text-color)]"><strong>Credential ID:</strong> {cert.credentialId}</p>}
              {cert.credentialUrl && <a href={cert.credentialUrl} className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded mt-4 inline-block" target="_blank" rel="noopener noreferrer">View Certificate</a>}
              <div className="flex justify-end mt-4 space-x-2">
                <button onClick={() => handleEdit(cert)} className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded">Edit</button>
                <button onClick={() => handleDelete(cert._id)} className="bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)] text-white font-bold py-2 px-4 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificationsManagement;
