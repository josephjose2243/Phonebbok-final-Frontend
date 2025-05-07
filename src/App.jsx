import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
// new
// Importing components from pages folder

// Admin
import AdminDashboard from './pages/AdminDashboard';
import AdminAuth from './pages/AdminAuth';
import AdminViewAllContact from './pages/AdminViewAllContact';
import AdminViewAllUseres from './pages/AdminViewAllUseres';

// User
import AllContact from './pages/AllContact';
import Dashboard from './pages/Dashboard';
 
import TrashPage from './pages/TrashPage';
import NewContact from './pages/NewContact';
import UserLogin from './pages/UserLogin';
import AdminTrashPage from './pages/AdminTrashPage';
import EditPageone from './pages/EditPageone';

function App() {
  return (
    <>
      <div className="flex flex-col">
        <Routes>
          {/* Main Routing */}
          <Route path="/" element={<AdminAuth />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/allcontacts" element={<AllContact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Handle dynamic ID for EditPage */}
          <Route path="/editpage/:id" element={<EditPageone />} /> {/* Added dynamic path */}

          <Route path="/trash" element={<TrashPage />} />
          <Route path="/newcontact" element={<NewContact />} />

          {/* Admin Routing */}
          <Route path="/admin/dashboard/admin/login/user" element={<AdminViewAllUseres />} />
          <Route path="/admin/viewallcontact" element={<AdminViewAllContact />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/trashpage" element={<AdminTrashPage />} />

        </Routes>
      </div>
    </>
  );
}

export default App;
