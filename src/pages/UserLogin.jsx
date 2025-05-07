import React, { useState } from "react";
import { loginUser, registerUser } from "../services/userAuthApi"; // Don't forget to import registerUser
import { useNavigate } from "react-router-dom"; // Import useNavigate

const UserLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    // Check if passwords match
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Basic form validation
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await registerUser({
        ...form,
        role: "user",
      });
      alert(res.data.message);
      setIsLogin(true); // Switch to login after registration
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const handleLogin = async () => {
    // Basic form validation
    if (!form.email || !form.password) {
      alert("Email and password are required");
      return;
    }

    try {
      const res = await loginUser({
        email: form.email,
        password: form.password,
      });
      console.log("Login successful:", res.data); // Log the response
      localStorage.setItem("token", res.data.token); // Store token in localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user)); // Store user data

      alert("Login successful");

      // Use navigate for redirection
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (err) {
      console.error("Login failed:", err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "User Login" : "User Registration"}
        </h2>

        {isLogin ? (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 mb-2 border rounded"
              onChange={handleChange}
              value={form.email}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border rounded"
              onChange={handleChange}
              value={form.password}
            />
            <button
              className="w-full bg-green-600 text-white p-2 rounded mb-2"
              onClick={handleLogin}
            >
              Login
            </button>
            <p className="text-center mt-2 text-sm">
              Don’t have an account?
              <button
                className="text-blue-600 underline ml-1"
                onClick={() => setIsLogin(false)} // Switch to registration
              >
                Register
              </button>
            </p>
          </>
        ) : (
          <>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-full p-2 mb-2 border rounded"
              onChange={handleChange}
              value={form.firstName}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full p-2 mb-2 border rounded"
              onChange={handleChange}
              value={form.lastName}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 mb-2 border rounded"
              onChange={handleChange}
              value={form.email}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 mb-2 border rounded"
              onChange={handleChange}
              value={form.password}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-2 mb-4 border rounded"
              onChange={handleChange}
              value={form.confirmPassword}
            />
            <button
              className="w-full bg-blue-600 text-white p-2 rounded mb-2"
              onClick={handleRegister}
            >
              Register
            </button>
            <p className="text-center mt-2 text-sm">
              Already have an account?
              <button
                className="text-blue-600 underline ml-1"
                onClick={() => setIsLogin(true)} // Switch to login
              >
                Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default UserLogin;
