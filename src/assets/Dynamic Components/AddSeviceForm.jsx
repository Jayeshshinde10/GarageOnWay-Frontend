// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import userData from '../Contexts/UserContext';

// const AddServiceForm = ({ initialData = null, onCancel }) => {
//   const [formData, setFormData] = useState({
//     name: initialData ? initialData.name : '',
//     description: initialData ? initialData.description : '',
//     price: initialData ? initialData.price : 400,
//     vehicleType: initialData ? initialData.vehicle_type : 0,
//   });
//   const { user_id, serviceProvider_id } = useContext(userData);

//   async function onSubmit() {
//     try {
//       const postRequest = await axios.post('http://127.0.0.1:8000/Service/', {
//         name: formData.name,
//         description: formData.description,
//         price: formData.price,
//         vehicleType:Number(formData.vehicleType),
//         serviceProvider_id: serviceProvider_id,
//       });
//       if (postRequest.status === 201) {
//         alert("Service Added. Please Check");
//       }
//     } catch (error) {
//       console.log("the error is " + error);
//       alert("An error has occurred");
//     } finally {
//       console.log("Finally block executed");
//     }
//   }

//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         name: initialData.name,
//         description: initialData.description,
//         price: initialData.price,
//         vehicleType: initialData.vehicle_type,
//       });
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit();
//   };

//   return (
//     <div className="container mx-auto">
//       vehicle type is{formData.vehicleType}
//       <div className="bg-white shadow-md p-4 rounded-md">
//         <h2 className="text-lg font-bold mb-2">{initialData ? 'Edit' : 'Add'} Service</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="mb-4">
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">Service Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter service name"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter service description"
//                 rows="3"
//                 required
//               ></textarea>
//             </div>
//             <div className="mb-4">
//               <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
//               <input
//                 type="number"
//                 id="price"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter service price"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
//               <select
//                 id="vehicleType"
//                 name="vehicleType"
//                 value={formData.vehicleType}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 required
//               >
//                 <option value={4}>Car</option>
//                 <option value={2}>Motorcycle</option>
//                 <option value={3}>Truck</option>
//               </select>
//             </div>
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
//             >
//               {initialData ? 'Save' : 'Add'} Service
//             </button>
//             {onCancel && (
//               <button
//                 type="button"
//                 onClick={onCancel}
//                 className="ml-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddServiceForm;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import userData from '../Contexts/UserContext';

const AddServiceForm = () => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState(400);
  const [vehicle_type,setvehicleType] = useState()
  const { user_id, serviceProvider_id } = useContext(userData);

  async function onSubmit() {
    try {
      const postRequest = await axios.post('http://127.0.0.1:8000/Service/', {
        name:name,
        description:description,
        price:price,
        vehicle_type:vehicle_type,
        serviceProvider_id:serviceProvider_id,
      });
      if (postRequest.status === 201) {
        alert("Service Added. Please Check");
      }
    } catch (error) {
      console.log("the error is " + error);
      alert("An error has occurred");
    } finally {
      console.log("Finally block executed");
    }
  }

  useEffect(() => {
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="container mx-auto w-full"> 
      <div className="bg-white shadow-md p-4 rounded-md">
        <h2 className="text-lg font-bold mb-2">
        </h2>
        vehicle type is {vehicle_type}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Service Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter service name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e)=>{setDescription(e.target.value)}}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter service description"
                rows="2"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                                type="number"
                                id="price"
                                name="price"
                                value={price}
                                onChange={(e)=>{setPrice(e.target.value)}}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter service price"
                                required
                              />
                            </div>
                            <div className="mb-4">
                              <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">
                                Vehicle Type
                              </label>
                              <select
                                id="vehicleType"
                                name="vehicleType"
                                value={vehicle_type}
                                onChange={(e)=>{
                                 setvehicleType(e.target.value)
                                }}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                              >
                                <option value={"Car"}>Car</option>
                                <option value={'Motorcycle'}>Motorcycle</option>
                                <option value={'Truck'}>Truck</option>
                                <option value={'RickShaw'}>Rickshaw</option>
                        
                              </select>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <button
                              type="submit"
                              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            >
                              ADD SERVICE
                            </button>
                            </div>
                        </form>
                      </div>
                    </div>
                  );
                };
                
                export default AddServiceForm;
                