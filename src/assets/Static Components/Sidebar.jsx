import React, { useState } from "react";
import './Sidebar.css'
export default function Sidebar(toggleSidebar) {
    return (
        <>
        
        <div className="fixed top-0 right-0 w-full h-full bg-gradient-to-r from-purple-700 to-pink-500">
            <div className="flex flex-col justify-start py-10 ">
                <div className="flex flex-row text-white justify-evenly">
                    <div className="absolute top-3 left-5 text-3xl" onClick={toggleSidebar}>x</div>
                    <div className="text-5xl">GW</div></div>
            </div>
            <div className="text-white">
            <ul className="flex flex-col p-4">
        <li className="mb-2 hover:bg-violet-700 p-2 rounded-md">
          <a href="#">Dashboard</a>
        </li>
        <li className="mb-2 hover:bg-violet-700 p-2 rounded-md">
          <a href="#">Settings</a>
        </li>
        <li className="mb-2 hover:bg-violet-700 p-2 rounded-md">
          <a href="#">Logout</a>
        </li>
      </ul>
            </div>
            </div>    
        </>
    );
}