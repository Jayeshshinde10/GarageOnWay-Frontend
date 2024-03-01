import axios from "axios";
import { useContext, useEffect, useState } from "react";
import userData from "../Contexts/UserContext";
import { Await } from "react-router-dom";
import Card from "./Card";
import FilterBox from "./FilterBox";
import ServiceProviderForm from "../Static Components/ServiceProviderForm";
import SearchBox from "../Static Components/SearchBox";
import Loading from "../Static Components/Loading";
import ModelForm from "./ModalForm";
export default function UserHomePage() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { username, user_id,isServiceProvider,handleIsLoading,isloading } = useContext(userData);
  const [serviceProviders,setServiceProviders] = useState([])
  useEffect(() => {
  getLocation();
  getServiceProviderData();
  // handleIsLoading()
  }, [])
   
  const getLocation = () => {
    try {
      if (navigator.geolocation) {
        const options = {
          enableHighAccuracy: true, // Set this to true for high accuracy
        };
        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            console.log("the accuracy is " + position.coords.accuracy);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            setErrorMessage(error.message);
          },
          options
        );
  
        // Optionally, you can store the watchId if you want to clear the watch later
        // For example, you can use navigator.geolocation.clearWatch(watchId) to stop watching
  
      } else {
        setErrorMessage("Geolocation is not supported by this browser.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
   async function getServiceProviderData(){
   const response = await axios.get('http://127.0.0.1:8000/ServiceProvider/')
   if(response.status === 200){
    setServiceProviders(response.data)
    console.log("the type of serviceproviders data is "+serviceProviders)
    console.log(response.data)
   }  
   }
   
  return (
    <>
    {isloading? <Loading/>:
      <><h1>{`latitude is ${latitude} and longitude is ${longitude} and the user is ${username}`}</h1>
      
      {isServiceProvider && <h1>Service Provider </h1>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {serviceProviders.map(item=>{
        console.log(item)
        return (<Card title={item.oraginazation_name} key={item.id} landmark={item.near_by_landmark} openingHours={item.opening_time} lon1 = {longitude} lat1 = {latitude}lat2 = {item.latitude} lon2={item.longitude}></Card>)
      })}
      </div>
    </>}
      {/* <ServiceProviderForm></ServiceProviderForm> */}
    </>
  )
}