import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Home from './assets/Static Components/Home';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import LoginBox from './assets/Static Components/Login';
import About from './assets/Static Components/About';
import ContactUs from './assets/Static Components/ContactUs';
import Register from './assets/Static Components/Register';
import userData from './assets/Contexts/UserContext';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import UserHomePage from './assets/Dynamic Components/UserHomePage';

export default function App(){
const [username,setUsername] = useState('')
const [ isLoggedIn,setIsLoggedIn] = useState('')
const [user_id,setUser_Id] = useState('')
const [isServiceProvider,setServiceProvider] = useState(false)
const [serviceproviderdata,setServiceProviderdata] = useState(false)
const [error , setError] = useState(false)
const [isLoading,setIsLoading] = useState(true)

function handleIsLoading(){
setIsLoading(false)
}
function handleLogout(){
setIsLoggedIn(false);
localStorage.removeItem('access_token')
console.log("the access token removed successfully ")
}


/*

import React from "react";
 const userData = React.createContext({
    isLoggedIn:null,
    handleLogin:()=>{},
    accessToken:'',
    refreshToken:'',
    handleLogout:()=>{},
})
export default userData;

*/
  async function CheckLogin(){
    try{
    
      const token = localStorage.getItem('access_token')
      if (token){
        console.log("the token is   "+token)
        try {
          const response = await axios.get('127.0.0.1:8000/verifyToken/', {
            headers: { 'Authorization': `Bearer ${token}` }
          });

           if(response.status === 200){
            // set USer Logged In     
            console.log(token)
            const username = await axios.post('http://127.0.0.1:8000/getUsername/',
            {access_token:token})
          // set here the username
          if(username.status===200){

          console.log(username.data)
          setUsername(username.data.username)
          setUser_Id(username.data.userid)
          setIsLoggedIn(true)
          setServiceProvider(username.data.serviceProvider)
          handleIsLoading()
          // if(isServiceProvider){
          //   const data = await axios.post('http://127.0.0.1/CheckEntryExist/',{user_id:user_id}) 
          //   if(data.status === 200){
             
          //    setServiceProviderdata(data.data.message)
            
          //   }
          //   else{
          //     setError(false)
          //   }
          // }
          console.log("is service Provider "+isServiceProvider)
             }
            }
        } catch (error) {
          console.error('Error:', error.message);
          setIsLoggedIn(false)
        }
      }
    }
    catch(error){
      console.error('Error:', error.message);
    }
    finally{
      console.log("finally block")
    }
  }
   useEffect(()=>{CheckLogin();},[isLoggedIn])

  return (
    <>
    {/* {isloading && <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-blur">
      <div className="text-white text-4xl">Loading...</div>
    </div>} */}

      <userData.Provider value={{ isLoggedIn, isLoading,handleIsLoading,handleLogout,username,user_id,isServiceProvider,serviceproviderdata }}> 
        <BrowserRouter>
          <Routes>
            <Route path="/" element= {<Home></Home>} />
            <Route path='/login' element={<LoginBox></LoginBox>} />
            <Route path='/contact/' element={<ContactUs></ContactUs>} />
            <Route path='/registration/' element={<Register></Register>} />
            <Route path='/UserHome/' element={<UserHomePage></UserHomePage>} />
            <Route path='/About/' element={<About></About>}/>
          </Routes>
        </BrowserRouter>
      </userData.Provider>
    </>
  );
}

