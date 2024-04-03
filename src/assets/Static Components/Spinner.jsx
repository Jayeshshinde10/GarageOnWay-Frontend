import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <svg className="animate-spin h-10 w-10 mr-2" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <p className="text-xl text-gray-400">Loading...</p>
    </div>
  );
};

export default Spinner;
