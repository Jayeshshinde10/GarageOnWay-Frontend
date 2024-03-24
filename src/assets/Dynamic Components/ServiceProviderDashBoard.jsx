// src/components/Dashboard.js
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import userData from '../Contexts/UserContext';
import Navbar from '../Static Components/Navbar';
import { useNavigate } from 'react-router-dom';
import AddServiceForm from './AddSeviceForm';
import ServiceProviderServices from './ServicesList'
import FormComponent from './ServiceProviderForm';
import ServiceProviderForm from '../Static Components/ServiceProviderForm';
import ServicesList from './ServicesList';
const ServiceProviderDashboard = () => {
    const {username,user_id,isLoggedIn,serviceProvider_id} = useContext(userData)
    const [isLoading,setIsLoading] = useState(true)
    const [ServiceProviderOrder,setServiceProviderOrder] = useState([])
    const navigator = useNavigate()
    useEffect(() => {
      if(isLoggedIn === false) navigator('/login')
      async function fetchServicesData(){
        try{
          const response = await axios.get(`http://127.0.0.1:8000/order/`)
          if(response.status === 200){
            console.log(response.data)
            const filterdata = await response.data.filter((item)=>item.ServiceProvider_id === user_id)
            console.log(filterdata)
            setServiceProviderOrder(filterdata);
          }
        }
        catch(error){
          console.log(`error is ${error.message}`)
          setError(true)
          setIsLoading(false)
          console.log("error occured")
        }
        finally{
          console.log(`user_id is ${username}`)
          console.log(ServiceProviderOrder)
           console.log("finally block executed")
           setIsLoading(false)
        }
      }
  
      fetchServicesData();
    }, []);
  return (
    
    <>
    
      <Navbar/>
      {isLoading && (
        <div className='absolute top-0 left-0 flex flex-row justify-center align-center items-center backdrop-sepia-0 h-full w-full backdrop-blur-sm z-10'>
          <p className='text-3xl text-slate-600 drop-shadow-2xl'>Loading...</p>
        </div>
      )}
     {/* <ServiceProviderForm/> */}
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
        {/* <FormComponent/>
      */}
      <AddServiceForm/>
      <ServicesList/>
      </div>
    </div>
    </>
  );
};

export default ServiceProviderDashboard;
