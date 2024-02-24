import axios from "axios";
import { useContext, useEffect, useState } from "react";
import userData from "../Contexts/UserContext";
export default function UserHomePage() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { username, user_id } = useContext(userData);

  useEffect(() => {
    getLocation();
    postLocation();
  }, [])
  async function postLocation() {
    try {
      let response = await axios.post(`http://127.0.0.1:8000/CheckEntryExists/`,{Customer_id:Number(user_id)})
      console.log(" the user id is " + user_id)
      if (response.status === 200) {
        console.log(" the user id is " + response.data.id)
        if (response.data.id != 'not found')
          response = await axios.patch(`http://127.0.0.1:8000/customer/${response.data.id}/`, {
          latitude: Number(latitude),
          longitude: Number(longitude),
        })
        console.log("if block executed ")
      }
      else {
          response = await axios.post("http://127.0.0.1:8000/customer/", {
          latitude: Number(latitude),
          longitude: Number(longitude),
          Customer_id: Number(user_id),
        })
        console.log(" else block executed ")
      }
    }
    catch (error) {
      console.log("the error is" + error)
    }
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setErrorMessage(error.message);
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser.");
    }
  };
  return (
    <>
      <h1>{`latitude is ${latitude} and longitude is ${longitude} and the user is ${username}`}</h1>
    </>
  )
}