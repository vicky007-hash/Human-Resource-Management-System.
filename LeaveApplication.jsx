import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LeaveApplication = () => {
  // Managing form state for the required inputs
  const [formData, setFormData] = useState({
    leaveType: 'Paid', // Default selection
    startDate: '',
    endDate: '',
    remarks: ''
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  // Handle input changes dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simulate the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In the backend phase, we will send this payload to FastAPI
    console.log("Submitting Leave Request Payload:", formData);
    
    // Fulfilling the requirement that new requests start as 'Pending'
    setSubmitStatus('Your leave request has been submitted and is currently Pending approval.');
    
    // Reset form after submission
    setFormData({ leaveType: 'Paid', startDate: '', endDate: '', remarks: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans flex flex-col items-center">
      
      <div className="w-full max-w-2xl">
        {/* Navigation / Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Apply for Time-Off</h1>
            <p className="text-gray-600 mt-1">Submit your leave request for Admin approval.</p>
          </div>
          <Link to="/employee" className="text-blue-600 hover:text-blue-800 font-medium">
            &larr; Back to Dashboard
          </Link>
        </div>

        {/* Application Form */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Leave Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
              <select 
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="Paid">Paid Leave</option>
                <option value="Sick">Sick Leave</option>
                <option value="Unpaid">Unpaid Leave</option>
              </select>
            </div>

            {/* Date Range Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input 
                  type="date" 
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input 
                  type="date" 
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            {/* Remarks / Comments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Remarks (Optional)</label>
              <textarea 
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                rows="4"
                placeholder="Provide a brief reason for your leave request..."
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition shadow-md"
            >
              Submit Request
            </button>
          </form>

          {/* Success Message Banner */}
          {submitStatus && (
            <div className="mt-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
              {submitStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveApplication;
