import axios from "axios";
import { useContext, useEffect, useState } from "react";
import userData from "../Contexts/UserContext";
import { Await, useNavigate } from "react-router-dom";
import Card from "./Card";
import FilterBox from "./InlineForm";
import ServiceProviderForm from "../Static Components/ServiceProviderForm";
import SearchBox from "../Static Components/SearchBox";
import Loading from "../Static Components/Loading";
import ModelForm from "./ModalForm";
import MyForm from "./InlineForm";
export default function UserHomePage() {
  const navigator = useNavigate()
  const [isLoading,setisloading] = useState(true)
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { username, user_id,isServiceProvider,handleIsLoading,isloading } = useContext(userData);
  const [serviceProviders,setServiceProviders] = useState([])
  const [distance, setDistance] = useState('2 kilometers');
  const [shopName, setShopName] = useState('');
  const [rating, setRating] = useState('');
   
  useEffect(() => {
    if (isServiceProvider) navigator('/serviceProviderDashboard')
    getLocation();
    getServiceProviderData();
    }, [])

    async function getLocation() {
      try {
        setisloading(true);
        if (navigator.geolocation) {
          const options = {
            enableHighAccuracy: true, // Set this to true for high accuracy
          };
    
          const position = await new Promise((resolve, reject) => {
            const watchId = navigator.geolocation.getCurrentPosition(
              (position) => {
                resolve(position);
              },
              (error) => {
                reject(error);
              },
              options
            );
            });
    
          console.log("the accuracy is " + position.coords.accuracy);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        } else {
          throw new Error("Geolocation is not supported by this browser.");
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setisloading(false);
      }
    }
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
   isloading(false)
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

  serviceProviders.forEach((element)=>
  {
    element['distance'] = calculateDistance(latitude,longitude,element.latitude,element.longitude) 
  })
  console.log('service provider is ')
  console.log(serviceProviders)
  console.log("latitude is "+latitude)
  return (
    <>
    {isLoading && <div className='absolute top-0 left-0 flex flex-row justify-center align-center items-center backdrop-sepia-0 h-full w-full backdrop-blur-sm z-10'>
      <p className='text-3xl text-slate-600 drop-shadow-2xl'>Loading...</p>
      </div>} 
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
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Filter by Rating
        </label>
        <select
          className="w-full md:w-24 px-4 py-2 border rounded-md"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">All Ratings</option>
          <option value="5">5 stars</option>
          <option value="4">4 stars</option>
          <option value="3">3 stars</option>
          <option value="2">2 stars</option>
          <option value="1">1 star</option>
        </select>
      </div>
    </form></>
        <h1>{`latitude is ${latitude} and longitude is ${longitude} and the user is ${username} and userid is ${user_id}`}</h1>
      {isServiceProvider && <h1>Service Provider </h1>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {serviceProviders.filter(item=>item.orginazation_name.includes(shopName)).map(item=>{
        console.log(item)
        return (<Card key={item.id} item={item} lon1 = {longitude} lat1 = {latitude}lat2 = {item.latitude} lon2={item.longitude}></Card>)
      })}
      </div>
    </>
  )
}