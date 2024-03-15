import ImageBox from "./Imagebox";
import { useContext, useEffect, useState } from "react";
import userData from "../Contexts/UserContext";
import UserHomePage from "../Dynamic Components/UserHomePage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ServiceProviderForm from "./ServiceProviderForm";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
export default function Home(){
    
    const {isLoggedIn,username,handleLogin,handleLogout,ServiceProviderdata} = useContext(userData);
    console.log(" is logged in is :"+isLoggedIn)

    console.log("in user home got the "+{username})
    return (
        <>
        {/* {ServiceProviderdata ?  */}
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            {isLoggedIn ? <UserHomePage/>:<>
            <div className="container mx-auto p-4 flex-1">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Welcome to GarageOnWay</h1>
                    <p className="text-gray-600">"Empowering Your Journey: Where Precision Meets Performance in Every Service Mile."</p>
                </div>
            </div>
             <ImageBox/></>}
            <footer className="bg-gradient-to-r from-purple-700 to-pink-500 text-white p-8 mt-8">
                <div className="container mx-auto text-center">
                    <p>&copy; 2023 Your Company. All rights reserved.</p>
                </div>
            </footer>
            </div>
            {/* <ServiceProviderForm/>     } */}
         </>
    )
}