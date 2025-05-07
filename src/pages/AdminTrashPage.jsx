import React, { useEffect, useState } from 'react';

import { FaTrashAlt, FaUndo, FaUser, FaUsers, FaUserSlash } from 'react-icons/fa'; 
import { getTrashedContacts, restoreContact, permanentlyDeleteContact } from '../services/contactApi';

const AdminTrashPage = () => {
  const [trashedContacts, setTrashedContacts] = useState([]);

  // Fetch trashed contacts
  useEffect(() => {
    const fetchTrashedContacts = async () => {
      try {
        // Fetch trashed contacts
        const res = await getTrashedContacts();
        if (res.data.success) {
          setTrashedContacts(res.data.data);
        } else {
          console.error('Failed to fetch trashed contacts.');
        }
      } catch (error) {
        console.error('Error fetching trashed contacts:', error);
      }
    };

    fetchTrashedContacts();
  }, []);

  // Restore contact
  const handleRestore = async (id) => {
    try {
      const res = await restoreContact(id);
      if (res.data.success) {
        // Remove restored contact from trashed contacts list
        setTrashedContacts(trashedContacts.filter(contact => contact._id !== id));
        alert('Contact restored successfully!');
      } else {
        alert('Failed to restore contact.');
      }
    } catch (error) {
      console.error('Error restoring contact:', error);
      alert('Failed to restore contact.');
    }
  };

  // Permanently delete contact
  const handleDelete = async (id) => {
    try {
      const res = await permanentlyDeleteContact(id); // Ensure this matches your API route for deletion
      if (res.data.success) {
        // Remove deleted contact from trashed contacts list
        setTrashedContacts(trashedContacts.filter(contact => contact._id !== id));
        alert('Contact permanently deleted!');
      } else {
        alert('Failed to permanently delete contact.');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Failed to delete contact.');
    }
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className={`fixed md:relative md:w-64 bg-gray-800 text-white p-5 h-full transition-transform`}>
          <h1 className="text-xl font-bold mb-6">Phone Book</h1>
          <nav>
            <ul className="space-y-4">
              <li onClick={() => handleNavigation('/admin/dashboard')} className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
                <FaUser /> Dashboard
              </li>
              <li onClick={() => handleNavigation('/admin/login/user')} className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
                <FaUsers /> Logged-in Users
              </li>
              <li onClick={() => handleNavigation('/admin/offlineuseres')} className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
                <FaUserSlash /> Offline Users
              </li>
            </ul>
          </nav>
        </aside>
   
        <div className="p-6 bg-gray-100 min-h-screen ml-[264px]">
          <div className="bg-white shadow-md rounded-lg p-5">
            <h2 className="text-2xl font-semibold mb-4">Trashed Contacts ({trashedContacts.length})</h2>
            <div className="grid grid-cols-5 text-gray-600 font-medium border-b pb-2">
              <span>Name</span>
              <span>Email</span>
              <span>Phone Number</span>
              <span>Company</span>
              <span>Actions</span>
            </div>
            <div className="mt-4">
              {trashedContacts.length > 0 ? (
                trashedContacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="grid grid-cols-5 items-center py-2 border-b hover:bg-gray-50"
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
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleRestore(contact._id)}
                        className="bg-green-500 w-8 h-8 flex items-center justify-center rounded-full hover:bg-green-600"
                      >
                        <FaUndo size={14} className="text-white" />
                      </button>
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="bg-red-500 w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-600"
                      >
                        <FaTrashAlt size={14} className="text-white" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">No trashed contacts found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTrashPage;
