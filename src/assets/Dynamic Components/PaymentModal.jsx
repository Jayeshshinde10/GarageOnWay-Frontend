import React, { useState } from 'react';
import axios from 'axios';
function PaymentModal({ handlepaynow ,onPaymentSuccess, requestId, isActive,setmodel }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value.replace(/\D/g, '')); // Remove non-digits
  };

  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value.replace(/\D/g, '')); // Remove non-digits
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsProcessing(true);

    try {
      // Simulate payment processing (replace with real integration)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      handlepaynow(requestId);
      setmodel(false);
      // **PUT request to update payment status (modify as needed):**
      console.log("requested id is " +requestId)
      // await axios.put(`http://127.0.0.1:8000/order/${requestId}/`, {
      //   is_paid: true,
      //   payment_time:new Date().toISOString(),
      // })
      //   .then((response) => console.log('Payment status updated successfully!'))
      //   .catch((error) => console.error('Error updating payment status:', error));

      onPaymentSuccess(requestId);
    } catch (error) {
      console.error('Error processing payment:', error);
      // Handle errors appropriately (e.g., display error message to user)
    } finally {
      setIsProcessing(false);
    }
  };
  // Hide modal if not active
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="relative w-full max-w-sm bg-white rounded-lg shadow-xl">
        <div className="p-4">
          <h5 className="text-xl font-medium leading-6 text-gray-900">Payment Information</h5>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="col-span-full">
                <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Card Number</label>
                <input
                  type="text"
                  id="card-number"
                  maxLength={16}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${cardNumber.length !== 16 ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  required
                />
                {cardNumber.length !== 16 && (
                  <div className="mt-1 text-red-500 text-sm bg-red-100 rounded-md p-1">Card number must be 16 digits</div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiry-date"
                    placeholder="MM/YY"
                    maxLength={5}
                    className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${expiryDate.length !== 5 ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    required
                  />
                  {/* Conditional error styling for expiry date */}
                  {expiryDate.length !== 5 && (
                    <div className="mt-1 text-red-500 text-sm bg-red-100 rounded-md p-1">Expiry date must be MM/YY format</div>
                  )}
                </div>
                <div className="col-span-1">
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    maxLength={3}
                    className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${cvv.length !== 3 ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    value={cvv}
                    onChange={handleCvvChange}
                    required
                  />
                  {/* Conditional error styling for CVV */}
                  {cvv.length !== 3 && (
                    <div className="mt-1 text-red-500 text-sm bg-red-100 rounded-md p-1">CVV must be 3 digits</div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-md mr-4"
                onClick={() => {setmodel(false)}}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className={`bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-700 hover:to-violet-800 text-white font-bold py-2 px-4 rounded-md ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isProcessing ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
