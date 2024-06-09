import React, {useState, useEffect } from 'react';

import monter from '../assets/Prevas-Entre-Portal-UI-assets/SVG/Montern-head-text.svg'
import Prevas from '../assets/Prevas-Entre-Portal-UI-assets/SVG/Logo-Head-Prevas-Stockholm.svg'



const layoutOptions = {
    full: { count: 1, type: 'full' },
    twoHalfs: { count: 2, type: 'half' },
    thirdAndSingle: { count: 2, type: ['third', 'single'] },
    fourSingles: { count: 4, type: 'single' },
    halfAndTwoSingles: { count: 3, type: ['half', 'single', 'single'] },
    singleThreeQuarters:{ count: 2, type: ['single', 'three-quarters'] },
    singleHalfSingle: { count: 3, type: ['single', 'half','single'] },
};


const CupboardScreen = () => {





    const [rowLayouts, setRowLayouts] = useState({
        row1: 'fourSingles',
        row2: 'fourSingles',
        row3: 'fourSingles',
        row4: 'fourSingles',
    });
    const handleLayoutChange = (row, layout) => {
        setRowLayouts(current => ({ ...current, [row]: layout }));
    };


    const [selectedProductId, setSelectedProduct] = useState('');
    //const selectedProduct = productData.find(product => product.id === selectedProductId);
    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
    };

    const handleCardClick = (productId) =>{
        console.log(`Produkt ${productId} klickades på`);
        setSelectedProduct(productId);

    }

    const [layoutName, setLayoutName] = useState('');
    const totalCards = 16;
    const allCards = [...productData, ...Array(totalCards - productData.length).fill(null)];

    const Card = ({ size, imageSrc, onClick }) => {
        // Klassnamnet baseras på `size` prop
        const cardClass = `white-card ${size}-card`;

        return (
            <div className={cardClass} onClick={onClick}>
                {imageSrc && <img src={imageSrc} alt="" className="product-image" />}
            </div>
        );
    };
    const saveLayout = async () => {
        const layoutConfig = JSON.stringify(rowLayouts);
        try {
            const response = await fetch('/api/savelayout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ configuration: layoutConfig }),
            });
            if (!response.ok) {
                throw new Error('Problem saving layout');
            }
            console.log('Layout saved successfully');
            alert('Layout sparades framgångsrikt!');
        } catch (error) {
            console.error('Failed to save layout:', error);
            alert('Misslyckades med att spara layout: ' + error.message);
        }
    };


    useEffect(() => {
        const fetchLayout = async () => {
            try {
                const response = await fetch('/api/getlayouts');
                if (!response.ok) {
                    throw new Error('Failed to fetch layout');
                }
                const layouts = await response.json();
                console.log('API Response:', layouts);
                // Se till att välja en layout där configuration inte är null
                const validLayouts = layouts.filter(layout => layout.configuration !== null);
                if (validLayouts.length > 0) {
                    const layoutConfig = JSON.parse(validLayouts[0].configuration);
                    setRowLayouts(layoutConfig);
                } else {
                    // Hantera fallet när ingen giltig konfiguration finns
                    console.error('No valid layouts found');
                }
            } catch (error) {
                console.error('Failed to fetch layout:', error);
            }
        };

        fetchLayout();
    }, []);


    const renderRow = (rowKey) => {
        if (!rowLayouts) {
            console.error('rowLayouts is undefined or null');
            return null; // Eller visa ett felmeddelande till användaren
        }

        const layout = rowLayouts[rowKey];
        let rowComponents = [];
        const startIndex = Object.keys(rowLayouts).indexOf(rowKey) * 4; // Beräkna startindex för produkter baserat på radnummer

        switch (layout) {
            case 'full':
                rowComponents.push(<Card key={`${rowKey}-0`} size="full" imageSrc={allCards[startIndex]?.image} />);
                break;
            case 'twoHalfs':
                rowComponents.push(<Card key={`${rowKey}-1`} size="half" imageSrc={allCards[startIndex]?.image} />);
                rowComponents.push(<Card key={`${rowKey}-2`} size="half" imageSrc={allCards[startIndex + 1]?.image} />);
                break;
            case 'thirdAndSingle':
                rowComponents.push(<Card key={`${rowKey}-3`} size="three-quarters" imageSrc={allCards[startIndex]?.image} />);
                rowComponents.push(<Card key={`${rowKey}-4`} size="single" imageSrc={allCards[startIndex + 1]?.image} />);
                break;
            case 'twoSinglesAndHalf':
                rowComponents.push(<Card key={`${rowKey}-5`} size="single" imageSrc={allCards[startIndex]?.image} />);
                rowComponents.push(<Card key={`${rowKey}-6`} size="single" imageSrc={allCards[startIndex + 1]?.image} />);
                rowComponents.push(<Card key={`${rowKey}-7`} size="half" imageSrc={allCards[startIndex + 2]?.image} />);
                break;
            case 'fourSingles':
                for (let i = 0; i < 4; i++) {
                    rowComponents.push(<Card key={`${rowKey}-${i}`} size="single" imageSrc={allCards[startIndex + i]?.image} />);
                }
                break;
            case 'halfAndTwoSingles':
                rowComponents.push(<Card key={`${rowKey}-1`} size="half" imageSrc={allCards[startIndex]?.image} />);
                rowComponents.push(<Card key={`${rowKey}-2`} size="single" imageSrc={allCards[startIndex + 1]?.image} />);
                rowComponents.push(<Card key={`${rowKey}-3`} size="single" imageSrc={allCards[startIndex + 2]?.image} />);
                break;
            case 'singleThreeQuarters':
                rowComponents.push(<Card key={`${rowKey}-1`} size="single" imageSrc={allCards[startIndex]?.image} />);
                rowComponents.push(<Card key={`${rowKey}-2`} size="three-quarters" imageSrc={allCards[startIndex + 1]?.image} />);
                break;
            case 'singleHalfSingle':
                rowComponents.push(<Card key={`${rowKey}-1`} size="single" imageSrc={allCards[startIndex]?.image} />);
                rowComponents.push(<Card key={`${rowKey}-2`} size="half" imageSrc={allCards[startIndex + 1]?.image} />);
                rowComponents.push(<Card key={`${rowKey}-3`} size="single" imageSrc={allCards[startIndex + 2]?.image} />);
                break;
            default:
                // Om inget val är gjort, visa fyra singelkort som standard
                for (let i = 0; i < 4; i++) {
                    rowComponents.push(<Card key={`${rowKey}-${i}`} size="single" imageSrc={allCards[startIndex + i]?.image} />);
                }
        }

        return (
            <div className="cupboard-row" key={rowKey}>
                {rowComponents}
            </div>
        );
    };


    return (
        <div className="cupboard-app">

            <header className="cupboard-header">
                <img src={Prevas} className='header-text' alt='prevas'/>
                <img src={monter} className="cupboard-text" alt='Monter'/>
            </header>
            <div className="cupboard-subheader-size cupboard-subheader">
            </div>

            <main className="cupboard-content">
                <div>
                    <button onClick={saveLayout}>Spara Layout</button>
                </div>


                {Object.keys(rowLayouts).map((rowKey, index) => (
                    <React.Fragment key={rowKey}>
                        <div className="row-layout-selection">
                            <select
                                value={rowLayouts[rowKey]}
                                onChange={e => handleLayoutChange(rowKey, e.target.value)}
                            >
                                {/* Dina options här */}
                            </select>
                        </div>
                        {renderRow(rowKey)}
                    </React.Fragment>
                ))}


                {Object.entries(rowLayouts).map(([rowKey, layout], index) => (
                    <div key={rowKey} className="row-layout-selection">
                        <select onChange={(e) => handleLayoutChange(rowKey, e.target.value)} defaultValue="default">
                            <option value="default">Choose Layout</option>
                            <option value="full">Full Card</option>
                            <option value="twoHalfs">Two Half Cards</option>
                            <option value="thirdAndSingle">3/4 and a Single Card</option>
                            <option value="singleThreeQuarters">Single and a 3/4 Card</option>
                            <option value="singleHalfSingle">Single Half and Single</option>
                            <option value="twoSinglesAndHalf">Two Singles and a Half Card</option>
                            <option value="halfAndTwoSingles">Half Card and Two Singles</option>
                            <option value="fourSingles">Four Single Cards</option>

                        </select>
                    </div>
                ))}



                <div className="cupboard-product-dropdown">
                    <select value={selectedProductId} onChange={handleProductChange}>
                        <option value="">Select a product</option>
                        {productData.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.title} - {product.subtitle}
                            </option>
                        ))}
                    </select>
                </div>






            </main>
        </div>
    )
}
export default CupboardScreen;


