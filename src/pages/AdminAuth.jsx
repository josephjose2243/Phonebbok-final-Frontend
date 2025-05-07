import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { loginAdmin, registerAdmin } from "../services/adminAuthApi";

const AdminAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await registerAdmin({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });
      alert(res.data.message || "Registration successful");
      setIsLogin(true);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await loginAdmin({
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      if (res.data.admin) {
        const fullName = `${res.data.admin.firstName} ${res.data.admin.lastName}`;
        localStorage.setItem("adminName", fullName);
      }

      alert("Login successful");
      navigate("/admin/dashboard"); // ✅ React-friendly redirect

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Admin Login" : "Admin Registration"}
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
                onClick={() => setIsLogin(false)}
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
              className="w-full p-2 mb-2 border rounded"
              onChange={handleChange}
              value={form.confirmPassword}
            />
            <button
              className="w-full bg-green-600 text-white p-2 rounded mb-2"
              onClick={handleRegister}
            >
              Register
            </button>
            <p className="text-center mt-2 text-sm">
              Already registered?
              <button
                className="text-blue-600 underline ml-1"
                onClick={() => setIsLogin(true)}
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

export default AdminAuth;
