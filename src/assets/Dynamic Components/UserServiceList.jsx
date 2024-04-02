import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import userData from '../Contexts/UserContext';

const ServiceComponent = ({serviceprovider_id}) => {
  const [services, setServices] = useState([]);
  const [vehicleList,setVehicleList] = useState([])
  const [vehicleType, setVehicleType] = useState(2); // Changed variable name and initial value
  const [sortOrder, setSortOrder] = useState('lowest');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ismodelOpen,setIsModelOpen] = useState(false);
  const [success,setSuccess] = useState(false);
  const {user_id} = useContext(userData)
  const [formData, setFormData] = useState({
    vehicle_name: '',
    description: '',
    appointment_time: '',
    vehicletype:'2',
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/vehicles/'); // Replace with your API endpoint
        setVehicleList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/Service/`);
        setServices(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [vehicleType, sortOrder]);

  const handleBookNow = async (serviceId) => {
    try {
      setLoading(true);
        // Make Axios POST request
       const post =  await axios.post('http://127.0.0.1:8000/order/',{
        is_Approved:false,
        is_Completed:false,
        is_paid:false,
        is_cancelled:false,
        vehicle_name:formData.vehicle_name,
        description:formData.description,
        request_type:"slot",
        request_time:new Date(),
        approval_time:null,
        completion_time:new Date(),
        payment_time:null,
        organization_time:"",
        customer_id:user_id,
        ServiceProvider_id:serviceprovider_id,
        service_id:serviceId,
        appointment_time:formData.appointment_time,
       } );
      console.log('Booking service with id:', serviceId);
      console.log(post.status)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
<>
{ismodelOpen && <>
  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
  <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
   { success ?     <div className="mb-4 text-green-600">Form submitted successfully!</div>:<>
    <h2 className="text-2xl font-bold mb-4 text-black">Fill the Form</h2>
    <form onSubmit={handleBookNow}>
      <div className="mb-4">
        <label htmlFor="vehicle_name" className="block text-gray-700 font-bold mb-2">Vehicle Name</label>
        <input type="text" id="vehicle_name" name="vehicle_name" value={formData.vehicle_name} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 text-black" />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 text-black"></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="appointment_time" className="block text-gray-700 font-bold mb-2">Appointment Time</label>
        <input type="datetime-local" id="appointment_time" name="appointment_time" value={formData.appointment_time} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 text-black" 
        min={new Date().toISOString().split('T')[0]} />
      </div>
      <div className="mb-4">
        <label htmlFor="vehicle_type" className="block text-gray-700 font-bold mb-2">Vehicle Type</label>
        <select id="vehicle_type" name="vehicle_type" value={formData.vehicle_type} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 text-black">
          <option value="2">2 Wheeler</option>
          <option value="4">4 Wheeler</option>
        </select>
      </div>
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
        <button type="button" onClick={() => setIsModelOpen(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400">Cancel</button>
      </div>
    </form>
    </>}
  </div>
</div>
</>}
    <div className="container mx-auto p-4 text-center overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-center items-center mb-6"> {/* Center align the form */}
        <input type="text" placeholder="Search" className="border rounded px-4 py-2 mx-4 mb-2 md:mb-0 w-full md:w-auto focus:outline-none text-gray-800" />
        <div className="flex items-center space-x-4">
          <select
            className="border rounded px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 focus:outline-none"
            onChange={(e) => setVehicleType(parseInt(e.target.value))} 
            value={vehicleType}
          >
            <option classname="text-black "value={2}>2 Wheeler</option> {/* Changed value and displayed text */}
            <option classname="text-black" value={4}>4 Wheeler</option> {/* Changed value and displayed text */}
          </select>
          <select
            className="border rounded px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 focus:outline-none text-white"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="lowest">Lowest to Highest Price</option>
            <option value="highest">Highest to Lowest Price</option>
          </select>
        </div>
      </div>
      {services.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
              <th className="px-4 py-2 text-lg font-semibold">Name</th>
              <th className="px-4 py-2 text-lg font-semibold">Description</th>
              <th className="px-4 py-2 text-lg font-semibold">Price</th>
              <th className="px-4 py-2 text-lg font-semibold">Vehicle Type</th>
              <th className="px-4 py-2 text-lg font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b">
                <td className="border px-4 py-2">{service.name}</td>
                <td className="border px-4 py-2">{service.description}</td>
                <td className="border px-4 py-2">RS. {service.price}</td>
                <td className="border px-4 py-2">{service.vehicle_type}</td>
                <td className="border px-4 py-2">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                    onClick={() => setIsModelOpen(true)}>
                    Book Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-lg font-semibold text-gray-800 mt-4">No vehicle services are available.</div>
      )}
    </div>
    </>
  );
};

export default ServiceComponent;
