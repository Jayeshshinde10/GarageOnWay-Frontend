import React, { useState } from 'react';
import axios from 'axios';

const ServiceProciderHome = () => {
  const [formData, setFormData] = useState({
    image1: null,
    image2: null,
    orginazation_name: '',
    closing_time: '',
    opening_time: '',
    latitude: 0,
    longitude: 0,
    near_by_landmark: 'nothing',
    phone_number: ''
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];
      if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        setFormData({
          ...formData,
          [name]: file
        });
      } else {
        alert('Please select a JPG or PNG file.');
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({
            ...formData,
            latitude,
            longitude
          });
          try {
            // Make POST request using Axios
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
              formDataToSend.append(key, value);
            });
            await axios.post('YOUR_API_ENDPOINT', formDataToSend);
            // Handle success
            console.log('Form submitted successfully');
          } catch (error) {
            // Handle error
            console.error('Error submitting form:', error);
          }
        },
        (error) => {
          console.error('Error getting geolocation:', error);
          // Handle geolocation error
        }
      );
    } else {
      console.error('Geolocation is not supported');
      // Handle case where geolocation is not supported
    }
  };

  return (
    <form className="mx-auto max-w-4xl" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="image1" className="block mb-1 text-gray-700">Image 1:</label>
          <input type="file" id="image1" name="image1" accept=".jpg, .png" onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="image2" className="block mb-1 text-gray-700">Image 2:</label>
          <input type="file" id="image2" name="image2" accept=".jpg, .png" onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="organization_name" className="block mb-1 text-gray-700">Organization Name:</label>
          <input type="text" id="organization_name" name="organization_name" value={formData.organization_name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="opening_time" className="block mb-1 text-gray-700">Opening Time:</label>
          <input type="time" id="opening_time" name="opening_time" value={formData.opening_time} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="closing_time" className="block mb-1 text-gray-700">Closing Time:</label>
          <input type="time" id="closing_time" name="closing_time" value={formData.closing_time} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="near_by_landmark" className="block mb-1 text-gray-700">Nearby Landmark:</label>
          <input type="text" id="near_by_landmark" name="near_by_landmark" value={formData.near_by_landmark} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="phone_number" className="block mb-1 text-gray-700">Phone Number:</label>
          <input type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Submit</button>
    </form>
  );
};

export default ServiceProciderHome;
