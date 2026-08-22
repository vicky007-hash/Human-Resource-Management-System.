import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null); 

    try {
      // Sending the email and password to the FastAPI backend
      const response = await fetch('http://localhost:8000/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      const data = await response.json();
      
      // Catch specific errors returned by Python (e.g., "Incorrect email or password")
      if (!response.ok) {
        throw new Error(data.detail || 'Authentication failed. Please try again.');
      }

      // Store the user session data so dashboard components know who is logged in
      localStorage.setItem('user_id', data.user_id);
      localStorage.setItem('role', data.role);

      // Securely route based on the exact role saved in the database
      if (data.role === 'HR') {
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

          {errorMessage && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
              {errorMessage}
            </div>
          )}

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
