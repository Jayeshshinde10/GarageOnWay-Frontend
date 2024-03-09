import userData from "../Contexts/UserContext";
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Static Components/Navbar";
export default function BookSlot(){
const location = useLocation()
const data = location.state
const [serviceProviderData,setServiceProviderData] = useState()
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/ServiceProvider/${data.id}`); // Replace with your API endpoint
      console.log("the response is ")
      console.log(response.data)
      setServiceProviderData(response.data);
      console.log(serviceProviderData)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);

  return (
    <>
     <div className="min-h-screen flex flex-col">
        <Navbar/>
        <h1 className="bg-red">seller id is {data.id}</h1>
     </div>
    </>
  )    
}