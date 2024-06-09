import React, { useState, useEffect } from 'react';


const CupboardScreenGuest = () => {
    const [rowLayouts, setRowLayouts] = useState(null); // Här sparar du layouten som hämtas
    const Card = ({ size, imageSrc, onClick }) => {
        // Klassnamnet baseras på `size` prop
        const cardClass = `white-card ${size}-card`;

        return (
            <div className={cardClass} onClick={onClick}>
                {imageSrc && <img src={imageSrc} alt="" className="product-image" />}
            </div>
        );
    };

    useEffect(() => {
        // Ersätt med den faktiska endpointen för att hämta en specifik layout eller den default layouten
        fetch('http://localhost:8080/api/getlayouts')
            .then((response) => response.json())
            .then((data) => {
                const layouts = data.filter(layout => layout.configuration !== null);
                if (layouts.length > 0) {
                    // Anta att den första giltiga layouten är den som ska visas
                    const layoutConfig = JSON.parse(layouts[0].configuration);
                    setRowLayouts(layoutConfig);
                }
            })
            .catch((error) => console.error('Failed to fetch layout:', error));
    }, []);

    // Hjälpfunktion för att rendera varje rad baserat på layouten
    const renderRow = (rowKey) => {
        if (!rowLayouts || !rowLayouts[rowKey]) return null;

        const layoutType = rowLayouts[rowKey];
        let rowComponents = [];

        switch (layoutType) {
            case 'full':
                rowComponents.push(<Card key={`${rowKey}-0`} size="full" />);
                break;
            case 'twoHalfs':
                rowComponents.push(<Card key={`${rowKey}-1`} size="half" />);
                rowComponents.push(<Card key={`${rowKey}-2`} size="half" />);
                break;
            case 'thirdAndSingle':
                rowComponents.push(<Card key={`${rowKey}-3`} size="three-quarters" />);
                rowComponents.push(<Card key={`${rowKey}-4`} size="single" />);
                break;
            case 'twoSinglesAndHalf':
                rowComponents.push(<Card key={`${rowKey}-5`} size="single" />);
                rowComponents.push(<Card key={`${rowKey}-6`} size="single" />);
                rowComponents.push(<Card key={`${rowKey}-7`} size="half" />);
                break;
            case 'fourSingles':
                for (let i = 0; i < 4; i++) {
                    rowComponents.push(<Card key={`${rowKey}-${i}`} size="single" />);
                }
                break;
            case 'halfAndTwoSingles':
                rowComponents.push(<Card key={`${rowKey}-1`} size="half" />);
                rowComponents.push(<Card key={`${rowKey}-2`} size="single" />);
                rowComponents.push(<Card key={`${rowKey}-3`} size="single" />);
                break;
            case 'singleThreeQuarters':
                rowComponents.push(<Card key={`${rowKey}-1`} size="single" />);
                rowComponents.push(<Card key={`${rowKey}-2`} size="three-quarters" />);
                break;
            case 'singleHalfSingle':
                rowComponents.push(<Card key={`${rowKey}-1`} size="single" />);
                rowComponents.push(<Card key={`${rowKey}-2`} size="half" />);
                rowComponents.push(<Card key={`${rowKey}-3`} size="single" />);
                break;
            default:
                // Om inget val är gjort, visa fyra singelkort som standard
                for (let i = 0; i < 4; i++) {
                    rowComponents.push(<Card key={`${rowKey}-${i}`} size="single" />);
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
            {/* Ditt UI här, minus dropdowns och redigeringsknappar */}
            {rowLayouts && Object.keys(rowLayouts).map((rowKey) => renderRow(rowKey))}
        </div>
    );
};

export default CupboardScreenGuest;
