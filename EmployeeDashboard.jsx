import React from 'react';

const EmployeeDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      
      {/* Dashboard Header */}
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
          <p className="text-gray-600 mt-1">Every workday, perfectly aligned.</p>
        </div>
        <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2 rounded-lg shadow-sm transition">
          Logout
        </button>
      </header>

      {/* Quick-Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition cursor-pointer">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Profile</h2>
          <p className="text-gray-500 text-sm">View personal details, job details, and salary structure.</p>
        </div>
        
        {/* Attendance Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-green-300 transition cursor-pointer">
          <h2 className="text-xl font-semibold text-green-700 mb-2">Attendance</h2>
          <p className="text-gray-500 text-sm">Track daily/weekly views and manage check-in/check-out.</p>
        </div>

        {/* Leave Requests Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-purple-300 transition cursor-pointer">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Leave Requests</h2>
          <p className="text-gray-500 text-sm">Apply for time-off and track your pending approval status.</p>
        </div>
      </div>

      {/* Recent Activity / Alerts */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activity & Alerts</h2>
        <ul className="space-y-3">
          <li className="flex items-center text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-3"></span>
            Attendance marked: Present (Today, 09:00 AM)
          </li>
          <li className="flex items-center text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full mr-3"></span>
            Leave Request: Sick Leave (Pending Approval)
          </li>
        </ul>
      </div>

    </div>
  );
};

export default EmployeeDashboard;
