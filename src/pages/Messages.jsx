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
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-[var(--text-color)]">Messages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message._id} className="bg-[var(--secondary-color)] rounded-lg shadow-lg p-8">
              <h4 className="text-xl font-bold mb-2 text-[var(--text-color)]">From: {message.senderName}</h4>
              <p className="text-[var(--text-color)] mb-1"><strong>Email:</strong> {message.senderEmail}</p>
              {message.subject && <p className="text-[var(--text-color)] mb-1"><strong>Subject:</strong> {message.subject}</p>}
              <p className="text-[var(--text-color)] mb-4"><strong>Message:</strong> {message.message}</p>
              <p className="text-sm text-[var(--text-color)]">Received: {new Date(message.createdAt).toLocaleString()}</p>
              <div className="flex justify-end mt-4">
                <button onClick={() => handleDelete(message._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
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
