
import React, { useEffect, useState } from "react";
import Prevas from '../assets/Prevas-Entre-Portal-UI-assets/SVG/Logo-Head-Prevas-Stockholm.svg';
import ArrowLeft from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-left.svg';
import ArrowRight from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-right.svg';
import FAQIcon from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-FAQ.svg";
import Home from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-Home.svg";
import {Link} from "react-router-dom";
import { fetchData } from "../service/DataFetching";
import OptionalField from "../components/OptionalFIeld.tsx";

// Assuming the shape of your FAQ data matches the SQL table structure
interface FAQ {
    id: number;
    title: string;
    info: string;
    address?: string;
    contact?: string;
    image?: string;
}

const FAQScreen: React.FC = () => {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFetching, setIsFetching] = useState(true); // State to indicate if data is being fetched

    useEffect(() => {
        const fetchFAQData = async () => {
            setIsFetching(true);
            const data: FAQ[] = await fetchData('/faq');
            setFaqs(data);
            setIsFetching(false);
        };

        fetchFAQData();
    }, []);

    if (isFetching) return <div>Loading...</div>; // Loading state

    const getPreviousIndex = () => currentIndex === 0 ? faqs.length - 1 : currentIndex - 1;
    const getNextIndex = () => currentIndex === faqs.length - 1 ? 0 : currentIndex + 1;

    const handlePreviousClick = () => setCurrentIndex(getPreviousIndex());
    const handleNextClick = () => setCurrentIndex(getNextIndex());

    const currentEntry = faqs[currentIndex] || {};

    const renderParagraphsFromText = (text: string) => {
        return text.split(';').map((item, index) => (
            <p key={index}>{item.trim()}</p>
        ));
    };

    // Ensure current entry is defined or provide a fallback
    if (!currentEntry) return <div>No FAQ data available.</div>;

    return (
        <div className="app">
            <header className="header">
                <img src={Prevas} className='header-text' alt='Prevas'/>
                <Link className='header-icon' to="/"><img src={Home} alt='Home'/></Link>
            </header>
            <div className="subheader faq-header single-side">
                <img src={FAQIcon} className='subheader-icon' alt='FAQ'/>
                <div className='subheader-title'>FAQ</div>
            </div>
            <main className="content">
                <div className="content-card">
                    {currentEntry.image && <img className="content-image" src={currentEntry.image} alt="FAQ"/>}
                    <div className="content-details smaller-text">
                        <h2 className="content-name faq-name">{currentEntry.title}</h2>
                        {renderParagraphsFromText(currentEntry.info)}
                        <OptionalField label="Plats" value={currentEntry.address} />
                        <OptionalField label="Kontakta" value={currentEntry.contact} />
                    </div>
                </div>
            </main>

            <footer className="footer">
                {faqs.length > 1 && (
                    <>
                        <button onClick={handlePreviousClick} aria-label="Go to previous">
                            <img src={ArrowLeft} className="arrow-left" alt=''/>
                            <div className='footer-text'>Föregående</div>
                        </button>
                        <button onClick={handleNextClick} aria-label="Go to next">
                            <div className='footer-text'>Nästa</div>
                            <img src={ArrowRight} className="arrow-right" alt=''/>
                        </button>
                    </>
                )}
            </footer>
        </div>
    );
};

export default FAQScreen;


