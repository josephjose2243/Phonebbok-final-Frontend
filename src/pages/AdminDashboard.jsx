import { useState, useEffect } from "react";
import { FaBars, FaUser, FaUsers, FaPhone, FaUserCheck, FaUserSlash, FaTrash } from "react-icons/fa";
import { MdFormatListNumbered } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState(""); // State to hold the admin name
  const navigate = useNavigate();

  useEffect(() => {
    // Get admin's name from localStorage
    const storedAdminName = localStorage.getItem("adminName");
    if (storedAdminName) {
      setAdminName(storedAdminName); // Set admin name in state if found in localStorage
    }
  }, []); // Empty dependency array to run this effect only once

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed md:relative md:w-64 bg-gray-800 text-white p-5 h-full transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <h1 className="text-xl font-bold mb-6">
          <Link to="/admin/dashboard" className="text-white hover:underline">
            Phone Book
          </Link>
        </h1>
        <nav>
          <ul className="space-y-4">
            <li onClick={() => handleNavigation('/admin/dashboard')} className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
              <FaUser /> Dashboard
            </li>
            {/* Add more sidebar items as needed */}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto p-6">
        <div className="flex justify-between items-center">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2">
            <FaBars className="text-xl" />
          </button>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-lg font-semibold">Welcome, {adminName || "Admin"}</span>
          </div>
        </div>

        {/* Dashboard Cards */}
        <h2 className="text-2xl font-bold mt-4">Admin Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* View All Users */}
          

          {/* View All Contacts */}
          <div onClick={() => handleNavigation('/admin/viewallcontact')} className="bg-white p-4 shadow rounded-lg flex items-center gap-4 cursor-pointer">
            <MdFormatListNumbered className="text-red-500 text-3xl" />
            <div>
              <h3 className="text-lg font-semibold">All Contacts From Users</h3>
              <p className="text-gray-600">30</p>
              <p className="text-gray-600">View all numbers saved by users</p>
            </div>
          </div>

          {/* Trash Page */}
          <div onClick={() => handleNavigation('/admin/trashpage')} className="bg-white p-4 shadow rounded-lg flex items-center gap-4 cursor-pointer">
            <FaTrash className="text-red-500 text-3xl" />
            <div>
              <h3 className="text-lg font-semibold">Trash Page</h3>
              <p className="text-gray-600">30</p>
              <p className="text-gray-600">View deleted numbers from users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
