import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileComponent = ({ initialData, editUrl, onSubmitSuccess }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({}); // State to store validation errors
  const [apiError, setApiError] = useState(null); // State for API errors

  useEffect(() => {
    setFormData(initialData); // Reset form data on component mount/update
  }, [initialData]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setErrors({}); // Clear errors on edit mode
    setApiError(null); // Clear API error on edit
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.post(editUrl, formData);

      if (response.data.success) {
        setIsEditing(false);
        onSubmitSuccess && onSubmitSuccess(response.data); // Optional callback for success
      } else {
        // Handle server-side validation errors
        setErrors(response.data.errors || {});
      }
    } catch (error) {
      console.error('Error saving account:', error);
      setApiError('An unexpected error occurred. Please try again later.'); // Set generic API error
    }
  };

  const renderField = (field, label, isEditable) => (
    <div key={field} className="flex mb-4 items-center">
      <label htmlFor={field} className="mr-4 text-sm font-medium">
        {label}
      </label>
      {isEditing ? (
        <input
          type="text"
          id={field}
          name={field}
          value={formData[field]}
          onChange={handleChange}
          className={`px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${errors[field] ? 'border-red-500' : ''}`} // Add error border class
        />
      ) : (
        <p className="text-gray-600">{formData[field]}</p>
      )}
      {errors[field] && (
        <span className="text-red-500 text-xs ml-2">{errors[field]}</span>
      )}
    </div>
  );

  return (
    <div
      className={`profile-component bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md rounded-md px-6 py-8 flex flex-col gap-4 ${
        apiError ? 'border border-red-500' : ''
      }`} // Add error border for API errors
    >
      <div className="flex items-center mb-6">
        <div className="relative rounded-full w-20 h-20 overflow-hidden mr-4">
          <img
            src="https://via.placeholder.com/150" // Replace with blank profile image URL
            alt="Profile Picture"
            className="object-cover w-full h-full"
          />
          <div
            className="absolute top-0 right-0 bg-gray-300 hover:bg-gray-400 rounded-full p-1 text-xs cursor-pointer"
            onClick={handleEditClick}
            // Optional: Add icon for edit functionality
          >
            Edit
          </div>
        </div>
        <h2 className="text-xl font-medium text-white">{formData.name}</h2>
      </div>
      {renderField('name', 'Name', isEditing)}
      {renderField('email', 'Email', isEditing)}
      {/* Add other fields as needed */}

      {isEditing ? (
        <div className="flex justify-end">
          <button
            onClick={handleSaveClick}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            Save
            </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 ml-2 text-gray-500 hover:text-gray-700 rounded-md"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={handleEditClick}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
        >
          Edit Account
        </button>
      )}

      {errors && (
        <div className="error-summary text-red-500 text-xs mb-4">
          <ul>
            {Object.values(errors).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {apiError && (
        <div className="api-error-alert bg-red-100 border border-red-400 rounded-md px-4 py-3 text-red-700">
          <span className="font-bold">Error:</span> {apiError}
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;

