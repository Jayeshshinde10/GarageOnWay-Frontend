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
import BookSlot from './assets/Dynamic Components/BookSlot';
import UserDashBoard from './assets/Dynamic Components/UserDashBoard';
import ServiceProviderDashBoard from './assets/Dynamic Components/ServiceProviderDashBoard';
import EmailConfirmationMessage from './assets/Static Components/Activation';
import ServiceProviderServices from './assets/Dynamic Components/ServiceProviderServices';
import ProfileComponent from './assets/Dynamic Components/ProfileComponent';

export default function App() {
  const [username, setUsername] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [user_id, setUser_Id] = useState(null)
  const [isServiceProvider, setServiceProvider] = useState(false)
  const [serviceproviderdata, setServiceProviderdata] = useState(false)
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [serviceProvider_id, setServiceProvider_id] = useState(null)

  // Usage example:
  //const user_id = 123; // Assuming user_id is defined somewhere
  function handleIsLoading() {
    setIsLoading(false)
  }
  function handleLogout() {
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
  async function CheckLogin() {
    try {

      const token = localStorage.getItem('access_token')
      if (token) {
        console.log("the token is   " + token)
        try {
          const response = await axios.get('https://garageonway-backend.onrender.com/verifyToken/', {
            headers: { 'Authorization': `Bearer ${token}` }
          });

          if (response.status === 200) {
            // set USer Logged In     
            console.log(token)
            const username = await axios.post('https://garageonway-backend.onrender.com/getUsername/',
              { access_token: token })
            // set here the username
            if (username.status === 200) {
              console.log(username.data)
              setUsername(username.data.username)
              setUser_Id(username.data.userid)
              setIsLoggedIn(true)
              setServiceProvider(username.data.serviceProvider)
              if (isServiceProvider) {setServiceProvider_id(username.data.serviceProvider_id)}
              else{
                setServiceProvider_id(null)
              }
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
              console.log("is service Provider " + isServiceProvider)
            }
          }
        } catch (error) {
          console.error('Error:', error.message);
          setIsLoggedIn(false)
        }
      }
    }
    catch (error) {
      console.error('Error:', error.message);
    }
    finally {
      console.log("finally block")
    }
  }

  useEffect(() => {
    CheckLogin();
    handleCancelledRequest()
      ;
  }, [isLoggedIn])

  async function handleCancelledRequest() {
    try {
      const response = await axios.get('/order/');
      if (response.status === 200) {
        const data = response.data;
        console.log(response.data)
        console.log('user_id is ' + user_id)
        const filteredData = data.filter(item => (item.customer_id === user_id) && ((item.is_Approved === false) && (item.is_cancelled === false)));
        console.log("User data for cancelled requests:");
        console.log(filteredData);

        for (const item of filteredData) {
          const minutesDiff = getMinutesDifference(item.request_time);
          console.log(`Minutes difference for request ${item.id}: ${minutesDiff}`);
          if (minutesDiff >= 1) { // Cancel requests older than 1 hour
            const cancelResponse = await axios.patch(`https://garageonway-backend.onrender.com/order/${item.id}/`, {
              is_cancelled: true
            });

            console.log(`Request ${item.id} cancelled:`, cancelResponse.data);

          }

        }
      } else {
        console.error("Failed to fetch data. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error fetching or processing data:", error);
      // Handle specific errors here based on error.response.status, etc.
    } finally {
      console.log('Finally block executed.');
    }
  }

  function getMinutesDifference(requestTime) {
    const requestDate = new Date(requestTime);
    const now = new Date();
    const diffInMs = Math.abs(now - requestDate);
    return Math.floor(diffInMs / (1000 * 60));
  }


  return (
    <>
      {/* {isloading && <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-blur">
      <div className="text-white text-4xl">Loading...</div>
    </div>} */}

      <userData.Provider value={{ serviceProvider_id, handleCancelledRequest, isLoggedIn, isLoading, handleIsLoading, handleLogout, username, user_id, isServiceProvider, serviceproviderdata }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path='/login' element={<LoginBox></LoginBox>} />
            <Route path='/contact/' element={<ContactUs></ContactUs>} />
            <Route path='/registration/' element={<Register></Register>} />
            <Route path='/UserHome/' element={<UserHomePage></UserHomePage>} />
            <Route path='/About/' element={<About></About>} />
            <Route path='/bookSlot/' element={<BookSlot></BookSlot>} />
            <Route path='/userdashboard/' element={<UserDashBoard></UserDashBoard>}></Route>
            <Route path='/serviceProviderDashboard/' element={<ServiceProviderDashBoard />}></Route>
            <Route path='/activation' element={<EmailConfirmationMessage />}></Route>
            <Route path='/serviceProviderHome' element={<ServiceProviderServices/>}></Route>
            <Route path='/Profile' element={<ProfileComponent/>}></Route>
          </Routes>
        </BrowserRouter>
      </userData.Provider>
    </>
  );
}

