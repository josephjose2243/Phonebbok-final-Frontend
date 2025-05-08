import axios from "axios";

// REGISTER USER

// REGISTER USER
export const registerUser = async (data) => {
  try {
    const response = await axios.post('/users/register', {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      confirmPassword:data.confirmPassword
    });
    return response; // Returning the response if registration is successful
  } catch (error) {
    if (error.response) {
      console.error('Error registering user:', error.response.data);
      throw new Error(error.response.data.message || 'Unknown error during registration');
    } else {
      console.error('Error registering user:', error.message);
      throw error;
    }
  }
};

// LOGIN USER
export const loginUser = async (data) => {
  try {
    const response = await axios.post("/login", data);
    return response;
  } catch (error) {
    if (error.response) {
      console.error("Error logging in user:", error.response.data);
      throw new Error(error.response.data.message || "Unknown login error");
    } else {
      console.error("Login error:", error.message);
      throw error;
    }
  }
};





