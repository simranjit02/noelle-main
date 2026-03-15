import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");

    if (!isLoggedIn || !userId) {
      navigate("/login");
      return;
    }

    setUser({
      id: userId,
      name: userName,
      email: userEmail,
    });
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isLoggedIn");

    // Redirect to login
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#593735] to-[#3d2423] flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#593735] to-[#3d2423]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition"
            >
              Logout
            </button>
          </div>

          {/* User Info Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-[#593735] mb-6">
              Welcome, {user?.name}!
            </h2>

            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="text-gray-600 text-sm font-semibold">User ID</p>
                <p className="text-gray-900 text-lg">{user?.id}</p>
              </div>

              <div className="border-b pb-4">
                <p className="text-gray-600 text-sm font-semibold">Full Name</p>
                <p className="text-gray-900 text-lg">{user?.name}</p>
              </div>

              <div className="border-b pb-4">
                <p className="text-gray-600 text-sm font-semibold">
                  Email Address
                </p>
                <p className="text-gray-900 text-lg">{user?.email}</p>
              </div>

              <div className="pb-4">
                <p className="text-gray-600 text-sm font-semibold">
                  Login Status
                </p>
                <p className="text-green-600 text-lg font-bold">✓ Logged In</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-[#593735] mb-4">
              Quick Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/"
                className="bg-[#593735] hover:bg-[#3d2423] text-white font-bold py-3 px-6 rounded text-center transition"
              >
                Back to Home
              </a>
              <a
                href="/AllMakeup"
                className="bg-[#593735] hover:bg-[#3d2423] text-white font-bold py-3 px-6 rounded text-center transition"
              >
                Shop Now
              </a>
            </div>
          </div>

          {/* Session Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
            <p className="text-yellow-800 text-sm">
              <strong>Note:</strong> Your session is stored in localStorage.
              Clearing browser data will log you out.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
