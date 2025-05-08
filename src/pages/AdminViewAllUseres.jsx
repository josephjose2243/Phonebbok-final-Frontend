import { useEffect, useState } from "react";
import { FaBars, FaUser, FaUsers, FaPhone, FaSignOutAlt, FaCog, FaBell } from "react-icons/fa";
import axios from "axios"; // Added axios import
import * as jwtDecode from "jwt-decode";

const AdminViewAllUsers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userList, setUserList] = useState([]); // Renamed to userList
  const [currentUserId, setCurrentUserId] = useState(""); // current user ID from token
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState(""); // State for current admin name
  const pendingApprovals = 5;
  const newUserLogins = 3;

  // Fetch all users and their statuses
  const fetchUserStatus = async () => {
    try {
      const response = await axios.get('/auth/allusers');
      console.log(response.data);  // Log the data to inspect its structure
  
      if (Array.isArray(response.data)) {
        setUserList(response.data);  // Set user data to userList state
        setLoading(false);  // Stop loading once data is fetched
      } else {
        console.error('User status data is not in expected format');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching user status:', error);
      setLoading(false);
    }
  };

  // Fetch current admin details
  const fetchCurrentAdmin = async () => {
    try {
      const response = await axios.get('/auth/me');
      setAdminName(response.data.name);
    } catch (error) {
      console.error('Error fetching admin:', error);
    }
  };

  // Decode the JWT token to extract the current user ID
  const fetchCurrentUserId = () => {
    const token = localStorage.getItem("authToken"); // Ensure the token is stored in localStorage
    if (token) {
      const decodedToken = jwtDecode(token);
      setCurrentUserId(decodedToken.id);  // Set the current user's ID from the decoded token
    }
  };

  useEffect(() => {
    fetchUserStatus(); // Fetch user status
    fetchCurrentAdmin(); // Fetch current admin name
    fetchCurrentUserId(); // Fetch current user ID from token
  }, []);
  
  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`fixed md:relative md:w-64 bg-gray-800 text-white p-5 h-full transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <h1 className="text-xl font-bold mb-6">Company Name</h1>
        <nav>
          <ul className="space-y-4">
            <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
              <FaUser /> Dashboard
            </li>
            <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
              <FaUsers /> Manage Users
            </li>
            <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
              <FaPhone /> Generate Numbers
            </li>
            <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
              <FaPhone /> Call Tracking
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-auto p-6">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2"
          >
            <FaBars className="text-xl" />
          </button>
          <div className="ml-auto flex items-center gap-4 relative">
            <span className="text-lg font-semibold">Welcome, {adminName}</span>

            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2"
              >
                <FaBell className="text-xl text-red-500" title="Notifications" />
                {pendingApprovals + newUserLogins > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {pendingApprovals + newUserLogins}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-3 text-gray-800">
                  <p>📌 {pendingApprovals} Pending Approvals</p>
                  <p>👤 {newUserLogins} New User Logins</p>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="p-2 bg-gray-200 rounded-md flex items-center gap-2"
              >
                <FaUser className="text-xl" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                  <ul>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                      <FaUser /> Profile
                    </li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                      <FaCog /> Settings
                    </li>
                    <li className="p-2 hover:bg-red-100 cursor-pointer flex items-center gap-2 text-red-600">
                      <FaSignOutAlt /> Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">View All Users</h3>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
                <thead className="bg-blue-200 text-gray-800">
                  <tr>
                    <th className="py-3 px-6 text-left text-sm font-semibold border-r border-gray-300">
                      User
                    </th>
                    <th className="py-3 px-6 text-left text-sm font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userList.length > 0 ? (
                    userList.map((user, index) => (
                      <tr key={user.id || index} className="border-b transition hover:bg-blue-100">
                        <td className="py-3 px-6 flex items-center gap-3 font-medium text-gray-800 border-r border-gray-300 bg-blue-100">
                          <span className="text-lg">👤</span>
                          {user.firstName || user.name} {user.lastName && ` ${user.lastName}`} 
                          {user.role === "admin" && "(Admin)"}
                          {user.id === currentUserId && user.status === "Online" && " - You"}
                        </td>

                        <td className="py-3 px-6 bg-blue-100">
                          <span
                            className={`px-4 py-1 text-white text-sm font-semibold rounded-lg shadow-md ${
                              user.status === "Online" ? "bg-green-500" : "bg-red-500"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center py-4 text-gray-600">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminViewAllUsers;
