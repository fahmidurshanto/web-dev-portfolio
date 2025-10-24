import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getMessages, deleteMessage } from '../utils/api';

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await getMessages();
      setMessages(response.data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to fetch messages. Please try again.',
      });
    }
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
          await deleteMessage(id);
          fetchMessages(); // Refresh the list
          Swal.fire(
            'Deleted!',
            'Your message has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting message:', error);
          Swal.fire(
            'Error!',
            'Failed to delete message. Please try again.',
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
          Messages
        </h1>
        <p className="text-xl text-[var(--text-color)] max-w-3xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
          View and manage messages sent through your contact form
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto">
        {messages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {messages.map((message, index) => (
              <div 
                key={message._id} 
                className="bg-[var(--secondary-color)] rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-[1.02] border border-[var(--primary-color)] border-opacity-20 backdrop-blur-sm bg-opacity-80 animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-color)] flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[var(--primary-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {message.senderName}
                    </h3>
                    <p className="text-[var(--text-color)] flex items-center mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[var(--primary-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {message.senderEmail}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleDelete(message._id)} 
                    className="p-2 rounded-full bg-[var(--background-color)] hover:bg-red-500 text-[var(--text-color)] hover:text-white transition duration-300"
                    aria-label="Delete message"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                {message.subject && (
                  <div className="mb-4">
                    <p className="text-[var(--text-color)] font-semibold flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[var(--primary-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      {message.subject}
                    </p>
                  </div>
                )}
                
                <div className="mb-4">
                  <p className="text-[var(--text-color)] whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-[var(--primary-color)] border-opacity-20">
                  <p className="text-sm text-[var(--text-color)] flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[var(--primary-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                  <button 
                    onClick={() => {
                      const mailtoLink = `mailto:${message.senderEmail}`;
                      window.open(mailtoLink, '_blank');
                    }}
                    className="flex items-center text-[var(--primary-color)] hover:text-[var(--primary-color)] font-semibold transition duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-[var(--secondary-color)] rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-[var(--primary-color)] mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <h3 className="text-2xl font-bold text-[var(--text-color)] mb-4">No Messages Yet</h3>
              <p className="text-[var(--text-color)] mb-6">Messages sent through your contact form will appear here</p>
              <a 
                href="/#contact" 
                className="inline-block bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg transform hover:scale-105"
              >
                Go to Contact Section
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;