import React from 'react';
import { useState } from 'react';
import ModalForm from './ModalForm';
import { useNavigate } from 'react-router-dom';
const  Card = ({ item, lat1, lon1, lat2, lon2}) => { 
const navigator = useNavigate()
  const [isModelOpen,setIsModelOpen] = useState(false)
  const data = {'id':item.id}

  function calculateDistance(lat1, lon1, lat2, lon2) {
    // Convert latitude and longitude from degrees to radians
    const radlat1 = Math.PI * lat1 / 180;
    const radlon1 = Math.PI * lon1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const radlon2 = Math.PI * lon2 / 180;

    // Haversine formula
    const dlat = radlat2 - radlat1;
    const dlon = radlon2 - radlon1;
    const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
              Math.cos(radlat1) * Math.cos(radlat2) *
              Math.sin(dlon / 2) * Math.sin(dlon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Radius of the Earth in kilometers (change to miles if needed)
    const R = 6371;

    // Calculate the distance
    const distance = R * c;

    return distance;
}
const distance = calculateDistance(lat1,lon1,lat2,lon2)
  function handleMakeRequest(){
    console.log("function executed");
    setIsModelOpen(true)
    }
    function closeModal(){
      setIsModelOpen(false)
    }
return (
  <>
  {isModelOpen && <ModalForm isOpen={isModelOpen} item={item.id} closeModal={closeModal} ></ModalForm>}
  <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md shadow-black">
    <img
      className="w-full h-48 object-cover"
      src={item.image1} // Replace with your product image source
      alt={item.title}
    />
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
      <p className="text-gray-600 mb-2">{distance.toFixed(2)}km Far From you</p>
      <p className="text-gray-600 mb-2">landmark: {item.near_by_landmark}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue" onClick={()=>{handleMakeRequest(true)
      }}>
        Make Request
      </button>
      <button onClick={()=>{
        navigator("/bookSlot/",{state:item})
      }} className="bg-blue-500 text-white px-4 m-1 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue ">
        Book A slot
      </button>
    </div>
  </div>
  </>
);

};

export default Card;
