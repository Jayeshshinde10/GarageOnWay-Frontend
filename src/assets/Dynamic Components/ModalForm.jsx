// Modal.js
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import userData from '../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export default function ModalForm( {isOpen, closeModal, id} ){
  const [vehicleList,setVehicleList] = useState([])
  const [description,setDescription] = useState('');
  const [vehicleName,setVehicleName] = useState('');
  const [vehicleType,setVehicleType] = useState('');
  const {user_id} = useContext(userData)
  const navigator = useNavigate()
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
   async function handleSubmit(e){
    e.preventDefault();
    const response = await axios.post('http://127.0.0.1:8000/order/',{
      vehicle_name:vehicleName,
      description:description,
      ServiceProvider_id:4,
      customer_id:user_id,
      is_Approved:false,
      is_Completed:false,
      is_paid:false,
      request_type:"immediate",
      Service_id:1,
    }); 
    console.log("request made ")// Replace with your API endpoint
    if(response.status === 201) navigator('/userdashboard')
    else alert("an error has occured while making an request")
   }

  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? 'opacity-100 pointer-events-auto':'opacity-0 pointer-events-none'
      } transition-opacity duration-300 flex items-center justify-center`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white w-full max-w-md p-4 rounded-md shadow-md z-10">
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:shadow-outline-blue"
          >
            X
          </button>
        </div>
        <div className="mt-4">
        <form  className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md" onSubmit={(e)=>handleSubmit(e)}>
          {
            /*
    customer_id = models.ForeignKey(User,on_delete=models.CASCADE,default=0)
    Service_id = models.ForeignKey(Service,on_delete=models.CASCADE)
    ServiceProvider_id = models.ForeignKey(ServiceProvider , on_delete=models.CASCADE)
    #customer_id = foreignkey from customer table
    is_Approved = models.BooleanField(default=False)
    is_Completed = models.BooleanField(default = False)
    is_paid = models.BooleanField(default=False)
    #vehicle_name = vehicles will come here 
    #description = description of problem will come here.
    #vehicle Type 2 two wheeler or three wheeler
    #
            */
          }
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
          Decription
        </label>
        <textarea
        value={description}
        onChange={(e)=>{
          setDescription(e.target.value)
          console.log("the description is" + description)
        }
      }
          id="message"
          name="message"
          rows="4"
          required
          className="w-full border-2 border-gray-300 p-2 rounded-md resize-none focus:outline-none focus:border-blue-500"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
          Enter Vehicle Name
        </label>
        <input
          list="vehicle_list"
          type="text"
          id="name"
          name="name"
          placeholder="Type to search"
          required
          className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          value={vehicleName}
          onChange={(e)=>{setVehicleName(e.target.value)}}
        />
        <datalist id="vehicle_list">
        {vehicleList.map((data) => (
          <option key={data.id} value={data.vehicle_name}>
            {data.vehicle_name}
          </option>
        ))}
        </datalist>

      </div>
      {/* <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
          Select Vehicle Type
        </label>
        <select
        required
          id="country"
          name="country"
          className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Vehicles Type</option>
          <option value="2 wheeler">2 wheeler</option>
          <option value="4 wheeler">4 wheeler</option>
          <option value="other">other</option>
        </select>
      </div>  */}
      <button>Make Request</button>
      </form>
        </div>
      </div>
    </div>
  );
};


