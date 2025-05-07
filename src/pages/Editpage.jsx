// EditPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUser, FaBuilding, FaEnvelope, FaPhone, FaPlus } from "react-icons/fa";
import SideBar from "../Components/SideBar";
import { getContactById, updateContactById } from "../services/contactApi";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    name: '',
    company: '',
    email: '',  // Email is optional
    phones: [''],  // Phones is optional
  });

  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getContactById(id);
        if (result) {
          setContact({
            ...result,
            phones: result.phones && result.phones.length > 0 ? result.phones : ['']
          });
        } else {
          setError("Contact not found");
        }
      } catch (error) {
        console.error(error);
        setError("Error fetching contact data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (index, value) => {
    const newPhones = [...contact.phones];
    newPhones[index] = value;
    setContact((prev) => ({
      ...prev,
      phones: newPhones
    }));
  };

  const addPhoneField = () => {
    setContact((prev) => ({
      ...prev,
      phones: [...prev.phones, '']
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError("");
    setSuccess("");

    try {
      await updateContactById(id, contact);
      setSuccess("Contact updated successfully!");
      setTimeout(() => navigate("/allcontacts", { state: { updated: true } }), 1000);
    } catch (error) {
      setError("Update failed. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SideBar />
      <div className="ml-64 p-6 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center space-y-4 mb-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <FaUser className="text-gray-400 text-4xl" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">{contact?.name || "Edit Contact"}</h2>
              <button
                type="submit"
                className={`mt-1 px-3 py-1 rounded-md text-white ${updating ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"}`}
                disabled={updating}
              >
                {updating ? "Saving..." : "Save"}
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              {success && <p className="text-green-600 mt-2">{success}</p>}
            </div>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-gray-500" />
                    <input
                      type="text"
                      name="name"
                      value={contact.name}
                      onChange={handleChange}
                      className="border p-2 w-full rounded-md"
                      placeholder="Name"
                      required
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <FaBuilding className="text-gray-500" />
                    <input
                      type="text"
                      name="company"
                      value={contact.company}
                      onChange={handleChange}
                      className="border p-2 w-full rounded-md"
                      placeholder="Company"
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <FaEnvelope className="text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      value={contact.email}
                      onChange={handleChange}
                      className="border p-2 w-full rounded-md"
                      placeholder="Email (Optional)"
                    />
                  </div>
                </td>
              </tr>

              {contact.phones.map((phone, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <FaPhone className="text-gray-500" />
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => handlePhoneChange(index, e.target.value)}
                        className="border p-2 w-full rounded-md"
                        placeholder={`Phone ${index + 1}`}
                      />
                    </div>
                  </td>
                </tr>
              ))}

              <tr>
                <td className="px-6 py-2">
                  <button
                    type="button"
                    onClick={addPhoneField}
                    className="flex items-center text-blue-500 hover:underline"
                  >
                    <FaPlus className="mr-1" /> Add Another Phone
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
};

export default EditPage;
