import axios from "axios";
import { useContext, useEffect, useState } from "react";
import userData from "../Contexts/UserContext";
import { Await, useLocation, useNavigate } from "react-router-dom";
import Card from "./Card";
import FilterBox from "./InlineForm";
import ServiceProviderForm from "../Static Components/ServiceProviderForm";
import SearchBox from "../Static Components/SearchBox";
import Loading from "../Static Components/Loading";
import ModelForm from "./ModalForm";
import MyForm from "./InlineForm";
import Navbar from "../Static Components/Navbar";

export default function UserHomePage(){
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading,setisloading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null);
  const { username, user_id,isServiceProvider,handleIsLoading,isloading } = useContext(userData);
  const [serviceProviders,setServiceProviders] = useState([])
  const [distance, setDistance] = useState(2);
  const [shopName, setShopName] = useState('');
  const [rating, setRating] = useState('');
//   const location = useLocation();
//   const locationData = location.state;
  useEffect(()=>{
  getLocation();
  getServiceProviderData();
  },[])
  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("User denied the request for geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setError("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            setError("An unknown error occurred.");
            break;
          default:
            setError("An unknown error occurred.");
        }
      }
    );
  };

  async function getServiceProviderData(){
  try{
    setisloading(true)
    const response = await axios.get('http://127.0.0.1:8000/ServiceProvider/')
    if(response.status === 200){
      setServiceProviders(response.data)
      console.log(response.data)
   }
  }
  catch(error){
   console.log('error occured')
   setisloading(false)
  }
  finally{
    console.log(errorMessage)
    setisloading(false)
  }  
   }

   const handleDistanceChange = (event) => {
    setDistance(event.target.value);
  };

  const handleShopNameChange = (event) => {
    setShopName(event.target.value);
  };

  const handleRatingChange = (event) => {
    console.log(rating)
    setRating(event.target.value);
  };
  function handleSubmit(e){
    e.preventDefault();
  }
// 
 // calcute distance method
 function calculateDistance(lat1, lon1,lat2, lon2) {
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

  serviceProviders.forEach((element)=>
  {
    element['distance'] = calculateDistance(latitude,longitude,element.latitude,element.longitude) 
  })
  console.log('service provider is ')
  console.log(serviceProviders)

  return (
        <>
        {isLoading && <div className='absolute top-0 left-0 flex flex-row justify-center align-center items-center backdrop-sepia-0 h-full w-full backdrop-blur-sm z-10'>
          <p className='text-3xl text-slate-600 drop-shadow-2xl'>Loading...</p>
          </div>}
          <Navbar/> 
          <><form className="flex flex-col md:flex-row md:items-center md:justify-center p-4" onSubmit={handleSubmit}>
          {/* Distance Select Box */}
          <div className="mb-4 md:mb-0 md:mr-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Distance
            </label>
            <select
              className="w-full md:w-24 px-4 py-2 border rounded-md"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            >
              <option value="2">2 km</option>
              <option value="3">3 km</option>
              <option value="5">5 km</option>
              <option value="10">10 km</option>
              <option value="15">15 km</option>
              <option value="20">20 km</option>
            </select>
          </div>
          {/* Shop Name Textfield */}
          <div className="mb-4 md:mb-0 md:mr-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Search by Shop Name
            </label>
            <input
              className="w-full md:w-48 px-4 py-2 border rounded-md"
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
          </div>
    
          {/* Rating Filter Select */}
        </form></>
            {/*<h1>{`latitude is ${latitude} and longitude is ${longitude} and the user is ${username} and userid is ${user_id}`}</h1>*/}
          {isServiceProvider && <h1>Service Provider </h1>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {serviceProviders.filter(item=>item.orginazation_name.includes(shopName)).filter(item=>item.distance<=distance).map(item=>{
            console.log(item)
            return (<Card key={item.id} item={item} lon1 = {longitude} lat1 = {latitude} lat2 = {item.latitude} lon2={item.longitude}></Card>)
          })}
          </div>
        </>
      )
    }
    
    