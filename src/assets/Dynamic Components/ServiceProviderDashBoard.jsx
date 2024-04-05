// import { useState,useContext,useEffect } from "react";
// import userData from "../Contexts/UserContext";
// import Navbar from "../Static Components/Navbar";
// import { useNavigate } from 'react-router-dom';
// import AddServiceForm from './AddSeviceForm';
// import ServiceProviderServices from './ServicesList';
// import ServiceProviderForm from './ServiceProviderForm';
// import ServicesList from './ServicesList';
// import axios from "axios";
// // import Dashboard from "./ServiceProviderOrders";
// export default function ServiceProviderDashBoard(){
//   const [error, setError] = useState(null);
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const { username, user_id, isLoggedIn, serviceProvider_id } = useContext(userData);
//   const [isLoading, setIsLoading] = useState(true);
//   const [serviceProviderOrder, setServiceProviderOrder] = useState([]);
//   const navigate = useNavigate()
//   useEffect(()=>{
//     getLocation();
//     fetchServicesData();
//   },[])

//   const getLocation = () => {
//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser");
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setLatitude(position.coords.latitude);
//         setLongitude(position.coords.longitude);
//       },
//       (error) => {
//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             setError("User denied the request for geolocation.");
//             break;
//           case error.POSITION_UNAVAILABLE:
//             setError("Location information is unavailable.");
//             break;
//           case error.TIMEOUT:
//             setError("The request to get user location timed out.");
//             break;
//           case error.UNKNOWN_ERROR:
//             setError("An unknown error occurred.");
//             break;
//           default:
//             setError("An unknown error occurred.");
//         }
//       }
//     );
//   };
//   async function fetchServicesData() {
//           try {
//             const response = await axios.get(`http://127.0.0.1:8000/order/`);
//             if (response.status === 200) {
//               console.log(response.data);
//               const filterdata = response.data.filter((item) => item.ServiceProvider_id === user_id);
//               console.log(filterdata);
//               setServiceProviderOrder(filterdata);
//             }
//           } catch (error) {
//             console.error(`Error fetching data: ${error.message}`);
//             setError(error.message);
//           } finally {
//             setIsLoading(false);
//           }
//         }
//   return (
//     <>
//     <Navbar/>
//     {isLoading && (
//         <div className='absolute top-0 left-0 flex flex-row justify-center align-center items-center backdrop-sepia-0 h-full w-full backdrop-blur-sm z-10'>
//           <p className='text-3xl text-slate-600 drop-shadow-2xl'>Loading...</p>
//         </div>
//       )}
//       {error && (
//         <div className='absolute top-0 left-0 flex flex-row justify-center align-center items-center backdrop-sepia-0 h-full w-full backdrop-blur-sm z-10'>
//           <p className='text-3xl text-red-600 drop-shadow-2xl'>Error: {error}</p>
//         </div>
//       )}
// <div className="flex h-screen bg-gray-100">
//   <div className="flex-1 p-8">
//     {serviceProvider_id ? (
//       <>
//         <AddServiceForm />
//         <ServicesList />
//        {/* <Dashboard/> */}
//       </>
//     ) : (
//       latitude && <ServiceProviderForm latitude={latitude} longitude={longitude} />
//     )}
//   </div>
// </div>
//     </>

//   )
// }

import PrintableReceipt from './PrintReciept';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import Navbar from '../Static Components/Navbar';
import userData from '../Contexts/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import ResponsiveGoogleMap from './GoogleMaps';

const API_URL = 'http://127.0.0.1:8000/order'; // Replace with your API endpoint

