import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineBook,
  AiOutlineContacts,
  AiOutlineUserAdd,
  AiOutlineDelete,
} from "react-icons/ai";

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-gray-50 dark:bg-gray-800"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <li>
            <button
              onClick={() => navigate("/")}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full text-left"
            >
              <AiOutlineBook className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ms-3">Phone Book</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => navigate("/newcontact")}
              className="flex items-center justify-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full"
            >
              <AiOutlineUserAdd className="inline w-6 h-6 font-bold me-2" /> New Contact +
            </button>
          </li>

          <li>
            <button
              onClick={() => navigate("/allcontacts")}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full text-left"
            >
              <AiOutlineContacts className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ms-3 whitespace-nowrap">All Contacts</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => navigate("/trash")}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full text-left"
            >
              <AiOutlineDelete className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ms-3 whitespace-nowrap">Trash</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
