import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import CustomInput from "../components/CustomInput.tsx";
import Prevas from "../assets/Prevas-image.png";

// Define an interface for the quiz state
interface Quiz {
    question: string;
    correct: string;
    wrong_a: string;
    wrong_b: string;
    image_link1?: string;
    image_link2?: string;
    answer?: string; // Optional based on your schema
}

const AddQuiz: React.FC = () => {
    const [quiz, setQuiz] = useState<Quiz>({
        question: '',
        correct: '',
        wrong_a: '',
        wrong_b: '',
        image_link1: '',
        image_link2: '',
        answer: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setQuiz({ ...quiz, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!quiz.question || !quiz.correct || !quiz.wrong_a || !quiz.wrong_b) {
            alert('Please fill in all required fields.');
            return;
        }
        const toSubmit = {
            ...quiz,
            image_link1: quiz.image_link1 || Prevas // If no image URL is provided, use the Prevas image path
        };
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/quiz/`, toSubmit);
            console.log(response.data);
            alert('Quiz added successfully!');
            // Reset the form after successful submission
            setQuiz({ question: '', correct: '', wrong_a: '', wrong_b: '', image_link1: '', image_link2: '', answer: '' });
        } catch (error) {
            console.error(error);
            alert('Failed to add quiz.');
        }
    };

    return (
        <div className="form-container ">
        <form onSubmit={handleSubmit}>
    <div className="form-group add-product-form">
        <CustomInput type="text" name="question" value={quiz.question} onChange={handleChange} placeholder="Question"/>
        <CustomInput type="text" name="correct" value={quiz.correct} onChange={handleChange} placeholder="Correct Answer"/>

        <CustomInput type="text" name="wrong_a" value={quiz.wrong_a} onChange={handleChange} placeholder="Wrong Answer A"/>
        <CustomInput type="text" name="wrong_b" value={quiz.wrong_b} onChange={handleChange} placeholder="Wrong Answer B"/>

        <CustomInput type="text" name="image_link1" value={quiz.image_link1} onChange={handleChange} placeholder="Image Link 1 (Optional)"/>

        <CustomInput type="text" name="image_link2" value={quiz.image_link2 || ''} onChange={handleChange} placeholder="Image Link 2 (Optional)"/>

        <CustomInput type="text" name="answer" value={quiz.answer || ''} onChange={handleChange} placeholder="Detailed Answer (Optional)"/>

        <button type="submit" className="submit-button">Add Quiz</button>
    </div>
    </form>
    </div>
);
};

export default AddQuiz;
