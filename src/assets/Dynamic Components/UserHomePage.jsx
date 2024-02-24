import axios from "axios";
import { useContext, useEffect, useState } from "react";
import userData from "../Contexts/UserContext";
import { Await } from "react-router-dom";
import Card from "./Card";
export default function UserHomePage() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { username, user_id } = useContext(userData);

  useEffect(() => {
  getLocation();
  }, [])
  // no need to put location in database as it is available and requires frequent updating
  // async function postLocation() {
  //   try {
  //     let response = await axios.post(`http://127.0.0.1:8000/CheckEntryExists/`,
  //     {Customer_id:Number(user_id),latitude:parseFloat(latitude),longitude:parseFloat(longitude)})
  //     if (response.status === 200) {
  //       console.log(" the user id is " + response.data.message)
  //       console.log("if block executed ")
  //     }
  //   }
  //   catch (error) {
  //     console.log("the error is" + error)
  //   }
  // }

  const getLocation = async () => {
    try {
      if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      } else {
        setErrorMessage("Geolocation is not supported by this browser.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  
  const array = [1,2,3,4,5,6,7,8,9,10]
  return (
    <>
      <h1>{`latitude is ${latitude} and longitude is ${longitude} and the user is ${username}`}</h1>
      <Card/>
      <br></br>
      <Card/>
      <br></br>
      <Card/>
      <br></br>
      <Card/>

    </>
  )
}