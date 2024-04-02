// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import RequestCard from './RequestCard';

// function Dashboard() {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/order/'); // Replace with your API endpoint
//         setData(response.data);
//       } catch (error) {
//         setError(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleApproveRequest = async (requestId) => {
//     try {
//       const response = await axios.patch(`http://127.0.0.1:8000/order/${requestId}/`, {
//         is_Approved: true,
//         approval_time: new Date().toISOString(),
//       });
//       setData(data.map((request) => (request.id === requestId ? response.data : request)));
//     } catch (error) {
//       console.error('Error approving request:', error);
//     }
//   };

//   const handleUpdatePrice = async (requestId, price) => {
//     try {
//       const response = await axios.patch(`http://127.0.0.1:8000/order/${requestId}/`, {
//         price,
//       });
//       setData(data.map((request) => (request.id === requestId ? response.data : request)));
//     } catch (error) {
//       console.error('Error updating price:', error);
//     }
//   };

//   const handleMarkPaid = async (requestId) => {
//     try {
//       const response = await axios.patch(`http://127.0.0.1:8000/order/${requestId}/`, {
//         is_paid: true,
//         payment_time: new Date().toISOString(),
//       });
//       setData(data.map((request) => (request.id === requestId ? response.data : request)));
//     } catch (error) {
//       console.error('Error marking paid:', error);
//     }
//   };

//   // Additional functions for handling cancel request, view details, etc.

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {error && <div className="alert alert-danger" role="alert">{error.message}</div>}
//      X
//      {data.length > 0 ? (
//         data.map((request) => (
//           <RequestCard
//             key={request.id}
//             request={request}
//             handleApproveRequest={handleApproveRequest}
//             handleUpdatePrice={handleUpdatePrice}
//             handleMarkPaid={handleMarkPaid}
//             // Pass additional functions for handling cancel request, view details, etc.
//           />
//         ))
//       ) : (
//         <div className="text-center">No requests found.</div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;
 
