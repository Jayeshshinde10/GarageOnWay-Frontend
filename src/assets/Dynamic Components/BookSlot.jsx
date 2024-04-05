import userData from "../Contexts/UserContext";
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Static Components/Navbar";
import ServiceComponent from "./UserServiceList";
import ResponsiveGoogleMap from "./GoogleMaps";
import ResponsiveIframe from "./BookslotMaps";

export default function BookSlot() {
  const location = useLocation()
  const data = location.state
  const [serviceProviderData, setServiceProviderData] = useState()
  const { isLoggedIn } = useContext(userData)
  const navigator = useNavigate()
  const generateGoogleMapsEmbedUrl = (latitude, longitude) => {
    const embedUrl = "https://www.google.com/maps/embed";
    const queryParameters = [
        "pb=!1m16!1m12!1m3!1d111798.15148182338",
        `!2d${longitude}!3d${latitude}`,
        "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
        "!2m1!1s",
        "!5e0!3m2!1sen!2sus!4v1390839289319c" // Added query parameter to set marker
    ];
    return `${embedUrl}?${queryParameters.join("")}`;
}

const mapUrl = `${generateGoogleMapsEmbedUrl(data.latitude, data.longitude)}`;
  useEffect(() => {
    if (isLoggedIn === false) navigator('/login')
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/ServiceProvider/${data.id}`);
        setServiceProviderData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 text-white">
        <header className="bg-transparent py-4 px-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">{data.orginazation_name}</h1>
        </header>
        <main className="container mx-auto px-4 py-16">
          <section className="flex flex-col md:flex-row items-center">
            <img src={data.image1} alt="Welcome to Shopping App" className="w-full md:w-1/2 rounded-lg mb-4 md:mb-0" />
            {/* <ResponsiveGoogleMap  latitude={data.latitude} longitude={data.longitude} width={400} height={400}/> */}
            <div className="w-full md:w-1/2 ml-0 md:ml-4 text-left">
    
              <h2 className="text-2xl font-bold mb-4">Welcome To {data.orginazation_name}</h2>
              <p className="text-gray-200 text-lg">Discover a wide variety of Vehicle Services at cheap and affordable Rates</p>
            </div>
            
          </section>
          <hr className="my-8 border-gray-200" />
          <h3 className="text-xl font-bold mb-4 text-white">What {data.orginazation_name} provide 🚗</h3>
          <ServiceComponent serviceprovider_id={data.id} orginazation_name={data.orginazation_name}/>
        </main>
      </div>
    </>
  )
}
