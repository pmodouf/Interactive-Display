import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import CustomInput from "../components/CustomInput.tsx";
import Prevas from "../assets/Prevas-image.png"; // Ensure correct path

// Define the Event interface
interface Event {
    title: string;
    descript: string;
    dateOf: string; // Assuming ISO format date string
    startTime?: string;
    location?: string;
    responsible?: string;
    note?: string;
    other?: string;
    imageUrl?: string;
}

const AddEvent: React.FC = () => {
    const [event, setEvent] = useState<Event>({
        title: '',
        descript: '',
        dateOf: '',
        startTime: '',
        location: '',
        responsible: '',
        note: '',
        other: '',
        imageUrl: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!event.title || !event.dateOf || !event.descript) {
            alert('Please fill in all required fields.');
            return;
        }
        const toSubmit = {
            ...event,
            imageUrl: event.imageUrl || Prevas // If no image URL is provided, use the Prevas image path
        };
        const baseUrl = import.meta.env.VITE_API_BASE_URL; // Adjust if necessary
        try {
            const response = await axios.post(`${baseUrl}/api/event/`, toSubmit);
            console.log(response.data);
            alert('Event added successfully!');
            // Reset the form
            setEvent({
                title: '',
                descript: '',
                dateOf: '',
                startTime: '',
                location: '',
                responsible: '',
                note: '',
                other: '',
                imageUrl: ''
            });
        } catch (error) {
            console.error(error);
            alert('Failed to add event.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group add-product-form">
                    {/* Include CustomInput for each field */}
                    <CustomInput type="text" name="title" value={event.title} onChange={handleChange}
                                 placeholder="Title"/>
                    <CustomInput type="text" name="descript" value={event.descript} onChange={handleChange}
                                 placeholder="Description"/>
                    <input type="date" name="dateOf" value={event.dateOf} onChange={handleChange}/>
                    <input type="time" name="startTime" value={event.startTime} onChange={handleChange}/>
                    <CustomInput type="text" name="location" value={event.location} onChange={handleChange}
                                 placeholder="Location (Optional)"/>
                    <CustomInput type="text" name="responsible" value={event.responsible} onChange={handleChange}
                                 placeholder="In charge (Optional)"/>
                    <CustomInput type="text" name="note" value={event.note} onChange={handleChange}
                                 placeholder="Note (Optional)"/>
                    <CustomInput type="text" name="other" value={event.other} onChange={handleChange}
                                 placeholder="Other (Optional)"/>
                    <CustomInput type="text" name="imageUrl" value={event.imageUrl} onChange={handleChange}
                                 placeholder="Image (Optional)"/>
                    <button type="submit" className="submit-button">Add Event</button>
                </div>
            </form>
        </div>
);
};

export default AddEvent;
