import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import axios from "axios";
import AccountCreationSuccess from "./Activation";

export default function Register() {
  const [username, setUsername] = useState('')
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUserNameExist, SetIsUserNameExist] = useState(false)
  const [isEmailExists, SetIsEmailExists] = useState(false)
  const [message, setMessage] = useState({ 'upperMessage': "", "lowerMessage": "" });
  const [isCreated, SetIsCreated] = useState('')
  const [isServiceProvider, setIsServiceProvider] = useState(false);
  const navigator = useNavigate()

  const handleRadioChange = () => {
    setIsServiceProvider(!isServiceProvider);
  };
  function submitForm(e) {
    e.preventDefault();
    if (isEmailExists == false && isUserNameExist == false) {
      axios.post(
        '/register/',
        {
          username: username,
          fname: fname,
          lname: lname,
          email: email,
          password: password,
          isServiceProvider:isServiceProvider
        }
      ).then((response) => {
        console.log("the data is " + response.data.data);
        if (response.data.data === "Account created successfully") {
          // how to add the functionality of account created successfully
          SetIsCreated(true)
        }
      });
    }
    if (isEmailExists == true || isUserNameExist == true) {
      console.log("else block executed")
      document.getElementById("register_button").disabled = true;
    }
  }
  function recheckPassword(e) {
    console.log(e.target.value)
    if (password === '') {
      setMessage({ upperMessage: 'Pls Fill This field First', 'lowerMessage': "" })
      e.target.value = ""
    }
    else {
      if (e.target.value != password.substring(0, e.target.value.length)) {
        setMessage({ upperMessage: '', 'lowerMessage': "⚠️password is not matching with above field" })
        // document.getElementById("register_button").disabled = true;
      }
    }
  }
  function handleUserExists() {
    axios.post("/UsernameExists/", {
      username: username,
      email: email
    }).then((response) => {
      console.log("the data is " + response.data.data);
      if (response.data.data === "username already exist") {
        SetIsUserNameExist(true);
      }
      else {
        SetIsUserNameExist(false);
      }
    });
  }
  function handleEmailExists() {
    console.log("function got executed")
    axios.post("/EmailExists/", {
      email: email
    }).then((response) => {
      console.log("the data is " + response.data.data);
      if (response.data.data === "email already exist") {
        SetIsEmailExists(true);
      }
      else {
        SetIsEmailExists(false);
      }
    });
  }

  useEffect(() => {
    handleUserExists();
  }, [username])

  useEffect(() => {
    handleEmailExists();
  }, [email]);
  if(isCreated){
    return(<>
    <AccountCreationSuccess/>
    </>)
  }
  // if (isCreated) {
  //   // navigator('/activation')
  // }
  // else {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 to-pink-500">
          <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
            <Link to={"/"} className="text-purple-700 hover:underline mb-4 flex items-center">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            </Link>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Register</h2>
            <form onSubmit={submitForm} >
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                  Username:
                </label>
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    console.log(fname)
                  }}
                  type="text"
                  id="firstName"
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your first name"
                  required
                />
                {isUserNameExist && <p className="text-red-700">😐 This Username is already registered </p>}
              </div>

              <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                  First Name
                </label>
                <input
                  value={fname}
                  onChange={(e) => {
                    setFname(e.target.value)
                    console.log(fname)
                  }}
                  type="text"
                  id="firstName"
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your first name"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                  Last Name
                </label>
                <input
                  value={lname}
                  onChange={(e) => {
                    setLname(e.target.value)
                    console.log(lname)
                  }}
                  type="text"
                  id="lastName"
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your last name"
                  required
                />
              </div>

              <div className="mb-4 flex items-center">
                <label className="block text-gray-700 text-sm font-bold mb-2">Register As Service Provider</label>
        
                  <input
                    type="radio"
                    id="serviceProviderRadio"
                    name="userType"
                    checked={isServiceProvider}
                    onChange={(e) => {
                      setIsServiceProvider(e.target.value)
                      console.log(isServiceProvider)
                    }}
                    className="form-radio h-5 w-5 ml-10 text-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  />

              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    console.log(email)
                  }}
                  type="email"
                  id="email"
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
                {isEmailExists && <p className="text-red-700">😐 This Email has already been registrered</p>}

              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    console.log(password)
                  }}
                  type="password"
                  id="password"
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your password"
                  required
                />
                {message.upperMessage}
              </div>
              <div className="mb-6">
                <label htmlFor="retypePassword" className="block text-sm font-medium text-gray-600">
                  Retype Password
                </label>
                <input
                  required
                  onChange={(e) => recheckPassword(e)}
                  type="password"
                  id="retypePassword"
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Retype your password"
                />
                {message.lowerMessage}
              </div>
              <button
                onClick={() => console.log("pressed")}
                id="register_button"
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              // disabled= { message.lowerMessage === ''? "False": "True" }
              // implement letter 
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </>
    )
  // }
}
