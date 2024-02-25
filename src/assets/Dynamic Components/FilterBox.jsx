import React from 'react';

const FilterBox = () => {
  return (
    <form className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-8 rounded-lg shadow-md border-2 border-white flex flex-col lg:flex-row lg:space-x-4 items-center justify-center">
      <div className="mb-4 lg:mb-0 w-full lg:w-1/4">
        <label className="text-white" htmlFor="inlineFormName">
          Name
        </label>
        <input
          type="text"
          className="form-input p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-white"
          id="inlineFormName"
          placeholder="John Doe"
        />
      </div>

      <div className="mb-4 lg:mb-0 w-full lg:w-1/4">
        <label className="text-white" htmlFor="inlineFormEmail">
          Email
        </label>
        <input
          type="email"
          className="form-input p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-white"
          id="inlineFormEmail"
          placeholder="john@example.com"
        />
      </div>

      <div className="mb-4 lg:mb-0 w-full lg:w-1/4">
        <label className="text-white" htmlFor="inlineFormPhone">
          Phone
        </label>
        <input
          type="tel"
          className="form-input p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-white"
          id="inlineFormPhone"
          placeholder="555-1234"
        />
      </div>

      <div className="mb-4 lg:mb-0 w-full lg:w-1/4">
        <label className="text-white" htmlFor="inlineFormCountry">
          Country
        </label>
        <select className="form-select p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-white" id="inlineFormCountry">
          <option selected disabled>Choose...</option>
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="uk">United Kingdom</option>
        </select>
      </div>

      <div className="w-full mt-6 lg:mt-0">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 hover:bg-blue-600">
          Submit
        </button>
      </div>
    </form>
  );
};

export default FilterBox;
