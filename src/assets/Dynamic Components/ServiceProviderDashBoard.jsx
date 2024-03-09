// src/components/Dashboard.js
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import userData from '../Contexts/UserContext';
const ServiceProviderDashboard = () => {
    const {username,user_id} = useContext(userData)
    useEffect(() => {
      const fetchServicesData = async () => {
        try {
          console.log("user id is "+user_id)
          const response = await axios.get(`http://127.0.0.1:8000/Service/${user_id}/`); // Replace with your API endpoint
          console.log("try block executed")
          console.log(response.data)
          
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          // setLoading(false);
          console.log("finally block executed for serviceProvider data")
        }
      };
  
      fetchServicesData();
    }, []);
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <ul>
          <li className="mb-2">
            <a href="#" className="text-blue-500 hover:text-blue-700">Home</a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-blue-500 hover:text-blue-700">Profile</a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-blue-500 hover:text-blue-700">Settings</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Content goes here */}
        <h2 className="text-2xl font-bold mb-4">Welcome {username}!</h2>
        <p>Your content goes here.</p>
      </div>
    </div>
  );
};

export default ServiceProviderDashboard;
