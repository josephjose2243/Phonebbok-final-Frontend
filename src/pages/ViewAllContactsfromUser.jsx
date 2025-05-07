import { useState } from "react";
// change to View  all contacts
const ViewAllContactsfromUser = () => {

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Offline Useres</h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col items-center transition transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-16 h-16 rounded-full border-4 border-gray-300 mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
              <p className="text-gray-600">{user.phone}</p>
              <span
                className={`mt-2 px-4 py-1 text-sm font-semibold rounded-full border border-gray-400 shadow-md ${
                  user.status === "Online"
                    ? "bg-green-100 text-green-600 border-green-500"
                    : "bg-red-100 text-red-600 border-red-500"
                }`}
              >
                {user.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewAllContactsfromUser;
