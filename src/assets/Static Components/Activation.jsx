import React from 'react';

const AccountCreationSuccess = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-400 to-blue-500">
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Account Created Successfully!</h2>
        <p className="text-lg text-gray-600 mb-8">Welcome to our platform. Your account has been created successfully.</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          <a href ="/login">Login To Our Account</a>
        </button>
      </div>
    </div>
  );
};

export default AccountCreationSuccess;
