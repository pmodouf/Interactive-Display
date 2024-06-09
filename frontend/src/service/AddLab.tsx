import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import CustomInput from "../components/CustomInput.tsx";
import Prevas from '../assets/Prevas-image.png'; // Make sure this path is correct
interface Lab {
    title: string;
    info: string;
    contact?: string;
    image?: string;
}
const AddLab: React.FC = () => {
    const [lab, setLab] = useState<Lab>({
        title: '',
        info: '',
        contact: '',
        image: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLab({ ...lab, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!lab.title || !lab.info ) {
            alert('Please fill in all required fields.');
            return;
        }
        const toSubmit = {
            ...lab,
            image: lab.image || Prevas // Use the Prevas image if no image URL is provided
        };
        // Replace with your actual API base URL and lab endpoint
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        try {
            const response = await axios.post(`${baseUrl}/api/labb/`, toSubmit);
            console.log(response.data);
            alert('Lab added successfully!');
            // Reset the form after successful submission
            setLab({
                title: '',
                info: '',
                contact: '',
                image: ''
            });
        } catch (error) {
            console.error(error);
            alert('Failed to add lab.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="add-lab-form">
                <div className="form-group add-product-form">
                    <CustomInput type="text" name="title" value={lab.title} onChange={handleChange} placeholder="Title"/>
                    <CustomInput type="text" name="info" value={lab.info} onChange={handleChange} placeholder="Info"/>
                    <CustomInput type="text" name="contact" value={lab.contact} onChange={handleChange} placeholder="Contact (Optional)"/>
                    <CustomInput type="text" name="image" value={lab.image} onChange={handleChange} placeholder="Image URL (Optional)"/>
                    <button type="submit" className="submit-button">Add Lab</button>
                </div>
            </form>
        </div>
    );
};

export default AddLab;
