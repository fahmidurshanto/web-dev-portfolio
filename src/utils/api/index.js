import axios from 'axios';

const API = axios.create({ baseURL: 'https://fahmidurshanto-backend-alpha.vercel.app/api' }); // Adjust the baseURL to your backend server address

// Interceptor to add token to headers (if you implement authentication)
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

// General purpose data fetching function
export const fetchData = async (endpoint) => {
  try {
    const response = await API.get(`/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

// Certification routes
export const getCertifications = () => API.get('/certifications');
export const createCertification = (newCertification) => API.post('/certifications', newCertification);
export const updateCertification = (id, updatedCertification) => API.patch(`/certifications/${id}`, updatedCertification);
export const deleteCertification = (id) => API.delete(`/certifications/${id}`);

// Education routes
export const getEducation = () => API.get('/education');
export const createEducation = (newEducation) => API.post('/education', newEducation);
export const updateEducation = (id, updatedEducation) => API.patch(`/education/${id}`, updatedEducation);
export const deleteEducation = (id) => API.delete(`/education/${id}`);

// Experience routes
export const getExperiences = () => API.get('/experiences');
export const createExperience = (newExperience) => API.post('/experiences', newExperience);
export const updateExperience = (id, updatedExperience) => API.patch(`/experiences/${id}`, updatedExperience);
export const deleteExperience = (id) => API.delete(`/experiences/${id}`);

// Message routes
export const getMessages = () => API.get('/messages');
export const createMessage = (newMessage) => API.post('/messages', newMessage);
export const updateMessage = (id, updatedMessage) => API.patch(`/messages/${id}`, updatedMessage);
export const deleteMessage = (id) => API.delete(`/messages/${id}`);

// Project routes
export const getProjects = () => API.get('/projects');
export const createProject = (newProject) => API.post('/projects', newProject);
export const updateProject = (id, updatedProject) => API.patch(`/projects/${id}`, updatedProject);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

// Skill routes
export const getSkills = () => API.get('/skills');
export const createSkill = (newSkill) => API.post('/skills', newSkill);
export const updateSkill = (id, updatedSkill) => API.patch(`/skills/${id}`, updatedSkill);
export const deleteSkill = (id) => API.delete(`/skills/${id}`);

// User routes
export const getUsers = () => API.get('/users');
export const getUser = (id) => API.get(`/users/${id}`);
export const createUser = (newUser) => API.post('/users', newUser);
export const updateUser = (id, updatedUser) => API.patch(`/users/${id}`, updatedUser);
export const deleteUser = (id) => API.delete(`/users/${id}`);