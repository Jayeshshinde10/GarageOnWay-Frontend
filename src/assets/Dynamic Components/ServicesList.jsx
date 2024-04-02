import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import userData from '../Contexts/UserContext';

const ServicesList = ({ id }) => {
  const [data, setData] = useState(null);
  const { serviceProvider_id } = useContext(userData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/Service/`);
        const filteredData = response.data.filter(item => item.serviceProvider_id === serviceProvider_id);
        setData(filteredData);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [serviceProvider_id]); // Changed the dependency to serviceProvider_id

  async function deleteService(id) {
    setIsLoading(true); // Moved this inside deleteService function
    try {
      if (window.confirm(`Are You Sure want to delete this service with id ${id}`)){
      const deletedata = await axios.delete(`http://127.0.0.1:8000/Service/${id}/`);
      if (deletedata.status === 204) {
        // Refresh data after deletion
        fetchData(); // Call fetchData to update data after deletion
      }
    }
    else{
      console.log("nothing pressed")
    }
    } catch (error) {
      alert(`Error occurred while deleting Service with ${id}!`);
    } finally {
      setIsLoading(false);
      window.location.reload()
    }
  }

  return (
    <>
      {isLoading && (
        <div className='absolute top-0 left-0 flex flex-row justify-center align-center items-center backdrop-sepia-0 h-screen w-screen backdrop-blur-sm z-10'>
          <p className='text-3xl text-slate-600 drop-shadow-2xl'>Loading...</p>
        </div>
      )}
      <div className="container mx-auto p-4 max-h-screen max-w-screen overflow-hidden">
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
                {data.map(data =>
                  <tr key={data.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{data.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{data.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{data.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">RS.{data.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{data.vehicle_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{data.serviceProvider_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><button className='bg-red-700 p-2 rounded text-white font-semibold' onClick={(e) => { deleteService(data.id) }}>DELETE</button></td>
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
