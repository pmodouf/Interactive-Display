import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import CustomInput from "../components/CustomInput.tsx";
import Prevas from "../assets/Prevas-image.png"; // Ensure the path to CustomInput is correct

// Define the Business interface
interface FAQ {
    title: string;
    info: string;
    adress?: string;
    contact?: string;
    image: string;
}

const AddFaq: React.FC = () => {
    const [faq, setBusiness] = useState<FAQ>({
        title: '',
        info: '',
        adress: '',
        contact: '',
        image: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBusiness({ ...faq, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!faq.title || !faq.info) {
            alert('Please fill in all required fields.');
            return;
        }
        const toSubmit = {
            ...faq,
            image: faq.image || Prevas // If no image URL is provided, use the Prevas image path
        };
        // Replace with your actual API base URL and business endpoint
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        try {
            const response = await axios.post(`${baseUrl}/api/faq/`, toSubmit);
            console.log(response.data);
            alert('Faq added successfully!');
            // Reset the form after successful submission
            setBusiness({
                title: '',
                info: '',
                adress: '',
                contact: '',
                image: ''
            });
        } catch (error) {
            console.error(error);
            alert('Failed to add faq.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="add-business-form">
                <div className="form-group add-product-form">
                    <CustomInput type="text" name="title" value={faq.title} onChange={handleChange}
                                 placeholder="Title"/>
                    <label>Add ";" in Info where you want row jump</label>
                    <CustomInput type="text" name="info" value={faq.info} onChange={handleChange}
                                 placeholder="Info (Add ; for new row)"/>
                    <CustomInput type="text" name="adress" value={faq.adress || ''} onChange={handleChange}
                                 placeholder="Address (Optional)"/>
                    <CustomInput type="text" name="contact" value={faq.contact || ''} onChange={handleChange}
                                 placeholder="Contact (Optional)"/>
                    <CustomInput type="text" name="image" value={faq.image} onChange={handleChange}
                                 placeholder="Image URL(Optional)"/>
                    <button type="submit" className="submit-button">Add Faq</button>
                </div>
            </form>
        </div>
    );
};

export default AddFaq;
