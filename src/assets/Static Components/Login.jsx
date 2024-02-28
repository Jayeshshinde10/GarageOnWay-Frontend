import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import userData from '../Contexts/UserContext';
import App from '../../App';

function LoginBox() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const Navigator = useNavigate()
  const user = useContext(userData);
  console.log("the user is logged in or not ",)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    axios
      .post("http://127.0.0.1:8000/gettoken/", {
        username: credentials.username,
        password: credentials.password,
      })
      .then((response) => {
        console.log(response.data.access);
        localStorage.removeItem('access_token')
        localStorage.setItem('access_token', JSON.stringify(response.data.access)); 
        Navigator('/')
        location.reload()
        
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <Link to={"/"} className="text-purple-700 hover:underline mb-4 flex items-center">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        </Link>
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Login</h1>
        <form onSubmit={handleSubmit} action='http://127.0.0.1:8000/login/' method='POST'>
        <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:shadow-outline"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-800 to-pink-600 hover:from-purple-700 hover:to-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              console.log('form submitted');
            }}
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">Don't have an account? <Link to={"/registration"} className="text-purple-700 hover:underline">Sign up here</Link></p>
      </div>
    </div>
  );
}

 export default LoginBox;


