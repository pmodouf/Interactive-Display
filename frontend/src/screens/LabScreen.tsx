import React, { useEffect, useState } from "react";
import Prevas from '../assets/Prevas-Entre-Portal-UI-assets/SVG/Logo-Head-Prevas-Stockholm.svg';
import ArrowLeft from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-left.svg';
import ArrowRight from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-right.svg';
import LabIcon from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-lab.svg";
import Home from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-Home.svg";
import { Link } from "react-router-dom";
import { fetchData } from "../service/DataFetching";
import OptionalField from "../components/OptionalFIeld.tsx"; // Ensure the path to DataFetching.ts is correct

// Assuming the shape of your lab data matches the SQL table structure
interface Lab {
    title: string;
    info: string;
    contact?: string;
    image: string;
}

const LabScreen: React.FC = () => {
    const [labs, setLabs] = useState<Lab[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchLabData = async () => {
            const data: Lab[] = await fetchData('/labb');
            setLabs(data.sort((a, b) => a.title.localeCompare(b.title)));
        };

        fetchLabData();
    }, []);

    const getPreviousIndex = () => currentIndex === 0 ? labs.length - 1 : currentIndex - 1;
    const getNextIndex = () => currentIndex === labs.length - 1 ? 0 : currentIndex + 1;

    const handlePreviousClick = () => setCurrentIndex(getPreviousIndex());
    const handleNextClick = () => setCurrentIndex(getNextIndex());

    const currentEntry = labs[currentIndex] || {};
    return (
        <div className="app">
            <header className="header">
                <img src={Prevas} className='header-text' alt='Prevas'/>
                <Link className='header-icon' to="/"> {/* Use Link to navigate to home */}
                    <img src={Home} alt='Home'/>
                </Link>
            </header>
            <div className="subheader lab-header single-side">
                <img src={LabIcon} className='subheader-icon' alt='eventicon'/>
                <div className='subheader-title'>Vårt Labb</div>
            </div>
            <main className="content">
                <div className="content-card">
                    <img className="content-image" src={currentEntry.image || Prevas} alt={currentEntry.title}/>
                    <div className="content-details larger-text">
                        <h2 className="content-name lab-name">{currentEntry.title}</h2>
                        <p> {currentEntry.info}</p>
                        <OptionalField label="Kontakt" value={currentEntry.contact} />
                    </div>
                </div>
            </main>
            <footer className="footer">
                {labs.length > 1 && (
                    <>
                        <button onClick={handlePreviousClick} aria-label="Go to previous">
                            <img src={ArrowLeft} className="arrow-left" alt=''/>
                            <div className='footer-text'>Föregående: {labs[getPreviousIndex()].title}</div>
                        </button>
                        <button onClick={handleNextClick} aria-label="Go to next">
                            <div className='footer-text'>Nästa: {labs[getNextIndex()].title}</div>
                            <img src={ArrowRight} className="arrow-right" alt=''/>
                        </button>
                    </>
                )}
            </footer>
        </div>
    );
};

export default LabScreen;
