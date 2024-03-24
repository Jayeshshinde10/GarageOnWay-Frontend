import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import userData from '../Contexts/UserContext';

const ServicesList = ({ id }) => {
  const [data, setData] = useState(null);
  const {serviceProvider_id} = useContext(userData);
  const [isLoading,setisLoading] = useState(true)
  // const [notificationGranted, setNotificationGranted] = useState(false);
  const [update,setupdate] = useState(true)
  useEffect(() => {
    const fetchData = async () =>
     {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/Service/`);
        const data = await response.data.filter(item=>item.serviceProvider_id === serviceProvider_id)
        setData(data);
        console.log("data is")
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally{
        setisLoading(false)
      }

    };


    fetchData();
  }, [setupdate]);
  async function deleteService(id){
    setupdate(true)
    try{
      setisLoading(true)
      const deletedata = await axios.delete(`http://127.0.0.1:8000/Service/${id}/`)
      if(deletedata.status===204){
        alert(`Service ${id} id been deleted` )
        setupdate(true)
      }
    }
    catch(error){
      alert(`error occured while deleteing Service with ${id}!` )
    }
    finally{
      setisLoading(false)
    }
   }
   
  return (
    <>
    {isLoading && (
        <div className='absolute top-0 left-0 flex flex-row justify-center align-center items-center backdrop-sepia-0 h-full w-full backdrop-blur-sm z-10'>
          <p className='text-3xl text-slate-600 drop-shadow-2xl'>Loading...</p>
        </div>
      )}
    <div className="container mx-auto p-4">
      {data ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">id</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Provider ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
      {data.map(data=>
                  <tr key={data.id}>
                <td className="px-6 py-4 whitespace-nowrap">{data.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{data.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{data.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">RS.{data.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{data.vehicle_type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{data.serviceProvider_id}</td>
                <td className="px-6 py-4 whitespace-nowrap"><button className='bg-red-700 p-2 rounded text-white font-semibold' onClick={(e)=>{deleteService(data.id)}}>DELETE</button></td>
              </tr>)}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </>
  );
};

export default ServicesList;
