import React, { useEffect, useState } from "react";
import Prevas from '../assets/Prevas-Entre-Portal-UI-assets/SVG/Logo-Head-Prevas-Stockholm.svg';
import ArrowLeft from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-left.svg';
import ArrowRight from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-right.svg';
import EventIcon from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-events.svg";
import Home from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-Home.svg";
import { Link } from "react-router-dom";
import { fetchData } from "../service/DataFetching";
import OptionalField from "../components/OptionalFIeld.tsx";


// Assuming the shape of your event data matches the SQL table structure
interface Event {
    id: number;
    title: string;
    descript?: string;
    dateOf: string; // Assuming ISO format date string
    startTime?: string;
    location?: string;
    responsible?: string;
    note?: string;
    other?: string;
    imageUrl?: string;
}

const EventScreen: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchEventData = async () => {
            const data: Event[] = await fetchData('/event');
            // Sort events by date in ascending order
            const sortedData = data.sort((a, b) => new Date(a.dateOf).getTime() - new Date(b.dateOf).getTime());

            setEvents(sortedData);

            // Find the index of the first future event
            const today = new Date();
            const futureEventIndex = sortedData.findIndex(event => new Date(event.dateOf) >= today);

            // Set the current index to the future event index, or 0 if all events are in the past
            setCurrentIndex(futureEventIndex >= 0 ? futureEventIndex : 0);
        };

        fetchEventData();
    }, []);

    const today = new Date();
    const isPastEvent = (date: string) => new Date(date) < today;

    const getPreviousIndex = () => currentIndex === 0 ? events.length - 1 : currentIndex - 1;
    const getNextIndex = () => currentIndex === events.length - 1 ? 0 : currentIndex + 1;

    const handlePreviousClick = () => setCurrentIndex(getPreviousIndex());
    const handleNextClick = () => setCurrentIndex(getNextIndex());

    const previousEventTitle = events.length > 0 ? events[getPreviousIndex()].title : '';
    const nextEventTitle = events.length > 0 ? events[getNextIndex()].title : '';

    const currentEntry = events[currentIndex] || {};

    if (!currentEntry) return <div>Loading...</div>; // or any other loading state
    return (
        <div className="app">
            <header className="header">
                <img src={Prevas} className='header-text' alt='Prevas'/>
                <Link className='header-icon' to="/"> {/* Use Link to navigate to home */}
                    <img src={Home}  alt='Home' />
                </Link>
            </header>
            <div className="subheader event-header single-side">
                <img src={EventIcon} className='subheader-icon' alt='eventicon'/>
                <div className='subheader-title'>Våra Events</div>
            </div>
            <main className="content">


                    <div className={`content-card ${isPastEvent(currentEntry.dateOf) ? 'past-event' : ''}`}>
                        <img className="content-image" src={currentEntry.imageUrl} alt=''/>
                        <div className="content-details larger-text">
                            <h2 className="content-name event-name">{currentEntry.title}</h2>
                            <h3 className='event-name' >{currentEntry.descript}</h3>
                            <p><strong>När:</strong> {currentEntry.dateOf}</p>
                            <OptionalField label="Start" value={currentEntry.startTime} />
                            <OptionalField label="Plats" value={currentEntry.location} />
                            <OptionalField label="Ansvarig" value={currentEntry.responsible} />
                            <OptionalField label="Note" value={currentEntry.note} />
                            <OptionalField label="Övrigt" value={currentEntry.other} />
                        </div>
                    </div>
            </main>
            <footer className="footer">
                {events.length > 1 && (
                    <>
                        <button onClick={handlePreviousClick} aria-label="Go to previous">
                            <img src={ArrowLeft} className="arrow-left" alt=''/>
                            <div className='footer-text'>Föregående: {previousEventTitle}</div>
                        </button>
                        <button onClick={handleNextClick} aria-label="Go to next">
                            <div className='footer-text'>Nästa: {nextEventTitle}</div>
                            <img src={ArrowRight} className="arrow-right" alt=''/>
                        </button>
                    </>
                )}
            </footer>
        </div>
    );
};

export default EventScreen;

