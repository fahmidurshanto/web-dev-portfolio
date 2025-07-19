import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getUser, updateUser } from '../utils/api';

const ProfileSettings = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    fullName: '',
    bio: '',
    profilePicture: '',
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: '',
      website: '',
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For demonstration, assuming a fixed user ID or fetching the first user
  // In a real app, this ID would come from authentication context
  const userId = '60d5ec49f8c7d00015f8e3b1'; // Placeholder ID, replace with actual user ID

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser(userId);
        setUserData(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data.');
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to fetch user data. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('socialLinks.')) {
      const socialKey = name.split('.')[1];
      setUserData(prevData => ({
        ...prevData,
        socialLinks: {
          ...prevData.socialLinks,
          [socialKey]: value
        }
      }));
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setUserData({ ...userData, profilePicture: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(userId, userData);
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (err) {
      console.error('Error saving profile:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to save profile. Please try again.',
      });
    }
  };

  if (loading) {
    return <div className="text-center text-[var(--text-color)]">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-[var(--text-color)]">Profile Settings</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-[var(--secondary-color)] p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="username" className="block text-[var(--text-color)] text-sm font-bold mb-2">Username</label>
          <input type="text" id="username" name="username" value={userData.username} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-[var(--text-color)] text-sm font-bold mb-2">Email</label>
          <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-[var(--text-color)] text-sm font-bold mb-2">Full Name</label>
          <input type="text" id="fullName" name="fullName" value={userData.fullName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="block text-[var(--text-color)] text-sm font-bold mb-2">Bio</label>
          <textarea id="bio" name="bio" value={userData.bio} onChange={handleChange} rows="3" className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline"></textarea>
        </div>
        <div className="mb-6">
          <label htmlFor="profilePicture" className="block text-[var(--text-color)] text-sm font-bold mb-2">Profile Picture</label>
          <input type="file" id="profilePicture" name="profilePicture" accept="image/*" onChange={handleImageChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" />
          {userData.profilePicture && (
            <img src={userData.profilePicture} alt="Profile Preview" className="mt-4 w-32 h-32 object-cover rounded-full mx-auto border-4 border-[var(--primary-color)] shadow-lg" />
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="socialLinks.linkedin" className="block text-[var(--text-color)] text-sm font-bold mb-2">LinkedIn URL</label>
          <input type="url" id="socialLinks.linkedin" name="socialLinks.linkedin" value={userData.socialLinks.linkedin} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="socialLinks.github" className="block text-[var(--text-color)] text-sm font-bold mb-2">GitHub URL</label>
          <input type="url" id="socialLinks.github" name="socialLinks.github" value={userData.socialLinks.github} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="socialLinks.twitter" className="block text-[var(--text-color)] text-sm font-bold mb-2">Twitter URL</label>
          <input type="url" id="socialLinks.twitter" name="socialLinks.twitter" value={userData.socialLinks.twitter} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label htmlFor="socialLinks.website" className="block text-[var(--text-color)] text-sm font-bold mb-2">Personal Website URL</label>
          <input type="url" id="socialLinks.website" name="socialLinks.website" value={userData.socialLinks.website} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text-color)] leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex items-center justify-center">
          <button type="submit" className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save Profile</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
