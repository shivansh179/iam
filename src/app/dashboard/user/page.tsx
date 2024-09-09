"use client";

import UserPanel from "../../Components/UserPanel";

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-6 text-white">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">User Dashboard</h1>
      </header>
      <UserPanel />
    </div>
  );
};

export default UserDashboard;
