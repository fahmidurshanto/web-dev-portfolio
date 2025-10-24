import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getUsers, updateUser, createUser } from '../utils/api';

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
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // First, try to get all users to see if any exist
        const usersResponse = await getUsers();
        if (usersResponse.data && usersResponse.data.length > 0) {
          // Use the first user if exists
          const user = usersResponse.data[0];
          // Ensure socialLinks object exists and has all required properties
          const processedUser = {
            ...user,
            socialLinks: {
              linkedin: user.socialLinks?.linkedin || '',
              github: user.socialLinks?.github || '',
              twitter: user.socialLinks?.twitter || '',
              website: user.socialLinks?.website || '',
            }
          };
          setUserData(processedUser);
          setUserId(user._id);
        } else {
          // No users exist, create a default user
          await createDefaultUser();
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data. Please try again.');
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
  }, []);

  const createDefaultUser = async () => {
    try {
      const defaultUser = {
        username: 'admin',
        email: 'admin@example.com',
        password: 'password123', // In a real app, this should be properly hashed
        fullName: 'Admin User',
        bio: 'This is the default admin user',
        profilePicture: '',
        socialLinks: {
          linkedin: '',
          github: '',
          twitter: '',
          website: ''
        }
      };
      
      const response = await createUser(defaultUser);
      const newUser = response.data;
      // Ensure socialLinks object exists and has all required properties
      const processedUser = {
        ...newUser,
        socialLinks: {
          linkedin: newUser.socialLinks?.linkedin || '',
          github: newUser.socialLinks?.github || '',
          twitter: newUser.socialLinks?.twitter || '',
          website: newUser.socialLinks?.website || '',
        }
      };
      setUserData(processedUser);
      setUserId(newUser._id);
      setError(null);
      
      Swal.fire({
        icon: 'success',
        title: 'Default User Created!',
        text: 'A default admin user has been created. You can now update the profile.',
      });
    } catch (err) {
      console.error('Error creating default user:', err);
      setError('Failed to create default user. Please try again.');
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to create default user. Please try again.',
      });
    }
  };

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
    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'No user selected. Please refresh the page.',
      });
      return;
    }
    
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
    return <div className="text-center text-[var(--text-color)] py-12">Loading profile...</div>;
  }

  if (error && !userId) {
    return <div className="text-center text-red-500 py-12">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-6 text-[var(--text-color)] animate__animated animate__fadeInDown">
          Profile Settings
        </h1>
        <p className="text-xl text-[var(--text-color)] max-w-3xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
          Update your personal information and profile details
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-[var(--secondary-color)] p-8 rounded-2xl shadow-2xl backdrop-blur-sm bg-opacity-90 border border-[var(--primary-color)] border-opacity-20 animate__animated animate__fadeInUp animate__delay-2s">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Picture Section */}
            <div className="md:w-1/3">
              <div className="bg-[var(--background-color)] rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-[var(--text-color)]">Profile Picture</h2>
                
                <div className="flex flex-col items-center">
                  <div className="relative">
                    {userData.profilePicture ? (
                      <img 
                        src={userData.profilePicture} 
                        alt="Profile Preview" 
                        className="w-40 h-40 object-cover rounded-full mx-auto border-4 border-[var(--primary-color)] shadow-lg"
                      />
                    ) : (
                      <div className="w-40 h-40 rounded-full bg-[var(--background-color)] border-2 border-dashed border-[var(--primary-color)] flex items-center justify-center mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[var(--primary-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 w-full">
                    <label htmlFor="profilePicture" className="block text-[var(--text-color)] text-lg font-semibold mb-2 text-center">Upload New Picture</label>
                    <input 
                      type="file" 
                      id="profilePicture" 
                      name="profilePicture" 
                      accept="image/*" 
                      onChange={handleImageChange} 
                      className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                    />
                    <p className="text-sm text-[var(--text-color)] mt-2 text-center">JPG, PNG, or GIF (Max 5MB)</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Profile Information Section */}
            <div className="md:w-2/3">
              <div className="bg-[var(--background-color)] rounded-xl p-6 shadow-lg mb-6">
                <h2 className="text-xl font-bold mb-4 text-[var(--text-color)] border-l-4 border-[var(--primary-color)] pl-4">Basic Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="username" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Username</label>
                    <input 
                      type="text" 
                      id="username" 
                      name="username" 
                      value={userData.username || ''} 
                      onChange={handleChange} 
                      className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                      placeholder="Enter your username"
                      required 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={userData.email || ''} 
                      onChange={handleChange} 
                      className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                      placeholder="Enter your email"
                      required 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="fullName" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Full Name</label>
                    <input 
                      type="text" 
                      id="fullName" 
                      name="fullName" 
                      value={userData.fullName || ''} 
                      onChange={handleChange} 
                      className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Bio</label>
                    <textarea 
                      id="bio" 
                      name="bio" 
                      value={userData.bio || ''} 
                      onChange={handleChange} 
                      rows="4" 
                      className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300 resize-none" 
                      placeholder="Tell us about yourself..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              {/* Social Links Section */}
              <div className="bg-[var(--background-color)] rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-[var(--text-color)] border-l-4 border-[var(--primary-color)] pl-4">Social Links</h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="socialLinks.linkedin" className="block text-[var(--text-color)] text-lg font-semibold mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      LinkedIn URL
                    </label>
                    <input 
                      type="url" 
                      id="socialLinks.linkedin" 
                      name="socialLinks.linkedin" 
                      value={userData.socialLinks?.linkedin || ''} 
                      onChange={handleChange} 
                      className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="socialLinks.github" className="block text-[var(--text-color)] text-lg font-semibold mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      GitHub URL
                    </label>
                    <input 
                      type="url" 
                      id="socialLinks.github" 
                      name="socialLinks.github" 
                      value={userData.socialLinks?.github || ''} 
                      onChange={handleChange} 
                      className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                      placeholder="https://github.com/username"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="socialLinks.twitter" className="block text-[var(--text-color)] text-lg font-semibold mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                      Twitter URL
                    </label>
                    <input 
                      type="url" 
                      id="socialLinks.twitter" 
                      name="socialLinks.twitter" 
                      value={userData.socialLinks?.twitter || ''} 
                      onChange={handleChange} 
                      className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="socialLinks.website" className="block text-[var(--text-color)] text-lg font-semibold mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                      Personal Website
                    </label>
                    <input 
                      type="url" 
                      id="socialLinks.website" 
                      name="socialLinks.website" 
                      value={userData.socialLinks?.website || ''} 
                      onChange={handleChange} 
                      className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center mt-8">
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;