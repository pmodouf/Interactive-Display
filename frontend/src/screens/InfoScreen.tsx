import React, { useEffect, useState } from "react";
import Prevas from '../assets/Prevas-Entre-Portal-UI-assets/SVG/Logo-Head-Prevas-Stockholm.svg';
import ArrowLeft from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-left.svg';
import ArrowRight from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-right.svg';
import infoIcon from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-people-search.svg";
import Home from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-Home.svg";
import { Link } from "react-router-dom";
import { fetchData } from "../service/DataFetching";
import OptionalField from "../components/OptionalFIeld.tsx";
 // Verify the path is correct

// Update the Info interface to include an array of image URLs
interface Info {
    id: number; // Assuming each info has a unique ID
    full_name: string;
    email: string;
    title: string;
    phone?: string;
    department?: string;
    location?: string;
    workArea?: string;
    manager?: string;
    imageUrls: string[]; // Use an array for image URLs
}

const InfoScreen: React.FC = () => {
    const [infoData, setInfoData] = useState<Info[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchInfoData = async () => {
            const data = await fetchData("/info");
            if (Array.isArray(data)) {
                const sortedData = data
                    .filter((item): item is Info => 'full_name' in item && typeof item.full_name === 'string') // Ensure each item has a `full_name` property of type string
                    .sort((a, b) => a.full_name.localeCompare(b.full_name)); // Now safe to sort
                setInfoData(sortedData);
            }
        };

        fetchInfoData();
    }, []);

    const handlePreviousClick = () => {
        setCurrentIndex(getPreviousIndex());
        setCurrentImageIndex(0); // Reset the image index when switching entries
    };

    const handleNextClick = () => {
        setCurrentIndex(getNextIndex());
        setCurrentImageIndex(0); // Reset the image index when switching entries
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex(prevIndex => prevIndex === 0 ? infoData[currentIndex].imageUrls.length - 1 : prevIndex - 1);
    };

    const handleNextImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % infoData[currentIndex].imageUrls.length);
    };

    const getPreviousIndex = () => currentIndex === 0 ? infoData.length - 1 : currentIndex - 1;
    const getNextIndex = () => currentIndex === infoData.length - 1 ? 0 : currentIndex + 1;

    // Adjust getImageSrc to handle array of images
    const getImageSrc = (imagePath: string | undefined) => {
        if (!imagePath) {
            return Prevas; // Your default image path
        } else if (imagePath.startsWith('http')) {
            return imagePath;
        } else {
            console.log(`${import.meta.env.VITE_API_BASE_URL}/images/${imagePath}`);
            return `${import.meta.env.VITE_API_BASE_URL}/images/${imagePath}`;
        }
    };

    const currentEntry = infoData[currentIndex] || { imageUrls: [] };
    return (
        <div className="app">
            <header className="header">
                <img src={Prevas} className='header-text' alt='Prevas'/>
                <Link className='header-icon' to="/"> {/* Use Link to navigate to home */}
                    <img src={Home}  alt='Home' />
                </Link>
            </header>
            <div className="subheader info-header single-side">
                <img src={infoIcon} className='subheader-icon' alt='eventicon'/>
                <div className='subheader-title'>Vem söker du?</div>
            </div>
            <main className="content">
                <div className="content-card">
                    <img className="content-image-container"/>
                    <div className="content-image-container">
                        {currentEntry.imageUrls.length > 1 && (
                            <button className="carousel-arrow left-arrow" onClick={handlePreviousImage}>&lt;</button>
                        )}
                        <img
                            className="content-image"
                            src={getImageSrc(currentEntry.imageUrls[currentImageIndex])}
                            alt={`${currentEntry.title} ${currentImageIndex + 1}`}
                        />
                        {currentEntry.imageUrls.length > 1 && (
                            <button className="carousel-arrow right-arrow" onClick={handleNextImage}>&gt;</button>
                        )}
                    </div>
                    <div className="content-details larger-text">
                        <h2 className="content-name info-name">{currentEntry.full_name}</h2>
                        <p><strong>Titel:</strong> {currentEntry.title}</p>
                        <p><strong>Epost:</strong> {currentEntry.email}</p>
                        <OptionalField label="Mobil" value={currentEntry.phone}/>
                        <OptionalField label="Avdelning" value={currentEntry.department}/>
                        <OptionalField label="Plats" value={currentEntry.location}/>
                        <OptionalField label="Manager" value={currentEntry.manager}/>


                    </div>
                    <Link to="/office" state={{workArea: `Zon ${currentEntry.workArea}`}}>
                        <button className='content-link'>Hitta kontorsplats!</button>
                    </Link>

                </div>
            </main>
            <footer className="footer">
                {infoData.length > 1 && (
                    <>
                        <button onClick={handlePreviousClick} aria-label="Go to previous">
                            <img src={ArrowLeft} className="arrow-left" alt=''/>
                            <div className='footer-text'>Föregående: {infoData[getPreviousIndex()].full_name}</div>
                        </button>
                        <button onClick={handleNextClick} aria-label="Go to next">
                            <div className='footer-text'>Nästa: {infoData[getNextIndex()].full_name}</div>
                            <img src={ArrowRight} className="arrow-right" alt=''/>
                        </button>
                    </>
                )}
            </footer>
        </div>
    );
};

export default InfoScreen;
