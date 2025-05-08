import axios from "./axios";

// Function to get the list of users with their online status
export const getAllUsersWithStatus = async (token) => {
    try {
      const response = await instance.get("/users/status", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Contains the list of users with status and current user info
    } catch (error) {
      console.error("Error fetching users with status:", error);
      throw error; // Throw the error to be caught by the calling function
    }
  };



  // Function to get the admin details
export const getAdminDetails = async () => {
    try {
      const response = await axios.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Get token from localStorage
        }
      });
      return response.data; // Return admin data
    } catch (error) {
      console.error('Error fetching admin:', error);
      throw error; // Rethrow error for handling in the component
    }
  };

// ✅ Logout API
// Example userLogout function
export const userLogout = async () => {
    try {
      const response = await axios.post("/api/user/logout");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Logout failed" };
    }
  };
