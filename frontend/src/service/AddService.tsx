import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import CustomInput from "../components/CustomInput.tsx";
import Prevas from '../assets/Prevas-image.png'; // Ensure you have a default image

// Define an interface for the service state based on your service table schema
interface Service {
    title: string;
    info: string;
    address?: string;
    contact?: string;
    image?: string;
}

const AddService: React.FC = () => {
    const [service, setService] = useState<Service>({
        title: '',
        info: '',
        address: '',
        contact: '',
        image: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setService({ ...service, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!service.title || !service.info) {
            alert('Please fill in all required fields.');
            return;
        }
        // Assign Prevas image if no image link is provided
        const payload = {
            ...service,
            image: service.image || Prevas
        };
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/service/`, payload);
            console.log(response.data);
            alert('Service added successfully!');
            // Reset form
            setService({ title: '', info: '', address: '', contact: '', image: '' });
        } catch (error) {
            console.error(error);
            alert('Failed to add service.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="add-product-form">
                <div className="form-group">
                    <CustomInput type="text" name="title" value={service.title} onChange={handleChange} placeholder="Title"/>
                    <label>Add ";" in Info for new line jump</label>
                    <CustomInput type="text" name="info" value={service.info} onChange={handleChange} placeholder="Info (Add a ; for new line)"/>
                    <CustomInput type="text" name="address" value={service.address || ''} onChange={handleChange} placeholder="Address (Optional)"/>
                    <CustomInput type="text" name="contact" value={service.contact || ''} onChange={handleChange} placeholder="Contact (Optional)"/>
                    <CustomInput type="text" name="image" value={service.image || ''} onChange={handleChange} placeholder="Image URL (Optional)"/>
                </div>
                <button type="submit" className="submit-button">Add Service</button>
            </form>
        </div>
    );
};

export default AddService;
