// import React, { useState } from 'react';
// import { classNames } from 'tailwindcss/classnames';

// function RequestCard({ request, handleApproveRequest, handleUpdatePrice, handleMarkPaid }) {
//   const [isEditingPrice, setIsEditingPrice] = useState(false);
//   const [price, setPrice] = useState(request.price || ''); // Set default price if not provided

//   const handleApprove = async () => {
//     if (handleApproveRequest) {
//       await handleApproveRequest(request.id);
//     }
//   };

//   const handlePriceChange = (event) => {
//     setPrice(event.target.value);
//   };

//   const handleUpdate = async () => {
//     if (handleUpdatePrice) {
//       await handleUpdatePrice(request.id, price);
//       setIsEditingPrice(false); // Close editing mode
//     }
//   };

//   const handleMarkPayment = async () => {
//     if (handleMarkPaid) {
//       await handleMarkPaid(request.id);
//     }
//   };

//   return (
//     <div className="bg-white shadow rounded-lg overflow-hidden mb-4">
//       <div className="px-4 py-5 border-b border-gray-200">
//         <h2 className="text-lg font-semibold text-gray-900">{request.vehicle_name}</h2>
//         <p className="text-gray-700 mt-2">{request.description}</p>
//         <div className="flex mt-4">
//           <div className="mr-4">
//             <p className="text-sm text-gray-600">Status:</p>
//             <p className={classNames(
//               'text-sm font-semibold',
//               request.is_cancelled ? 'text-red-500' : (
//                 request.is_Approved ? 'text-green-500' : 'text-yellow-500'
//               )
//             )}>{request.is_cancelled ? 'Cancelled' : (request.is_Approved ? 'Approved' : 'Pending Approval')}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-600">Request Type:</p>
//             <p className="text-sm font-semibold">{request.request_type}</p>
//           </div>
//         </div>
//       </div>
//       {request.is_Approved && request.is_Completed && request.request_type === 'immediate' && (
//         <div className="px-4 py-4 border-t border-gray-200">
//           {isEditingPrice ? (
//             <div className="flex items-center">
//               <input
//                 type="number"
//                 className="w-full mr-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-1"
//                 value={price}
//                 onChange={handlePriceChange}
//               />
//               <button className="btn btn-sm btn-primary" onClick={handleUpdate}>
//                 Update Price
//               </button>
//             </div>
//           ) : (
//             <>
//               <p className="text-sm text-gray-600">Price:</p>
//               <p className="text-sm font-semibold">{request.price || 'N/A'}</p>
//               <button className="btn btn-sm mt-2" onClick={() => setIsEditingPrice(true)}>
//                 Edit Price
//               </button>
//             </>
//           )}
//         </div>
//       )}
//       {request.is_Approved && request.request_type === 'slot' && (
//         <div className="px-4 py-4 border-t border-gray-200">
          
//           <button
//             className={classNames(
//               'btn btn-sm',
//               request.is_paid ? 'bg-green-500 text-white' : 'btn-primary'
//             )}
//             onClick={handleMarkPayment}
//             disabled={request.is_paid}
//           >
//             {request.is_paid ? 'Marked Paid' : 'Mark Paid'}
//           </button>
//         </div>
//       )}
//       <div className="px-4 py-3 border-t border-gray-200 flex justify-end items-center">
//         {request.is_Approved && !request.is_completed && (
//           <button className="btn btn-sm btn-danger" onClick={() => handleCancelRequest(request.id)}>
//             Cancel Request
//           </button>
//         )}
//         <button className="btn btn-sm ml-2" onClick={() => handleViewDetails(request.id)}>
//           View Details
//         </button>
//       </div>
//     </div>
//   );
// }

// export default RequestCard;
