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
        const response = await axios.get('http://127.0.0.1:8000/Service/');
        const filteredData = response.data.filter((item) => item.serviceProvider_id === serviceProvider_id);
        setData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [serviceProvider_id]);

  async function deleteService(id) {
    setIsLoading(true);
    try {
      if (window.confirm(`Are You Sure want to delete this service with id ${id}`)) {
        const deletedata = await axios.delete(`http://127.0.0.1:8000/Service/${id}/`);
        if (deletedata.status === 204) {
          fetchData(); // Refresh data after deletion
        }
      } else {
        console.log("nothing pressed");
      }
    } catch (error) {
      alert(`Error occurred while deleting Service with ${id}!`);
    } finally {
      setIsLoading(false);
      
          // Use history for navigation (if available in context)
          // or implement a custom handleReload function for refresh
      

    }
  }

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-sepia-50 bg-opacity-75 flex items-center justify-center h-full">
          <p className="text-3xl text-slate-600 font-semibold tracking-wide">Loading...</p>
        </div>
      )}
      <div className="container mx-auto p-4 overflow-hidden">
        {data ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    id
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Service Provider ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      RS.{item.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.vehicle_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.serviceProvider_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          className="bg-red-700 text-white px-4 py-2 rounded font-semibold"
                          onClick={() => deleteService(item.id)}
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center py-4">No services found.</p>
          )}
        </div>
      </>
    );
  };

  export default ServicesList;
