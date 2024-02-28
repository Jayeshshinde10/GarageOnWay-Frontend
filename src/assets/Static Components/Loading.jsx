import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div>
      <span className="ml-4 text-xl font-semibold text-gray-700">Loading...</span>
    </div>
  );
};

export default Loading;
