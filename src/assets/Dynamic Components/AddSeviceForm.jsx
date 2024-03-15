import React, { useState } from 'react';

const AddServiceForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 400,
    vehicleType: 2,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, like sending data to backend or storing in state
    console.log(formData);
  };

  return (
    <div className="w-full bg-white shadow-md p-8 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Service Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter service name"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter service description"
              rows="3"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter service price"
              required
            />
          </div>
          <div>
            <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
            <select
              id="vehicleType"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="1">Car</option>
              <option value="2">Motorcycle</option>
              <option value="3">Truck</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddServiceForm;
