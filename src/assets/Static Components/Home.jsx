import ImageBox from "./Imagebox";
import { useContext, useState } from "react";
import userData from "../Contexts/UserContext";
import UserHomePage from "../Dynamic Components/UserHomePage";
export default function Home(){
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const {isLoggedIn,username} = useContext(userData);
    console.log(" is logged in is :"+isLoggedIn)

    console.log("in user home got the "+{username})
    return (
        <>
        <div className="min-h-screen flex flex-col">
            <nav className="bg-gradient-to-r from-purple-700 to-pink-500 p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="text-white text-4xl font-semibold">GW</div>
                    <div className="hidden md:flex space-x-4">
                        <a href="#" className="text-white hover:text-gray-300">Home</a>
                        <a href="#" className="text-white hover:text-gray-300">About</a>
                        <a href="#" className="text-white hover:text-gray-300">Services</a>
                        <a href={isLoggedIn ? "/logout" :"/login"} className="text-white hover:text-gray-300">{isLoggedIn ? "Logout" :"Login"} </a>
                    </div>
                    <div className="md:hidden">
                        <button onClick={toggleSidebar} className="text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
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
        </>
    )
}