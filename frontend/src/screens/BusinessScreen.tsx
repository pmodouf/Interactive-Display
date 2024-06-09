import React, {useEffect, useState} from "react";
import Prevas from '../assets/Prevas-Entre-Portal-UI-assets/SVG/Logo-Head-Prevas-Stockholm.svg';
import ArrowLeft from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-left.svg';
import ArrowRight from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-right.svg';
import BusinessIcon from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-offices.svg";
import Home from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-Home.svg";
import {Link} from "react-router-dom";
import {fetchData} from "../service/DataFetching.ts";
import OptionalField from "../components/OptionalFIeld.tsx";



interface Business {
    title: string;
    subtitle: string;
    info: string;
    address?: string;
    contact?: string;
    image?: string;
}

const BusinessScreen: React.FC = () => {
    const [businessData, setBusinessData] = useState<Business[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchBusinessData = async () => {
            const data = await fetchData("/business");
            setBusinessData(data.sort((a: Business, b: Business) => a.title.localeCompare(b.title)));
        };

        fetchBusinessData();
    }, []);

    // Update the index calculation and data access based on the fetched data
    const getPreviousIndex = () => currentIndex === 0 ? businessData.length - 1 : currentIndex - 1;
    const getNextIndex = () => currentIndex === businessData.length - 1 ? 0 : currentIndex + 1;

    const handlePreviousClick = () => setCurrentIndex(getPreviousIndex());
    const handleNextClick = () => setCurrentIndex(getNextIndex());

    const currentEntry = businessData[currentIndex] || {};
    return (
        <div className="app">
            <header className="header">
                <img src={Prevas} className='header-text' alt='Prevas'/>
                <Link className='header-icon' to="/"> {/* Use Link to navigate to home */}
                    <img src={Home}  alt='Home' />
                </Link>
            </header>
            <div className="subheader business-header">
                <div className='left-group'>
                    <img src={BusinessIcon} className='subheader-icon' alt='eventicon'/>
                    <div className='subheader-title'>Affärsenheter</div>
                </div>

                <div className='right-group'>
                    <Link to="/organization" className='business-button-link'>
                        <button className='business-button'>Organisation 2024</button>
                    </Link>
                    <Link to="/location" className='business-button-link'>
                        <button className='business-button'>Se karta!</button>
                    </Link>
                </div>


            </div>
            <main className="content">

                <div className="content-card">
                <img className="content-image" src={currentEntry.image} alt=''/>
                    <div className="content-details smaller-text">
                        <h2 className="content-name business-name">{currentEntry.title}</h2>
                        <p>{currentEntry.subtitle}</p>
                        <p>{currentEntry.info}</p>
                        <OptionalField label="Address" value={currentEntry.address} />
                        <OptionalField label="Contact" value={currentEntry.contact} />
                    </div>
                </div>
            </main>
            <footer className="footer">
                {businessData.length > 1 && (
                    <>
                        <button onClick={handlePreviousClick} aria-label="Go to previous">
                            <img src={ArrowLeft} className="arrow-left" alt=''/>
                            <div className='footer-text'>Föregående: {businessData[getPreviousIndex()].title}</div>
                        </button>
                        <button onClick={handleNextClick} aria-label="Go to next">
                            <div className='footer-text'>Nästa: {businessData[getNextIndex()].title}</div>
                            <img src={ArrowRight} className="arrow-right" alt=''/>
                        </button>
                    </>
                )}
            </footer>
        </div>
    );
};

export default BusinessScreen;
