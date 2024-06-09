import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import CustomInput from "../components/CustomInput.tsx"; // Ensure the path to CustomInput is correct
import Prevas from '../assets/Prevas-image.png';
// Define the Business interface
interface Business {
    title: string;
    subtitle: string;
    info: string;
    adress?: string;
    contact?: string;
    image: string;
}

const AddBusiness: React.FC = () => {
    const [business, setBusiness] = useState<Business>({
        title: '',
        subtitle: '',
        info: '',
        adress: '',
        contact: '',
        image: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBusiness({ ...business, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!business.title || !business.subtitle || !business.info) {
            alert('Please fill in all required fields.');
            return;
        }
        const toSubmit = {
            ...business,
            image: business.image || Prevas // If no image URL is provided, use the Prevas image path
        };
        // Replace with your actual API base URL and business endpoint
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        try {
            const response = await axios.post(`${baseUrl}/api/business/`, toSubmit);
            console.log(response.data);
            alert('Business added successfully!');
            // Reset the form after successful submission
            setBusiness({
                title: '',
                subtitle: '',
                info: '',
                adress: '',
                contact: '',
                image: ''
            });
        } catch (error) {
            console.error(error);
            alert('Failed to add business.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="add-product-form">
                <div className="form-group">
                    <CustomInput type="text" name="title" value={business.title} onChange={handleChange}
                                 placeholder="Title"/>
                    <CustomInput type="text" name="subtitle" value={business.subtitle} onChange={handleChange}
                                 placeholder="Subtitle/title description"/>
                    <CustomInput type="text" name="info" value={business.info} onChange={handleChange}
                                 placeholder="Info"/>
                    <CustomInput type="text" name="adress" value={business.adress || ''} onChange={handleChange}
                                 placeholder="Address (Optional)"/>
                    <CustomInput type="text" name="contact" value={business.contact || ''} onChange={handleChange}
                                 placeholder="Contact (Optional)"/>
                    <CustomInput type="text" name="image" value={business.image} onChange={handleChange}
                                 placeholder="Image URL(Optional)"/>
                    <button type="submit" className="submit-button">Add Business</button>
                </div>
            </form>
        </div>
);
};

export default AddBusiness;
