import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchData} from '../service/DataFetching';
import chevronRight from "../assets/Prevas-Entre-Portal-UI-assets/SVG/chevron_right.svg";
import chevronLeft from "../assets/Prevas-Entre-Portal-UI-assets/SVG/chevron_left.svg";

interface Product {
    id: number;
    title: string;
    subtitle: string;
    customerSide: string;
    prevasSide: string;
    contact?: string;
    imageUrls: string[];
}

const ProductDetailScreen = () => {
    const {id} = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showDetailModal, setShowDetailModal] = useState(false);

    useEffect(() => {
        const getProductById = async () => {
            const data: Product = await fetchData(`/product/${id}`);
            setProduct(data);
        };

        if (id) {
            getProductById();
        }
    }, [id]);

    const toggleDetailModal = () => {
        setShowDetailModal(!showDetailModal);
        setCurrentImageIndex(0);
    };
    const handlePreviousImage = () => {
        setCurrentImageIndex(prevIndex =>
            prevIndex === 0 ? (product?.imageUrls?.length ?? 0) - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex(prevIndex =>
            (prevIndex + 1) % (product?.imageUrls?.length ?? 1)
        );
    };

    if (!product) {
        return <div>Loading...</div>;
    }



    const getImageSrc = (imagePath: string) => {
        return imagePath.startsWith('http') ? imagePath : `${import.meta.env.VITE_API_BASE_URL}/images/${imagePath}`;
    };

    return (
        <>
            <div className="productDetail-container" onClick={toggleDetailModal}>
                <h1 className="productDetail-title">{product.title}</h1>
                <img
                    className="productDetail-image"
                    src={getImageSrc(product.imageUrls[0])}
                    alt={`${product.title}`}
                />
            </div>

            {showDetailModal && (
                <div className="modal-overlay" onClick={toggleDetailModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h1 className="productDetail-title">{product.title}</h1>

                        <div className="content-image-container">
                            {product.imageUrls.length > 1 && (
                                <button className="navigation-button left"
                                        onClick={handlePreviousImage}><img src={chevronLeft} alt="Previous"/></button>
                            )}
                            <img
                                className="modal-image"
                                src={getImageSrc(product.imageUrls[currentImageIndex])}
                                alt={`${product.title} ${currentImageIndex + 1}`}
                            />
                            {product.imageUrls.length > 1 && (
                                <button className="navigation-button right" onClick={handleNextImage}><img
                                    src={chevronRight} alt="Next"/></button>
                            )}
                        </div>

                        {/* Ny container för text */}
                        <div className="modal-text-content">
                            <p className="productDetail-info">{product.subtitle}</p>
                            <p className="productDetail-info">{product.customerSide}</p>
                            <p className="productDetail-info">{product.prevasSide}</p>
                            {product.contact && <p className="productDetail-info">Contact: {product.contact}</p>}
                        </div>
                        <button className='quiz-button' onClick={toggleDetailModal}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetailScreen;


