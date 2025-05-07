import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdContacts } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import SideBar from "../Components/SideBar";
import{userLogout} from"../services/UserApi"

const Button = ({ children, onClick, disabled }) => (
  <button
    className={`px-4 py-2 rounded-md text-white ${disabled ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token || !storedUser) {
      navigate("/userlogin");  // Redirect to login page if not logged in
    } else {
      setUserInfo(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      // Log the user out from the backend
      await userLogout(token);
    } catch (err) {
      console.error("Logout error:", err);
    }

    // Clear user and token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to the login page
    navigate("/userlogin");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 fixed h-full">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 overflow-auto">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="flex items-center bg-white p-2 rounded-md shadow-md w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <FaRegUserCircle size={28} className="text-gray-700" />
            {userInfo && (
              <span className="text-sm text-gray-700">
                {userInfo.fullName} ({userInfo.role})
              </span>
            )}
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            onClick={() => navigate("/allcontacts")}
            className="cursor-pointer bg-white p-4 rounded-lg shadow-md flex items-center gap-4"
          >
            <IoMdContacts size={32} className="text-blue-500" />
            <div>
              <p className="text-gray-500">Total Contacts</p>
              <h3 className="text-xl font-semibold">120</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
