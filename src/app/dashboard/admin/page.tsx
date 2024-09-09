"use client";

import AdminPanel from "../../Components/AdminPanel";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-green-600 p-6 text-white">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
      </header>
      <AdminPanel />
    </div>
  );
};

export default AdminDashboard;
