import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importing the dashboard components you just created
// Note: Ensure the file paths exactly match your GitHub repository filenames
import EmployeeDashboard from './Employeedashboard'; 
import AdminDashboard from './AdminDashboard';

// A temporary login screen to simulate the Sign In flow for the hackathon
const LoginPlaceholder = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 w-96 text-center">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Dayflow HRMS</h1>
        <p className="text-gray-500 mb-8 text-sm">Secure Authentication Prototype</p>
        
        <div className="flex flex-col space-y-4">
          <Link 
            to="/employee" 
            className="bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
          >
            Simulate Employee Login
          </Link>
          
          <Link 
            to="/admin" 
            className="bg-slate-800 text-white font-medium py-2 rounded-lg hover:bg-slate-900 transition shadow-sm"
          >
            Simulate Admin / HR Login
          </Link>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* The default root path loads the Login screen */}
        <Route path="/" element={<LoginPlaceholder />} />
        
        {/* Secure dashboard routes */}
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
