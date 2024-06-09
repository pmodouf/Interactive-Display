import React, { useEffect, useState } from "react";
import Prevas from '../assets/Prevas-Entre-Portal-UI-assets/SVG/Logo-Head-Prevas-Stockholm.svg';
import ArrowLeft from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-left.svg';
import ArrowRight from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-right.svg';
import ProductIcon from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-products.svg";
import Home from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-Home.svg";
import { Link } from "react-router-dom";
import { fetchData } from "../service/DataFetching";
import OptionalField from "../components/OptionalFIeld.tsx"; // Adjust the path to match your project structure

// Define a TypeScript interface for your product data if you're using TypeScript
interface Product {
    id: number;
    title: string;
    subtitle: string;
    customerSide: string;
    prevasSide: string;
    contact?: string;
    imageUrls: string[]; // Array of image URLs
}

const ProductScreen: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            const data: Product[] = await fetchData("/product");
            setProducts(data);
        };

        fetchProducts();
    }, []);

    const handlePreviousClick = () => {
        setCurrentIndex(getPreviousIndex());
        // Reset image index when switching products
        setCurrentImageIndex(0);
    };

    const handleNextClick = () => {
        setCurrentIndex(getNextIndex());
        // Reset image index when switching products
        setCurrentImageIndex(0);
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex(prevIndex => prevIndex === 0 ? products[currentIndex].imageUrls.length - 1 : prevIndex - 1);
    };

    const handleNextImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % products[currentIndex].imageUrls.length);
    };

    const getPreviousIndex = () => currentIndex === 0 ? products.length - 1 : currentIndex - 1;
    const getNextIndex = () => currentIndex === products.length - 1 ? 0 : currentIndex + 1;
    const getImageSrc = (imagePath: string | undefined) => {
        if (!imagePath) {
            return Prevas; // Adjust this to your default image location
        } else if (imagePath.startsWith('http')) {
            return imagePath;
        } else {
            // Adjust the path prefix according to the resource handler configuration
            console.log(`http://localhost:8080/images/${imagePath}`)
            return `http://localhost:8080/images/${imagePath}`;
        }
    };




    const renderListFromText = (text: string | undefined) => {
        return typeof text === "string"
            ? text.split(';').map((item, index) => <li key={index}>{item.trim()}</li>)
            : [];
    };

    const currentEntry = products[currentIndex] || { imageUrls: [] };
    return (
        <div className="app">
            <header className="header">
                <img src={Prevas} className='header-text' alt='Prevas'/>
                <Link className='header-icon' to="/"> {/* Use Link to navigate to home */}
                    <img src={Home}  alt='Home' />
                </Link>
            </header>
            <div className="subheader product-header single-side">
                <img src={ProductIcon} className='subheader-icon' alt='eventicon'/>
                <div className='subheader-title'>Våra Produkter</div>
            </div>

            <main className="content">

                <div className="content-card">

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
                    <div className="content-details smaller-text">
                        <h2 className="content-name product-name">{currentEntry.title}</h2>
                        <p>{currentEntry.subtitle}</p>
                        <p><strong>Kundens insikt:</strong></p>
                        <ul>
                            {renderListFromText(currentEntry.customerSide)}
                        </ul>
                        <p><strong>Elektronikutveckling och certifiering hos Prevas:</strong></p>
                        <ul>
                        {renderListFromText(currentEntry.prevasSide)}
                        </ul>
                        <OptionalField label="Kontakt" value={currentEntry.contact} />
                    </div>
                </div>
            </main>
            <footer className="footer">
                {products.length > 1 && (
                    <>
                        <button onClick={handlePreviousClick} aria-label="Go to previous">
                            <img src={ArrowLeft} className="arrow-left" alt=''/>
                            <div className='footer-text'>Föregående {products[getPreviousIndex()].title}</div>
                        </button>
                        <button onClick={handleNextClick} aria-label="Go to next">
                            <div className='footer-text'>Nästa {products[getNextIndex()].title}</div>
                            <img src={ArrowRight} className="arrow-right" alt=''/>
                        </button>
                    </>
                )}
            </footer>
        </div>
    );
};

export default ProductScreen;


