import { FaBars, FaUserCircle } from "react-icons/fa";
import { useState } from "react";

export default function Header({ sidebarOpen, setSidebarOpen }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="flex items-center justify-between bg-white shadow-md p-4">
      {/* Left - Sidebar Toggle Button */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
        <FaBars className="text-xl" />
      </button>

      {/* Center - Search Bar */}
      <input
        type="text"
        placeholder="Search users..."
        className="border px-3 py-1 rounded-md w-full max-w-md"
      />

      {/* Right - User Dropdown */}
      <div className="relative">
        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2">
          <FaUserCircle className="text-2xl" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md py-2">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">Profile</button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">Settings</button>
            <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200">Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}
