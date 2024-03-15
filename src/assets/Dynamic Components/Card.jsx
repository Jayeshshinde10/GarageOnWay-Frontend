import React from 'react';
import { useState } from 'react';
import ModalForm from './ModalForm';
import { useNavigate } from 'react-router-dom';
const  Card = ({ item, lat1, lon1, lat2, lon2}) => { 
const navigator = useNavigate()
  const [isModelOpen,setIsModelOpen] = useState(false)
  const data = {'id':item.id}

  function closeModal(){
    setIsModelOpen(false)
    }
  function handleMakeRequest(){
    console.log("function executed");
    setIsModelOpen(true)
      }
      
return (
  <>
  {isModelOpen && <ModalForm isOpen={isModelOpen} item={item} closeModal={closeModal} ></ModalForm>}
  <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md shadow-black">
    <img
      className="w-full h-48 object-cover"
      src={item.image1} // Replace with your product image source
      alt={item.title}
    />
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">{item.orginazation_name}</h2>
      <p className="text-gray-600 mb-2">{item.distance.toFixed(2)}km Far From you</p>
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
