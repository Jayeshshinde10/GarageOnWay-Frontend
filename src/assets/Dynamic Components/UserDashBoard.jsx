import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Static Components/Navbar';
import userData from '../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { user_id, isLoggedIn, handleCancelledRequest } = useContext(userData);
  const [userOrders, setUserOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    if (isLoggedIn===false) {
      navigator('/login');
    }
    handleCancelledRequest();
    async function getOrderData() {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/order/`);
        if (response.status === 200) {
          const data = response.data;
          setUserOrders(data);
        }
      } catch (error) {
        console.log(`error is ${error.message}`);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getOrderData();
  }, [isLoggedIn, navigator, handleCancelledRequest]);

  const handleOrderCompletion = async (orderId) => {
    const isCompleted = window.confirm('Has the order been completed?');
    if (isCompleted) {
      try {
        await axios.patch(`http://127.0.0.1:8000/order/${orderId}/`, { is_Completed: true, completion_time: new Date() });
        // Optionally, perform additional actions after marking the order as completed
        // Refresh order data
        window.location.reload();
      } catch (error) {
        console.error('Error updating order status:'+ error);
      }
    }
  };

  const handleOrderCancellation = async (orderId) => {
    const isCancelled = window.confirm('Are you sure you want to cancel this request?');
    if (isCancelled) {
      try {
        await axios.patch(`http://127.0.0.1:8000/order/${orderId}/`, { is_cancelled: true, completion_time: new Date() });
        // Optionally, perform additional actions after cancelling the order
        // Refresh order data
        window.location.reload();
      } catch (error) {
        console.error('Error cancelling order:', error);
      }
    }
  };

  if (error) {
    return <p>Error occurred</p>;
  }

  return (
    <>
      <Navbar />
      {isLoading && (
        <div className='absolute top-0 left-0 flex flex-row justify-center align-center items-center backdrop-sepia-0 h-full w-full backdrop-blur-sm z-10'>
          <p className='text-3xl text-slate-600 drop-shadow-2xl'>Loading...</p>
        </div>
      )}
      <div className='overflow-x-auto w-full'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead>
          <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Vehicle Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                ID
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Customer ID
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Organization Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Description
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Request Type
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Approved
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Completed
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Cancelled
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Action
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {userOrders
              .filter((item) => item.customer_id === user_id)
              .map((item) => (
                <tr key={item.id}>
                  <td className='px-6 py-4 whitespace-nowrap'>{item.vehicle_name}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{item.id}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{item.customer_id}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{item.organization_name}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{item.description}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{item.request_type}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{item.is_Approved ? 'Approved' : 'Unapproved'}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{item.is_Completed ? 'Completed' : 'Incomplete'}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{item.is_cancelled ? 'True' : 'False'}</td>
                  <td>
                    {/* Render action buttons based on order status */}
                    {!item.is_cancelled && (
                      <div className='flex space-x-2'>
                        {item.is_Approved && !item.is_Completed && (
                          <button
                            onClick={() => handleOrderCompletion(item.id)}
                            className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md'
                          >
                            Mark as Completed
                          </button>
                        )}
                        {!item.is_Approved && (
                          <button
                            onClick={() => handleOrderCancellation(item.id)}
                            className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md'
                          >
                            Cancel Request
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserDashboard;
