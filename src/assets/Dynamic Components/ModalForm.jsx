// Modal.js
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import userData from '../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
export default function ModalForm( {isOpen, closeModal, item} ){
  const [vehicleList,setVehicleList] = useState([])
  const [description,setDescription] = useState('');
  const [vehicleName,setVehicleName] = useState('');
  const [vehicleType,setVehicleType] = useState('');
  const {user_id,isLoggedIn} = useContext(userData)
  const navigator = useNavigate()
  useEffect(() => {
    console.log("id is "+ item.id)
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
    const response = await axios.put('http://127.0.0.1:8000/order/',{
      vehicle_name:vehicleName,
      description:description,
      ServiceProvider_id:item.id,
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
      <div className="bg-white w-full max-w-md p-4 rounded-md shadow-md z-10  shadow-md shadow-black ">
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="text-black hover:text-gray-700 focus:outline-none focus:shadow-outline-blue text-lg"
          >
            X
          </button>
        </div>
        <div className="mt-4">
        <form  className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md" onSubmit={(e)=>handleSubmit(e)}>
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
      <button className='text-center'>Make Request</button>
      </form>
        </div>
      </div>
    </div>
  );
};


