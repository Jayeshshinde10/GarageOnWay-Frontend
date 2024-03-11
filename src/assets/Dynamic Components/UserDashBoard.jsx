// src/components/Dashboard.js
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Static Components/Navbar'
import userData from '../Contexts/UserContext';
const UserDashboard = () => {
  // const array = new Array(20)
  const [userOrders,setUserOrders] = useState([])
  const {user_id} = useContext(userData)
  const [isloading,setIsLoading] = useState(true)
  const [error ,setError] = useState(false);

  useEffect(()=>{

  async function getOrderData(){
    try{
      setIsLoading(true)
      const response = await axios.get(`http://127.0.0.1:8000/order/`)
      if(response.status === 200){
        const data = response.data
        setUserOrders(data);
      }
      

    }
    catch(error){
      console.log(`error is ${error.message}`)
      setError(true)
    }
    finally{
      
      // const filterdata = await data.filter((item)=>item.customer_id === user_id)
      // console.log(filterdata)
      setIsLoading(false)
    }
  }
  getOrderData();
  },[])

  if(error){
    return(
      <p>error occured</p>
    )
  }
  return (
    <>
    <Navbar></Navbar>
    {isloading && <div className='absolute top-0 left-0 flex flex-row justify-center align-center items-center backdrop-sepia-0 h-full w-full backdrop-blur-sm z-10'>
      <p className='text-3xl text-slate-600 drop-shadow-2xl'>Loading...</p>
      </div>}
    <div className="flex h-screen bg-gray-100 w-full">
      {/* Sidebar */}
      {/* <div className="w-64 bg-white shadow-md p-4">
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
      </div> */}

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Content goes here */}
        {/* <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard!</h2>
        <p>Your content goes here.</p> */}
        {/* my table */}
        <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vehicle_name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              id
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer_id
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              organization_name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              request Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            is_Approved
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            is_Completed
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          { userOrders.filter((item)=>(item.customer_id == user_id)).map(item=>(
            <tr key={item.id}>
            <td className="px-6 py-4 whitespace-nowrap">{item.vehicle_name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.customer_id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.ServiceProvider_id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.request_type }</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.is_Approved ? "approved" :"unapporved" }</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.is_Completed ? "completed":"imComplete"}</td>
          </tr>
           ))}
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
        
      </div>
    </div>  
     
    </>
  );
};

export default UserDashboard;
