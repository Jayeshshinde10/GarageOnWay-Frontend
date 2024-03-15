import React, { useState } from 'react';

const MyForm = () => {
  // States for form fields
  const [distance, setDistance] = useState('');
  const [shopName, setShopName] = useState('');
  const [rating, setRating] = useState('');

  return (
    <form className="flex flex-col md:flex-row md:items-center md:justify-center p-4">
      {/* Distance Select Box */}
      <div className="mb-4 md:mb-0 md:mr-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Distance
        </label>
        <select
          className="w-full md:w-24 px-4 py-2 border rounded-md"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        >
          <option value="2">2 km</option>
          <option value="3">3 km</option>
          <option value="4">4 km</option>
        </select>
      </div>

      {/* Shop Name Textfield */}
      <div className="mb-4 md:mb-0 md:mr-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Search by Shop Name
        </label>
        <input
          className="w-full md:w-48 px-4 py-2 border rounded-md"
          type="text"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
        />
      </div>

      {/* Rating Filter Select */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Filter by Rating
        </label>
        <select
          className="w-full md:w-24 px-4 py-2 border rounded-md"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">All Ratings</option>
          <option value="5">5 stars</option>
          <option value="4">4 stars</option>
          <option value="3">3 stars</option>
          <option value="2">2 stars</option>
          <option value="1">1 star</option>
        </select>
      </div>
    </form>
  );
};

export default MyForm;
