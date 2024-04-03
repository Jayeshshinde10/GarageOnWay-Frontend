import { useState,useContext,useEffect } from "react";
import userData from "../Contexts/UserContext";
import Navbar from "../Static Components/Navbar";
import { useNavigate } from 'react-router-dom';
import AddServiceForm from './AddSeviceForm';
import ServiceProviderForm from './ServiceProviderForm';
import ServicesList from './ServicesList';
import axios from "axios";
export default function ServiceProviderServices(){
    const [error, setError] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const { username, user_id, isLoggedIn, serviceProvider_id } = useContext(userData);
    const [isLoading, setIsLoading] = useState(true);
    const [serviceProviderOrder, setServiceProviderOrder] = useState([]);
    const navigate = useNavigate()
    useEffect(()=>{
        if(isLoggedIn ===false){
            navigate('/login')
        }
      getLocation();
      fetchServicesData();
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
    async function fetchServicesData() {
            try {
              const response = await axios.get(`http://127.0.0.1:8000/order/`);
              if (response.status === 200) {
                console.log(response.data);
                const filterdata = response.data.filter((item) => item.ServiceProvider_id === user_id);
                console.log(filterdata);
                setServiceProviderOrder(filterdata);
              }
            } catch (error) {
              console.error(`Error fetching data: ${error.message}`);
              setError(error.message);
            } finally {
              setIsLoading(false);
            }
          }
    return (
      <>
      <Navbar/>
      {isLoading && (
          <div className='absolute top-0 left-0 flex flex-row justify-center align-center items-center backdrop-sepia-0 h-full w-full backdrop-blur-sm z-10'>
            <p className='text-3xl text-slate-600 drop-shadow-2xl'>Loading...</p>
          </div>
        )}
        {error && (
          <div className='absolute top-0 left-0 flex flex-row justify-center align-center items-center backdrop-sepia-0 h-full w-full backdrop-blur-sm z-10'>
            <p className='text-3xl text-red-600 drop-shadow-2xl'>Error: {error}</p>
          </div>
        )}
  <div className="flex h-screen bg-gray-100">
    <div className="flex-1 p-8">
      {serviceProvider_id ? (
        <>
          <AddServiceForm />
          <ServicesList />
         {/* <Dashboard/> */}
        </>
      ) : (
        latitude && <ServiceProviderForm latitude={latitude} longitude={longitude} />
      )}
    </div>
  </div>
      </>
    
    )
  }