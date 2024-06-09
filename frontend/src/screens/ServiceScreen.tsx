import React, { useEffect, useState } from "react";
import Prevas from '../assets/Prevas-Entre-Portal-UI-assets/SVG/Logo-Head-Prevas-Stockholm.svg';
import ArrowLeft from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-left.svg';
import ArrowRight from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-right.svg';
import Services from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-services.svg';
import Home from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-Home.svg';
import { Link } from "react-router-dom";
import { fetchData } from "../service/DataFetching";
import OptionalField from "../components/OptionalFIeld.tsx";

// Assuming the shape of your service data matches the SQL table structure
interface Service {
    id: number;
    title: string;
    info: string;
    address?: string;
    contact?: string;
    image: string;
}

const ServiceScreen: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchServiceData = async () => {
            const data = await fetchData('/service'); // Adjust the endpoint if necessary
            // Assuming your service data is already sorted or you want to sort it here
            setServices(data);
        };

        fetchServiceData();
    }, []);

    const getPreviousIndex = () => currentIndex === 0 ? services.length - 1 : currentIndex - 1;
    const getNextIndex = () => currentIndex === services.length - 1 ? 0 : currentIndex + 1;

    const handlePreviousClick = () => setCurrentIndex(getPreviousIndex());
    const handleNextClick = () => setCurrentIndex(getNextIndex());

    const currentEntry = services[currentIndex] || {}; // Handle case where services is empty

    const renderParagraphsFromText = (text: string) => {
        return text.split(';').map((item, index) => (
            <p key={index}>{item.trim()}</p>
        ));
    };

    return (
        <div className="app">
            <header className="header">
                <img src={Prevas} className='header-text' alt='Prevas'/>
                <Link className='header-icon' to="/"> {/* Use Link to navigate to home */}
                    <img src={Home} alt='Home'/>
                </Link>
            </header>
            <div className="subheader service-header single-side">
                <img src={Services} className='subheader-icon' alt='eventicon'/>
                <div className='subheader-title'>Våra Tjänster</div>
            </div>
            <main className="content">
                <div className="content-card">
                    <img className="content-image" src={currentEntry.image} alt={currentEntry.title}/>
                    <div className="content-details smaller-text">
                        <h2 className="content-name service-name">{currentEntry.title}</h2>
                        {currentEntry.info && renderParagraphsFromText(currentEntry.info)}
                        <OptionalField label="Plats" value={currentEntry.address} />
                        <OptionalField label="Kontakt" value={currentEntry.contact} />
                    </div>
                </div>
            </main>
            <footer className="footer">
                {services.length > 1 && (
                    <>
                        <button onClick={handlePreviousClick} aria-label="Go to previous">
                            <img src={ArrowLeft} className="arrow-left" alt=''/>
                            <div className='footer-text'>Föregående: {services[getPreviousIndex()].title}</div>
                        </button>
                        <button onClick={handleNextClick} aria-label="Go to next">
                            <div className='footer-text'>Nästa: {services[getNextIndex()].title}</div>
                            <img src={ArrowRight} className="arrow-right" alt=''/>
                        </button>
                    </>
                )}
            </footer>
        </div>
    );
};

export default ServiceScreen;
