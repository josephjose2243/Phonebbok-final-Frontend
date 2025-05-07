import React from 'react';
import { FaBars, FaUser, FaUsers, FaPhone, FaSignOutAlt, FaCog, FaChartLine, FaClock } from 'react-icons/fa';

const AdminSIdeBar = ({ sidebarOpen, setSidebarOpen }) => (
  <aside className={`fixed md:relative md:w-64 bg-gray-800 text-white p-5 h-full transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
    <h1 className="text-xl font-bold mb-6">Company Name</h1>
    <nav>
      <ul className="space-y-4">
        <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer"><FaUser /> Dashboard</li>
        <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer"><FaUsers /> Manage Users</li>
        <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer"><FaPhone /> Generate Numbers</li>
        <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer"><FaPhone /> Call Tracking</li>
      </ul>
    </nav>
  </aside>
);

export default AdminSIdeBar;