function ServiceProviderDashBoard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser] = useState({ id: 1, isAdmin: false }); // Service provider by default
  const { user_id,isLoggedIn,serviceProvider_id} = useContext(userData);
  const navigate = useNavigate()
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [newPrice, setNewPrice] = useState(null); // For immediate requests
  const [isviewopens,setviewmaps] = useState(false);

  useEffect(() => {
    if(isLoggedIn === false){
      navigate('/login')
  }
  // if(!serviceProvider_id ){
  //   navigate("/")
  // }
    const fetchData = async () => {
      setIsLoading(true);
      console.log("service provider id is "+ serviceProvider_id)
      try {
        const response = await axios.get(API_URL);
        const filteredData = response.data.filter(
          (item) => item.ServiceProvider_id === serviceProvider_id
        );
        setData(filteredData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [serviceProvider_id]);

  const getRequestStatus = (request) => {
    if (request.is_cancelled) return 'Cancelled';
    if (!request.is_Approved) return 'Pending Approval';
    if (!request.is_Completed && request.is_Approved) return 'Pending Completion';
    if (!request.is_paid && request.is_Completed && request.is_Approved)
      return 'Pending Payment';
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

  const handleApproveRequest = async (requestId) => {
    try {
      const response = await axios.patch(`${API_URL}/${requestId}/`, {
        is_Approved: true,
        approval_time: new Date().toISOString(),
        is_cancelled: false, // Reset cancellation if previously cancelled
      });
      setData(data.map((request) => (request.id === requestId ? response.data : request)));
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleCompleteRequest = async (requestId) => {
    if (data.find((request) => request.id === requestId).request_type === 'immediate') {
      if (!newPrice) {
        alert('Please enter the price for the immediate request.');
        return;
      }
      try {
        const response = await axios.patch(`${API_URL}/${requestId}/`, {
          is_Completed: true,
          completion_time: new Date().toISOString(),
          price: newPrice,
        });
        setData(data.map((request) => (request.id === requestId ? response.data : request)));
        setNewPrice(null); // Reset price input
      } catch (error) {
        console.error('Error marking request complete:', error);
      }
    } else {
      try {
        // Implement continued from previous code...
      } catch (error) {
        console.error('Error marking request complete:', error);
      }
    }
  };

  const handleMarkPaid = async (requestId) => {
    try {
      const response = await axios.patch(`${API_URL}/${requestId}/`, {
        is_paid: true,
        payment_time: new Date().toISOString(),
        payment_mode:"offline"
      });
      setData(data.map((request) => (request.id === requestId ? response.data : request)));
    } catch (error) {
      console.error('Error marking request paid:', error);
    }
  };

  const handleRecordClick = (requestId) => {
    setSelectedRequestId(requestId === selectedRequestId ? null : requestId);
    setNewPrice(null); // Reset price input when selecting a new request
  };

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
    if (!data) return [];
    const uniqueStatuses = new Set(data.map((request) => getRequestStatus(request)));
    return Array.from(uniqueStatuses); // Convert Set to an array for Chart.js
  };

  const getRequestStatusCounts = (data) => {
    if (!data) return [];
    const statusCounts = {};
    data.forEach((request) => {
      const status = getRequestStatus(request);
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
    return Object.values(statusCounts); // Extract counts as an array
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {error && <div className="alert alert-danger" role="alert">{error.message}</div>}

        {isLoading && <div>Loading data...</div>}

        <h2>Request Status Summary</h2>
        <div className="mb-4">
          <canvas id="requestStatusChart" width="400" height="400"></canvas>
        </div>

        {data.length > 0 && (
          // Continued from previous code...

          <div className="overflow-x-auto shadow rounded-lg">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-500 text-white">
                  <th className="px-4 py-2">Request ID</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Customer ID</th>
                  <th className="px-4 py-2">Request Type</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Actions</th>
                  <td className="px-4 py-2">Location</td>
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
                    <td className="px-4 py-2">{request.customer_id}</td>
                    <td className="px-4 py-2">{request.request_type}</td>
                    <td className="px-4 py-2">
                      {
                        request.request_type === 'immediate'
                          ? request.is_cancelled
                            ? 'NA'
                            : request.price
                              ? `₹${request.price}`
                              : 'To be decided'
                          : `₹${request.price}`
                      }

                    </td>
                    <td className="px-4 py-2">
                      {getRequestStatus(request) === 'Cancelled' && (
                        <button className="btn btn-sm btn-danger" disabled>
                          No actions
                        </button>
                      )}
                      {getRequestStatus(request) === 'Pending Approval' && (
                        <>
                          <button
                            className=" text-white btn btn-sm btn-danger rounded-sm bg-red-500 p-2 m-1"
                            onClick={() => handleCancelRequest(request.id)}
                          >
                            Cancel
                          </button>
                          <button
                            className=" text-white btn btn-sm btn-danger bg-green-600 rounded-sm p-2 m-1"
                            onClick={() => handleApproveRequest(request.id)}
                          >
                            Approve
                          </button>

                        </>
                      )}
                      {getRequestStatus(request) === 'Pending Completion' && (
                        <button
                          className="btn btn-sm btn-primary rounded-sm bg-blue p-2 m-2"
                          onClick={() => handleCompleteRequest(request.id)}
                        >
                          Mark Complete
                        </button>
                      )}
                      {getRequestStatus(request) === 'Pending Payment' && (
                        <button
                          className="btn btn-sm btn-info bg-emerald-400 p-2 rounded-sm"
                          onClick={() => handleMarkPaid(request.id)}
                        >
                          Paid Offline
                        </button>
                      )}
                      {request.request_type === 'immediate' &&
                        getRequestStatus(request) === 'Pending Completion' && (
                          <div className="flex mt-2">
                            <input
                              type="number"
                              className="px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                              placeholder="Enter Price"
                              value={newPrice}
                              onChange={(e) => setNewPrice(e.target.value)}
                            />
                          </div>
                        )}
                        {getRequestStatus(request) === 'Completed' && (
            <PrintableReceipt receiptData={request}/>

           )}
            { isviewopens && <ResponsiveGoogleMap setviewmaps ={setviewmaps} latitude={request.userlatitude} longitude={request.userlongitude}/>}
                    </td>
                    <td className="px-4 py-2"> <button className="btn btn-sm btn-danger bg-green-500 p-2 text-white font-medium" onClick={()=>{setviewmaps(true)}}>
                          View Location
                        </button></td>
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

export default ServiceProviderDashBoard;

