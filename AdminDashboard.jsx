import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      
      {/* Admin Dashboard Header */}
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Control Center</h1>
          <p className="text-slate-600 mt-1">Manage employees, approvals, and payroll.</p>
        </div>
        <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2 rounded-lg shadow-sm transition">
          Logout
        </button>
      </header>

      {/* Admin Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Employee List Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-400 transition cursor-pointer">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Employee List</h2>
          <p className="text-slate-500 text-sm">View and switch between all registered employee profiles.</p>
        </div>
        
        {/* Attendance Records Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-teal-400 transition cursor-pointer">
          <h2 className="text-xl font-semibold text-teal-800 mb-2">Attendance Records</h2>
          <p className="text-slate-500 text-sm">Monitor daily and weekly attendance across the organization.</p>
        </div>

        {/* Leave Approvals Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-400 transition cursor-pointer">
          <h2 className="text-xl font-semibold text-indigo-800 mb-2">Leave Approvals</h2>
          <p className="text-slate-500 text-sm">Review, approve, or reject pending employee time-off requests.</p>
        </div>
      </div>

      {/* Quick Approvals & Organization Alerts */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Pending Leave Approvals</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 text-sm uppercase">
                <th className="p-3 rounded-tl-lg">Employee</th>
                <th className="p-3">Type</th>
                <th className="p-3">Dates</th>
                <th className="p-3 rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="p-3 font-medium">EMP-1024 (John Doe)</td>
                <td className="p-3">Paid Leave</td>
                <td className="p-3">Oct 12 - Oct 14</td>
                <td className="p-3 flex space-x-2">
                  <button className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200">Approve</button>
                  <button className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200">Reject</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
