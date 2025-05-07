import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import SideBar from '../Components/SideBar';
import { getAllContacts, moveContactToTrash } from '../services/contactApi';
import { useNavigate, useLocation } from 'react-router-dom';

const AllContact = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchContacts = async () => {
    try {
      const res = await getAllContacts();
      if (Array.isArray(res.data.data)) {
        setContacts(res.data.data);
      } else {
        console.error('Error: Contacts data is not an array.');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (location.state?.updated) {
      fetchContacts();
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleMoveToTrash = async (id) => {
    try {
      const res = await moveContactToTrash(id);
      if (res.data.success) {
        const updatedContacts = contacts.filter(contact => contact._id !== id);
        setContacts(updatedContacts);
        alert('Contact moved to trash successfully!');
      } else {
        alert('Failed to move contact to trash.');
      }
    } catch (error) {
      console.error('Error moving contact to trash:', error);
      alert('Failed to move contact to trash.');
    }
  };

  const handleEditContact = (contact) => {
    navigate(`/editpage/${contact._id}`);
  };

  return (
    <>
      <SideBar />
      <div className="p-6 bg-gray-100 min-h-screen ml-[264px]">
        <div className="bg-white shadow-md rounded-lg p-5">
          <h2 className="text-2xl font-semibold mb-4">Contacts ({contacts.length})</h2>

          <div className="grid grid-cols-6 text-gray-600 font-medium border-b pb-2">
            <span>Name</span>
            <span>Email</span>
            <span>Phone Number</span>
            <span>Company</span>
            <span>Edit</span>
            <span>Delete</span>
          </div>

          <div className="mt-4">
            {Array.isArray(contacts) && contacts.length > 0 ? (
              contacts.map((contact, index) => (
                <div
                  key={index}
                  className="grid grid-cols-6 items-center py-2 border-b hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center text-white font-bold rounded-full bg-blue-500">
                      {contact.name?.charAt(0).toUpperCase()}
                    </div>
                    <span>{contact.name}</span>
                  </div>
                  <span>{contact.email || '-'}</span>
                  <span>{contact.phone || '-'}</span>
                  <span>{contact.company || '-'}</span>
                  <button
                    className="bg-blue-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-700 transition duration-200"
                    onClick={() => handleEditContact(contact)}
                  >
                    <FaEdit size={14} className="text-white" />
                  </button>
                  <button
                    className="bg-red-500 w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-600 transition duration-200"
                    onClick={() => handleMoveToTrash(contact._id)}
                  >
                    <FaTrash size={14} className="text-white" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No contacts found.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllContact;
