import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideBar from '../Components/SideBar';

const NewContact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumbers: [{ number: '' }],
    company: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (index, e) => {
    const { value } = e.target;
    const updatedPhoneNumbers = [...formData.phoneNumbers];
    updatedPhoneNumbers[index].number = value;
    setFormData((prevData) => ({
      ...prevData,
      phoneNumbers: updatedPhoneNumbers,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      formData.phoneNumbers.length === 0 ||
      !formData.phoneNumbers[0].number.trim()
    ) {
      alert('First name, last name, and at least one phone number are required.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/contacts', formData);
      console.log('Contact created:', res.data);
      navigate('/allcontacts');
    } catch (error) {
      console.error('Error creating contact:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <>
      <SideBar />
      <div className="ml-[264px] p-6 bg-gray-100 min-h-screen">
        <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-6">Add New Contact</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
            <div className="mt-4">
              <label className="block font-medium mb-1">Phone Number</label>
              {formData.phoneNumbers.map((phone, index) => (
                <input
                  key={index}
                  type="tel"
                  value={phone.number}
                  onChange={(e) => handlePhoneChange(index, e)}
                  className="w-full border px-4 py-2 rounded-md mb-2"
                  required
                />
              ))}
            </div>
            <div className="mt-4">
              <label className="block font-medium mb-1">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Add Contact
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewContact;
