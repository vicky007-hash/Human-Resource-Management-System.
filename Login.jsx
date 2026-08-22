import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // State Management for inputs, loading status, and errors
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  
  const navigate = useNavigate();

  // Dynamically update state as the user types
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // API Integration Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null); // Clear previous errors

    try {
      // Future API connection to your Python backend
      /* 
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      */

      // Hackathon Simulation: Simulating a 1-second network request
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mocking the validation to display error messages as required
      if (!credentials.email.includes('@')) {
        throw new Error('Please enter a valid email address.');
      }

      // Route based on role: if 'admin' is in the email, go to Admin Dashboard
      if (credentials.email.includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/employee');
      }

    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 text-center">Dayflow HRMS</h1>
        <p className="text-gray-500 mb-8 text-sm text-center">Enter your credentials to continue</p>
        
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Error Message Display */}
          {errorMessage && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
              {errorMessage}
            </div>
          )}

          {/* Submit Button with Loading State */}
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full text-white font-medium py-3 rounded-lg transition shadow-sm ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
