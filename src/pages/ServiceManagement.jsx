import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getServices, createService, updateService, deleteService } from '../utils/api';

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    technologies: '',
    category: 'frontend'
  });
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await getServices();
      setServices(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to fetch services. Please try again.',
      });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serviceData = {
        ...newService,
        technologies: newService.technologies ? newService.technologies.split(',').map(tech => tech.trim()) : []
      };

      if (editingService) {
        await updateService(editingService._id, serviceData);
        Swal.fire({
          icon: 'success',
          title: 'Service Updated!',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        await createService(serviceData);
        Swal.fire({
          icon: 'success',
          title: 'Service Added!',
          showConfirmButton: false,
          timer: 1500
        });
      }
      fetchServices();
      resetForm();
    } catch (error) {
      console.error('Error saving service:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to save service. Please try again.',
      });
    }
  };

  const handleEdit = (service) => {
    setNewService({
      title: service.title,
      description: service.description,
      technologies: service.technologies ? service.technologies.join(', ') : '',
      category: service.category
    });
    setEditingService(service);
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
          await deleteService(id);
          fetchServices();
          Swal.fire(
            'Deleted!',
            'Your service has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting service:', error);
          Swal.fire(
            'Error!',
            'Failed to delete service. Please try again.',
            'error'
          );
        }
      }
    });
  };

  const resetForm = () => {
    setNewService({
      title: '',
      description: '',
      technologies: '',
      category: 'frontend'
    });
    setEditingService(null);
  };

  if (loading) {
    return <div className="text-center py-12 text-[var(--text-color)]">Loading services...</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-6 text-[var(--text-color)] animate__animated animate__fadeInDown">
          Service Management
        </h1>
        <p className="text-xl text-[var(--text-color)] max-w-3xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
          Add, edit, and manage your professional services
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-[var(--secondary-color)] p-8 rounded-2xl shadow-2xl backdrop-blur-sm bg-opacity-90 border border-[var(--primary-color)] border-opacity-20 mb-16 animate__animated animate__fadeInUp animate__delay-2s">
          <h2 className="text-2xl font-bold mb-6 text-[var(--text-color)] border-l-4 border-[var(--primary-color)] pl-4">
            {editingService ? 'Edit Service' : 'Add New Service'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label htmlFor="title" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Service Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                value={newService.title} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                placeholder="e.g., Frontend Development, MERN Stack Applications"
                required 
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="category" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Category</label>
              <select 
                id="category" 
                name="category" 
                value={newService.category} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300"
                required
              >
                <option value="frontend">Frontend Development</option>
                <option value="backend">Backend Development</option>
                <option value="database">Database Design</option>
                <option value="fullstack">Full Stack Applications</option>
                <option value="mobile">Mobile Development</option>
                <option value="devops">Deployment & DevOps</option>
              </select>
            </div>
            
            <div className="mb-6 md:col-span-2">
              <label htmlFor="description" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Description</label>
              <textarea 
                id="description" 
                name="description" 
                value={newService.description} 
                onChange={handleChange} 
                rows="4" 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300 resize-none" 
                placeholder="Describe the service you provide..."
                required
              ></textarea>
            </div>
            
            <div className="mb-6 md:col-span-2">
              <label htmlFor="technologies" className="block text-[var(--text-color)] text-lg font-semibold mb-2">Technologies (comma separated)</label>
              <input 
                type="text" 
                id="technologies" 
                name="technologies" 
                value={newService.technologies} 
                onChange={handleChange} 
                className="shadow-sm appearance-none border border-[var(--primary-color)] border-opacity-30 rounded-lg w-full py-3 px-4 bg-[var(--background-color)] text-[var(--text-color)] leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300" 
                placeholder="e.g., React, Node.js, MongoDB, Express"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-8">
            <button 
              type="submit" 
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {editingService ? 'Update Service' : 'Add Service'}
            </button>
            
            {editingService && (
              <button 
                type="button" 
                onClick={resetForm}
                className="ml-4 bg-[var(--secondary-color)] border-2 border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-[var(--text-color)] text-center animate__animated animate__fadeInDown">Current Services</h2>
          
          {services.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {services.map((service, index) => (
                <div 
                  key={service._id} 
                  className="bg-[var(--secondary-color)] rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-[1.02] border border-[var(--primary-color)] border-opacity-20 backdrop-blur-sm bg-opacity-80 animate__animated animate__fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--text-color)]">{service.title}</h3>
                      <p className="text-[var(--text-color)] text-lg mt-1 capitalize">{service.category.replace(/([A-Z])/g, ' $1').trim()}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(service)} 
                        className="p-2 rounded-full bg-[var(--background-color)] hover:bg-[var(--primary-color)] text-[var(--text-color)] hover:text-white transition duration-300"
                        aria-label="Edit service"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(service._id)} 
                        className="p-2 rounded-full bg-[var(--background-color)] hover:bg-red-500 text-[var(--text-color)] hover:text-white transition duration-300"
                        aria-label="Delete service"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-[var(--text-color)]">
                      {service.description}
                    </p>
                    {service.technologies && service.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {service.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-[var(--secondary-color)] rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[var(--primary-color)] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="text-2xl font-bold text-[var(--text-color)] mb-2">No Services Added Yet</h3>
                <p className="text-[var(--text-color)] mb-6">Add your first service using the form above</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceManagement;