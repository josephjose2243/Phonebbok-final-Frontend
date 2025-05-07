import axios from "./axios";

// REGISTER ADMIN
export const registerAdmin = async (data) => {
  try {
    const response = await axios.post("/auth/register", { ...data, role: "admin" });
    return response;
  } catch (error) {
    if (error.response) {
      console.error("Error registering admin:", error.response.data);
      throw new Error(error.response.data.message || "Unknown error during registration");
    } else {
      console.error("Error registering admin:", error.message);
      throw error;
    }
  }
};

// LOGIN ADMIN
export const loginAdmin = async (data) => {
  try {
    const response = await axios.post("/auth/login", data);
    return response;
  } catch (error) {
    if (error.response) {
      console.error("Error logging in admin:", error.response.data);
      throw new Error(error.response.data.message || "Unknown error during login");
    } else {
      console.error("Error logging in admin:", error.message);
      throw error;
    }
  }
};

// REGISTER USER
export const registerUser = async (data) => {
  try {
    const response = await axios.post("/auth/register", {
      ...data,
      role: "user",
    });
    return response;
  } catch (error) {
    if (error.response) {
      console.error("Error registering user:", error.response.data);
      throw new Error(error.response.data.message || "Unknown error during registration");
    } else {
      console.error("Error registering user:", error.message);
      throw error;
    }
  }
};
