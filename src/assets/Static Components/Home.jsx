import ImageBox from "./Imagebox";
import { useContext, useEffect } from "react";
import userData from "../Contexts/UserContext";
import UserHomePage from "../Dynamic Components/UserHomePage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ServiceProviderForm from "./ServiceProviderForm";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";

export default function Home(){
    const { isLoggedIn, isServiceProvider } = useContext(userData);
    const navigate = useNavigate();
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);
    const location = {
        latitude,longitude
    }
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
    
    useEffect(() => {
            // getLocation();
            console.log("latitude is "+latitude)
            if(isLoggedIn){
            if (isServiceProvider){
                navigate("/serviceProviderDashboard",{state:location});
            } else {
                navigate("/UserHome/",{state:location});
            } 
        }
    }, [isLoggedIn, isServiceProvider, navigate]);

    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Navbar/>
                <div className="container mx-auto p-4 flex-1">
                    <div className="max-w-2xl mx-auto text-center">
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Welcome to GarageOnWay</h1>
                        <p className="text-gray-600">"Empowering Your Journey: Where Precision Meets Performance in Every Service Mile."</p>
                    </div>
                </div>
                <ImageBox/>
                <footer className="bg-gradient-to-r from-purple-700 to-pink-500 text-white p-8 mt-8">
                    <div className="container mx-auto text-center">
                        <p>&copy; 2023 Your Company. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    )
}

