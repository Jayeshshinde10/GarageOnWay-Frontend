import React, { useState, useEffect } from 'react';

const ServiceProviderForm = ({latitude,longitude}) => {
    const [formData, setFormData] = useState({
        image1: null,
        image2: null,
        organization_name: '',
        closing_time: '',
        opening_time: '',
        latitude:latitude,
        longitude:longitude,
        near_by_landmark: '',
        phone_number: '',
      });
      const [validationErrors, setValidationErrors] = useState({});
      const [submitError, setSubmitError] = useState('');
    
      const handleChange = (event) => {
        const { name, value, files } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: files ? files[0] : value,
        }));
      };
    
      const validateForm = () => {
        const errors = {};
    
        if (!formData.image1) {
          errors.image1 = 'Please upload the first image.';
        }
        if (!formData.image2) {
          errors.image2 = 'Please upload the second image.';
        }
        if (!formData.organization_name) {
          errors.organization_name = 'Please enter your organization name.';
        }
        if (!validateTime(formData.closing_time)) {
          errors.closing_time = 'Invalid closing time format (HH:MM).';
        } else if (!validateTime(formData.opening_time)) {
          errors.opening_time = 'Invalid opening time format (HH:MM).';
        } else if (!validateTimeOrder(formData.closing_time, formData.opening_time)) {
          errors.closing_time = 'Closing time should be after opening time.';
        }
        if (!validateIndianPhone(formData.phone_number)) {
          errors.phone_number = 'Invalid Indian phone number format (10 digits).';
        }
    
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitError('');
    
        if (validateForm()) {
          try {
            // Submit form data
            const response = await axios.post('your-api-endpoint', formData);
            console.log('Form data submitted:', response.data);
            setFormData({
              image1: null,
              image2: null,
              organization_name: '',
              closing_time: '',
              opening_time: '',
              near_by_landmark: '',
              phone_number: '',
            });
            setValidationErrors({}); // Clear errors after successful submission
          } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitError('An error occurred while submitting the form. Please try again.');
          } finally {
            // Any final cleanup or actions can go here
          }
        }
      };
    
      const validateTime = (time) => {
        const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
        return timeRegex.test(time);
      };
    
      const validateTimeOrder = (closingTime, openingTime) => {
        const closingTimeHours = parseInt(closingTime.split(':')[0], 10);
        const closingTimeMinutes = parseInt(closingTime.split(':')[1], 10);
        const openingTimeHours = parseInt(openingTime.split(':')[0], 10);
        const openingTimeMinutes = parseInt(openingTime.split(':')[1], 10);
        if (closingTimeHours < openingTimeHours) {
          return true; // Closing time is after opening time if hours differ
        } else if (closingTimeHours === openingTimeHours && closingTimeMinutes <= openingTimeMinutes) {
          return false; // Closing time should be after opening time if hours are the same
        }
        return true; // Closing time is after opening time
      };
    
      const validateIndianPhone = (phone) => {
        const phoneRegex = /^\d{10}$/; // 10 digits for Indian phone numbers
        return phoneRegex.test(phone);
      };
    
      useEffect(() => {
        // Handle image preview or upload logic here (optional)
      }, [formData.image1, formData.image2]); // Update on image changes
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gradient-vibrant leading-tight">
        Set up Your Account
      </h2>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-wrap justify-center space-x-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="image1" className="text-sm font-medium text-gray-700">
              Image 1 (Upload):
            </label>
            <input
              type="file"
              id="image1"
              name="image1"
              accept="image/*"
              className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none rounded-md border border-gray-300 p-2"
              onChange={handleChange}
            />
            {validationErrors.image1 && (
              <p className="text-xs text-red-500">{validationErrors.image1}</p>
            )}

            <label htmlFor="organization_name" className="text-sm font-medium text-gray-700">
              Organization Name:
            </label>
            <input
              type="text"
              id="organization_name"
              name="organization_name"
              value={formData.organization_name}
              onChange={handleChange}
              className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none rounded-md border border-gray-300 p-2"
            />
            {validationErrors.organization_name && (
              <p className="text-xs text-red-500">{validationErrors.organization_name}</p>
            )}

            <label htmlFor="closing_time" className="text-sm font-medium text-gray-700">
              Closing Time:
            </label>
            <input
              type="time"
              id="closing_time"
              name="closing_time"
              value={formData.closing_time}
              onChange={handleChange}
              className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none rounded-md border border-gray-300 p-2"
            />
            {validationErrors.closing_time && (
              <p className="text-xs text-red-500">{validationErrors.closing_time}</p>
            )}

            <label htmlFor="near_by_landmark" className="text-sm font-medium text-gray-700">
              Near By Landmark:
            </label>
            <input
              type="text"
              id="near_by_landmark"
              name="near_by_landmark"
              value={formData.near_by_landmark}
              onChange={handleChange}
              className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none rounded-md border border-gray-300 p-2"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="image2" className="text-sm font-medium text-gray-700">
              Image 2 (Upload):
            </label>
            <input
              type="file"
              id="image2"
              name="image2"
              accept="image/*"
              className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none rounded-md border border-gray-300 p-2"
              onChange={handleChange}
            />
            {validationErrors.image2 && (
              <p className="text-xs text-red-500">{validationErrors.image2}</p>
            )}

            <label htmlFor="opening_time" className="text-sm font-medium text-gray-700">
              Opening Time:
            </label>
            <input
              type="time"
              id="opening_time"
              name="opening_time"
              value={formData.opening_time}
              onChange={handleChange}
              className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none rounded-md border border-gray-300 p-2"
            />
            {validationErrors.opening_time && (
              <p className="text-xs text-red-500">{validationErrors.opening_time}</p>
            )}

            <label htmlFor="phone_number" className="text-sm font-medium text-gray-700">
              Phone Number (India):
            </label>
            <input
              type="tel" // Use "tel" input type for phone numbers
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none rounded-md border border-gray-300 p-2"
              pattern="[0-9]{10}" // Pattern for 10-digit Indian phone numbers
            />
            {validationErrors.phone_number && (
              <p className="text-xs text-red-500">{validationErrors.phone_number}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-600 font-medium shadow-sm text-sm"
          >
            Set Up Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceProviderForm;
