// services/contactApi.js
import axios from './axios'; // ✅ Use your custom axios instance

const BASE_URL = '/contacts'; // Custom instance already includes baseURL

// ✅ Get all active contacts
export const getAllContacts = () => axios.get(BASE_URL);

// ✅ Move contact to trash
export const moveContactToTrash = (id) => axios.put(`${BASE_URL}/${id}/trash`);

// ✅ Get all trashed contacts
export const getTrashedContacts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trash`);
    return response;
  } catch (error) {
    console.error("Error fetching trashed contacts:", error);
    throw error;
  }
};

// ✅ Restore a trashed contact
export const restoreContact = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}/restore`);
    return response;
    console.log(response.data);
    
  } catch (error) {
    console.error("Error restoring contact:", error);
    throw error;
  }
};

// ✅ Permanently delete a trashed contact
export const permanentlyDeleteContact = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}/delete`);
    return response;
  } catch (error) {
    console.error("Error permanently deleting contact:", error);
    throw error;
  }
};


// Get contact by id

export const getContactById = async (id) => {
  try {
    const response = await axios.get(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contact by ID:", error);
    throw error;
  }
};

// update contact by id 
export const updateContactById = async (id, updatedData) => {
  try {
    const response = await axios.put(`/contacts/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
};