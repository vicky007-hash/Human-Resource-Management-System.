import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all your finished components
import EmployeeDashboard from './Employeedashboard'; 
import AdminDashboard from './AdminDashboard';
import LeaveApplication from './LeaveApplication';
import Login from './Login'; // <-- Your new import is here!

const App = () => {
  return (
    <Router>
      <Routes>
        {/* The default root path now loads your real Login component */}
        <Route path="/" element={<Login />} />
        
        {/* Secure dashboard routes */}
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/leave" element={<LeaveApplication />} />
      </Routes>
    </Router>
  );
};

export default App;
