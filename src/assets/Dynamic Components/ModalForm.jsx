// Modal.js
import React, { useState } from 'react';

const ModalForm = ({ isOpen, closeModal }) => {
  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? 'opacity-100 pointer-events-auto':'opacity-0 pointer-events-none'
      } transition-opacity duration-300 flex items-center justify-center`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white w-full max-w-md p-4 rounded-md shadow-md z-10">
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:shadow-outline-blue"
          >
            X
          </button>
        </div>
        <div className="mt-4">
          <p className="text-lg font-semibold">Modal Content Goes Here</p>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
