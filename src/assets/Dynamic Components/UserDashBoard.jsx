import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import Navbar from '../Static Components/Navbar';
import PaymentModal from './PaymentModal';
import userData from '../Contexts/UserContext';
import { useContext } from 'react';
import PrintableReceipt from './PrintReciept';
const API_URL = '/order'; // Replace with your API endpoint

function UserDashBoard() {
 const [data, setData] = useState([]);
 const [error, setError] = useState(null);
 const [isLoading, setIsLoading] = useState(false);
 const [currentUser] = useState({ id: 1 ,isAdmin:true}); // Replace with actual user info retrieval
 const [selectedRequestId, setSelectedRequestId] = useState(null);
 const {user_id} = useContext(userData)
 const [ismodelopen,setismodelopen] = useState(false)
 const [isprintopen,setisprintopen] = useState(false)
 
 useEffect(() => {
  const fetchData = async () => {
   setIsLoading(true);
   try {
    const response = await axios.get(API_URL);
    const filterdata = response.data.filter((item)=>item.customer_id ===user_id)
    setData(response.data);
   } catch (error) {
    setError(error);
   } finally {
    setIsLoading(false);
   }
  };

  fetchData();
 }, []);

 const getRequestStatus = (request) => {
  if (request.is_cancelled) return 'Cancelled';
  if (!request.is_Approved) return 'Pending Approval';
  if (!request.is_Completed && request.is_Approved) return 'Pending Completion';
  if (!request.is_paid && request.is_Completed && request.is_Approved) return 'Pending Payment';
  return 'Completed';
 };

 const getStatusColor = (status) => {
  switch (status) {
   case 'Cancelled':
    return 'bg-red-500 text-white';
   case 'Pending Approval':
    return 'bg-yellow-500 text-black';
   case 'Pending Completion':
   case 'Pending Payment':
    return 'bg-blue-500 text-white';
   case 'Completed':
    return 'bg-green-500 text-white';
   default:
    return 'bg-gray-200 text-black';
  }
 };

 const handleCancelRequest = async (requestId) => {
  try {
   const response = await axios.patch(`${API_URL}/${requestId}/`, {
    is_cancelled: true,
   });
   setData(data.map((request) => (request.id === requestId ? response.data : request)));
  } catch (error) {
   console.error('Error cancelling request:', error);
  }
 };

 const handleCompleteRequest = async (requestId) => {
  try {
   const response = await axios.patch(`${API_URL}/${requestId}/`, {
    is_Completed: true,
    completion_time: new Date().toISOString(),
   });
   setData(data.map((request) => (request.id === requestId ? response.data : request)));
  } catch (error) {
   console.error('Error completing request:', error);
  }
 };

 // Handle payment (simulation for now)
 const handlePayNow = async (requestId) => {
  try {
   console.log(`Simulating payment for request ${requestId}`);
   const response = await axios.patch(`${API_URL}/${requestId}/`, {
    is_paid: true,
    payment_time: new Date().toISOString(),
    payment_mode:"online"

   });
   setData(data.map((request) => (request.id === requestId ? response.data : request)));
  } catch (error) {
   console.error('Error marking payment:', error);
  }
 };

 const handleRecordClick = (requestId) => {
  setSelectedRequestId(requestId === selectedRequestId ? null : requestId);
 };

 // Chart.js code for request status distribution
 useEffect(() => {
  const ctx = document.getElementById('requestStatusChart');
  const requestStatusChart = new Chart(ctx, {
   type: 'pie',
   data: {
    labels: getRequestStatusLabels(data),
    datasets: [
     {
      label: 'Request Status Distribution',
      data: getRequestStatusCounts(data),
      backgroundColor: [
       'rgba(255, 99, 132, 0.6)', // Red
       'rgba(54, 162, 235, 0.6)', // Blue
       'rgba(255, 206, 86, 0.6)', // Yellow
       'rgba(75, 192, 192, 0.6)', // Green
       'rgba(153, 102, 255, 0.6)', // Purple
       'rgba(255, 159, 64, 0.6)', // Orange
       'rgba(72, 209, 204, 0.6)', // Turquoise
      ],
      borderColor: [
       'rgba(255, 99, 132, 1)',
       'rgba(54, 162, 235, 1)',
       'rgba(255, 206, 86, 1)',
       'rgba(75, 192, 192, 1)',
       'rgba(153, 102, 255, 1)',
       'rgba(255, 159, 64, 1)',
       'rgba(72, 209, 204, 1)',
      ],
      borderWidth: 1,
     },
    ],
   },
   options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
     display: true,
     position: 'bottom',
    },
    tooltips: {
     enabled: true,
     callbacks: {
      label: (context) => `${context.label}: ${context.dataset.data[context.dataIndex]}`,
     },
    },
   },
  });

  return () => {
   requestStatusChart.destroy();
  };
 }, [data]);

 const getRequestStatusLabels = (data) => {
  const uniqueStatuses = new Set(data.map((request) => getRequestStatus(request)));
  return Array.from(uniqueStatuses); // Convert Set to an array for Chart.js
 };

 const getRequestStatusCounts = (data) => {
  const statusCounts = {};
  data.forEach((request) => {
   const status = getRequestStatus(request);
   statusCounts[status] = (statusCounts[status] || 0) + 1;
  });
  return Object.values(statusCounts); // Extract counts as an array
 };

 return (
  <>
  <Navbar/>
  <div className="container mx-auto px-4 py-8">
   {error && <div className="alert alert-danger" role="alert">{error.message}</div>}
    
   {isLoading && <div>Loading data...</div>}

   <h2>Request Status Summary</h2>
   <div className="mb-4">
    <canvas id="requestStatusChart" width="400" height="400"></canvas>
   </div>

   {data.length > 0 && (
    <div className="overflow-x-auto shadow rounded-lg">
     <table className="table-auto w-full">
      <thead>
       <tr className="bg-gray-500 text-white">
        <th className="px-4 py-2">Request ID</th>
        <th className="px-4 py-2">Description</th>
        <th className="px-4 py-2">Status</th>
        <th className="px-4 py-2">Service Provider ID</th>
        <th className="px-4 py-2">Request Type</th>
        <th className="px-4 py-2">Amount</th>

        {currentUser.isAdmin && <th className="px-4 py-2">Actions</th>}
       </tr>
      </thead>
      <tbody>
       {data.map((request) => (
        <tr
         key={request.id}
         className={selectedRequestId === request.id ? 'bg-gray-100' : ''}
         onClick={() => handleRecordClick(request.id)}
        >
         <td className="px-4 py-2">{request.id}</td>
         <td className="px-4 py-2">{request.description}</td>
         <td className={`px-4 py-2 ${getStatusColor(getRequestStatus(request))}`}>
          {getRequestStatus(request)}
         </td>
         <td className="px-4 py-2">{request.ServiceProvider_id}</td>
         <td className="px-4 py-2">{request.request_type}</td>
         <td className="px-4 py-2">{request.is_cancelled ?"NA":request.type==='immediate'?"To be decided":request.price? "RS. "+request.price:""}</td>
         {currentUser.isAdmin && (
          <td className="px-4 py-2">
            {getRequestStatus(request) === 'Cancelled' && (
            <button className="btn btn-sm btn-danger">
             No actions
            </button>
           )}
            {getRequestStatus(request) === 'Pending Approval' && (
            <button className="btn btn-sm btn-danger font-medium rounded text-white bg-red-600 p-2 m-2" onClick={() => handleCancelRequest(request.id)}>
             Cancel
            </button>
           )}
           {getRequestStatus(request) === 'Pending Completion' && (
            <button className="btn btn-sm btn-primary rounded-sm font-medium rounded-sm text-white bg-cyan-200 p-2 m-2" onClick={() => handleCompleteRequest(request.id)}>
             Mark Complete
            </button>
           )}
           {getRequestStatus(request) === 'Pending Payment' && (
            <button className="btn btn-sm btn-info bg-emerald-400 font-medium p-2 rounded-sm" onClick={() => setismodelopen(true)}>
             Pay Now
            </button>
           )}
           {getRequestStatus(request) === 'Completed' && (
            <PrintableReceipt receiptData={request}/>
           )}
           {ismodelopen &&
           <PaymentModal handlepaynow = {handlePayNow} setmodel = {setismodelopen} requestId={request.id} isActive={ismodelopen} />
           }
          </td>
         )}
         
        </tr>
       ))}
      </tbody>
     </table>
    </div>
   )}
  </div>
  
  </>
 );
}

export default UserDashBoard;
