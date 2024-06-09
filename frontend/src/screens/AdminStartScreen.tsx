// StartScreen.tsx or another parent component
import React from 'react';
import Background from '../components/BackgroundImage.tsx'; // Adjust the path based on your file structure
import LogoutButton from "../components/LogoutButton.tsx";
import NavbarComponent from "../components/Navbar.tsx"; // Adjust the path as necessary


const AdminStartScreen: React.FC = () => {
    return (
        <Background imageUrl="https://i.ytimg.com/vi/d2-3Cf3BMcI/maxresdefault.jpg"> {/* Replace with your actual image URL */}
            <div style={{position: 'relative', zIndex: 1}}>

                <NavbarComponent/>
                <div className='main-content2'>
                    <div className="text-background">
                        <h2>Här kan du lägga till och ta bort i alla tabeller i databasen</h2>
                        <h3 className='h3-attention'>GLÖM INTE ATT LOGGA UT NÄR DU ÄR KLAR!</h3>
                    </div>
                </div>
                <LogoutButton/>
            </div>
        </Background>
    );
};

export default AdminStartScreen;