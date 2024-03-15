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
const {isLoggedIn} = useContext(userData)
useEffect(() => {
  if(!isLoggedIn) navigator('/login')
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
  // getLocation();
  fetchData();
}, []);

  return (
    <>
    
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Your Shopping App</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Shop Now
        </button>
      </header>
      <main className="container mx-auto px-4 py-16">
        <section className="flex flex-col md:flex-row items-center">
          <img src={data.image1} alt="Welcome to Shopping App" className="w-full md:w-1/2 rounded-lg mb-4 md:mb-0" />
          <div className="w-full md:w-1/2 ml-0 md:ml-4">
            <h2 className="text-2xl font-bold mb-4">Welcome to a World of Shopping</h2>
            <p className="text-gray-700 text-lg">Discover a wide variety of products from trusted sellers.</p>
          </div>
        </section>
        <hr className="my-8 border-gray-200" />
        <h3 className="text-xl font-bold mb-4">What Our Sellers Provide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-bold mb-2">Wide Selection</h4>
            <p className="text-gray-700">Find everything you need from a vast collection of products.</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-bold mb-2">Competitive Prices</h4>
            <p className="text-gray-700">Enjoy great deals and compare prices from different sellers.</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg md:hidden"> {/* Responsive: Hide on medium screens */}
            <h4 className="font-bold mb-2">Secure Transactions</h4>
            <p className="text-gray-700">Shop with confidence using our secure payment gateway.</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hidden md:block"> {/* Responsive: Show on medium screens */}
            <h4 className="font-bold mb-2">Secure Transactions</h4>
            <p className="text-gray-700">Shop with confidence using our secure payment gateway.</p>
          </div>
        </div>
      </main>
    </div>

    </>
  )    
}