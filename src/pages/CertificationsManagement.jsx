import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import Swal from 'sweetalert2';

const CertificationsManagement = () => {
  const [certifications, setCertifications] = useState([]);
  const [newCertification, setNewCertification] = useState({
    name: '',
    issuer: '',
    date: '',
    link: '',
    thumbnail: '', // New field for thumbnail
  });
  const [editingCertification, setEditingCertification] = useState(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      const storedCertifications = await localforage.getItem('certifications');
      if (storedCertifications) {
        setCertifications(storedCertifications);
      }
    };
    fetchCertifications();
  }, []);

  const handleChange = (e) => {
    setNewCertification({ ...newCertification, [e.target.name]: e.target.value });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCertification({ ...newCertification, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setNewCertification({ ...newCertification, thumbnail: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedCertifications;
    if (editingCertification) {
      updatedCertifications = certifications.map((cert) =>
        cert === editingCertification ? newCertification : cert
      );
      setEditingCertification(null);
    } else {
      updatedCertifications = [...certifications, newCertification];
    }
    setCertifications(updatedCertifications);
    await localforage.setItem('certifications', updatedCertifications);
    Swal.fire({
      icon: 'success',
      title: editingCertification ? 'Certification Updated!' : 'Certification Added!',
      showConfirmButton: false,
      timer: 1500
    });
    setNewCertification({
      name: '',
      issuer: '',
      date: '',
      link: '',
      thumbnail: '',
    });
  };

  const handleEdit = (cert) => {
    setNewCertification(cert);
    setEditingCertification(cert);
  };

  const handleDelete = async (certToDelete) => {
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
        const updatedCertifications = certifications.filter(
          (cert) => cert !== certToDelete
        );
        setCertifications(updatedCertifications);
        await localforage.setItem('certifications', updatedCertifications);
        Swal.fire(
          'Deleted!',
          'Your certification has been deleted.',
          'success'
        );
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
          <label htmlFor="issuer" className="block text-[var(--text-color)] text-sm font-bold mb-2">Issuer</label>
          <input type="text" id="issuer" name="issuer" value={newCertification.issuer} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-[var(--text-color)] text-sm font-bold mb-2">Date (e.g., Jan 2023)</label>
          <input type="text" id="date" name="date" value={newCertification.date} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label htmlFor="link" className="block text-[var(--text-color)] text-sm font-bold mb-2">Link</label>
          <input type="url" id="link" name="link" value={newCertification.link} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label htmlFor="thumbnail" className="block text-[var(--text-color)] text-sm font-bold mb-2">Certification Thumbnail</label>
          <input type="file" id="thumbnail" name="thumbnail" accept="image/*,application/pdf" onChange={handleThumbnailChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" />
          {newCertification.thumbnail && (
            <img src={newCertification.thumbnail} alt="Thumbnail Preview" className="mt-2 w-24 h-24 object-cover rounded" />
          )}
        </div>
        <div className="flex items-center justify-center">
          <button type="submit" className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{editingCertification ? 'Update Certification' : 'Add Certification'}</button>
        </div>
      </form>

      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6 text-[var(--text-color)]">Current Certifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-[var(--secondary-color)] rounded-lg shadow-lg p-8">
              <h4 className="text-xl font-bold mb-2 text-[var(--text-color)]">{cert.name}</h4>
              <p className="text-[var(--text-color)] mb-1"><strong>Issuer:</strong> {cert.issuer}</p>
              <p className="text-[var(--text-color)]"><strong>Date:</strong> {cert.date}</p>
              {cert.link && <a href={cert.link} className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded mt-4 inline-block" target="_blank" rel="noopener noreferrer">View Certificate</a>}
              <div className="flex justify-end mt-4 space-x-2">
                <button onClick={() => handleEdit(cert)} className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded">Edit</button>
                <button onClick={() => handleDelete(cert)} className="bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)] text-white font-bold py-2 px-4 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificationsManagement;
