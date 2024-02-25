import React from 'react';

const Card = ({ title, image, about, price, openingHours, landmark, onRequestClick }) => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
      <div className="w-1/4 bg-cover bg-center" style={{ backgroundImage: `url(${'https://cdn.pixabay.com/photo/2024/02/16/15/36/recipe-8577854_1280.jpg'})` }}>
        {/* Optional placeholder to indicate image loading or error */}
        {/* <div className="w-full h-full bg-gray-200 animate-pulse" /> */}
      </div>
      <div className="p-4 flex flex-col md:flex-grow">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-2">{about}</p>
        <div className="flex items-center mb-1">
          <span className="text-gray-500 mr-1">Price:</span>
          <span className="font-semibold">{price}</span>
        </div>
        <div className="flex items-center mb-1">
          <span className="text-gray-500 mr-1">Hours:</span>
          <span>{openingHours}</span>
        </div>
        <div className="flex items-center mb-1">
          <span className="text-gray-500 mr-1">Landmark:</span>
          <span>{landmark}</span>
        </div>
        <button
          className="inline-flex items-center px-2 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:ring-4 focus:ring-purple-500 focus:outline-none"
          onClick={onRequestClick}
        >
          Make Request
          <svg className="ml-1 -mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293z" clipRule="evenodd" />
          </svg>
        </button>
        {/* book a slot button and make immediate request*/}
        <button
          className="inline-flex items-center px-2 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:ring-4 focus:ring-purple-500 focus:outline-none"
          onClick={onRequestClick}
        >
          Book a Slot
          <svg className="ml-1 -mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Card;
