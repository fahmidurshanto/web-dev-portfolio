import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import Swal from 'sweetalert2';

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const storedMessages = await localforage.getItem('contactMessages');
      if (storedMessages) {
        setMessages(storedMessages);
      }
    };
    fetchMessages();
  }, []);

  const handleDelete = async (idToDelete) => {
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
        const updatedMessages = messages.filter(
          (message) => message.id !== idToDelete
        );
        setMessages(updatedMessages);
        await localforage.setItem('contactMessages', updatedMessages);
        Swal.fire(
          'Deleted!',
          'Your message has been deleted.',
          'success'
        );
      }
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-[var(--text-color)]">Messages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message.id} className="bg-[var(--secondary-color)] rounded-lg shadow-lg p-8">
              <h4 className="text-xl font-bold mb-2 text-[var(--text-color)]">From: {message.name}</h4>
              <p className="text-[var(--text-color)] mb-1"><strong>Email:</strong> {message.email}</p>
              <p className="text-[var(--text-color)] mb-4"><strong>Message:</strong> {message.message}</p>
              <p className="text-sm text-[var(--text-color)]">Received: {message.timestamp}</p>
              <div className="flex justify-end mt-4">
                <button onClick={() => handleDelete(message.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-[var(--text-color)] text-lg">No messages yet.</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
