import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const ServiceProviderServices = ({}) => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
  
    useEffect(() => {
      async function fetchServices() {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/services/`);
          const filterdata = response.data.filter(item=>item.serviceprovider_id===6)
          setServices(filterdata);

        } catch (error) {
          console.error('Error fetching services:', error);
        }
      }
      fetchServices();
    }, []);
  
    const handleEdit = (service) => {
      setSelectedService(service);
      setIsEditing(true);
    };
  
    const handleDelete = async (serviceId) => {
      try {
        await axios.delete(`http://127.0.0.1:8000/services/${serviceId}/`);
        setServices(services.filter(service => service.id !== serviceId));
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    };
  
    const handleSubmitEdit = async (editedService) => {
      try {
        await axios.patch(`http://127.0.0.1:8000/services/${editedService.id}/`, editedService);
        setServices(services.map(service => service.id === editedService.id ? editedService : service));
        setSelectedService(null);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating service:', error);
      }
    };
  
    return (
      <div>
        {isEditing ? (
          <AddServiceForm
            initialData={selectedService}
            onSubmit={handleSubmitEdit}
            onCancel={() => {
              setSelectedService(null);
              setIsEditing(false);
            }}
          />
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">Services</h2>
            <ul>
              {services.map(service => (
                <li key={service.id} className="mb-4">
                  <div>
                    <p className="font-semibold">{service.name}</p>
                    <p>{service.description}</p>
                    <p>Price: ${service.price}</p>
                    <p>Vehicle Type: {service.vehicle_type}</p>
                  </div>
                  <div className="mt-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="mr-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default ServiceProviderServices;