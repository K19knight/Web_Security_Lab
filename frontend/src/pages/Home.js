import React from 'react';
import HomeInfoTiles from '../components/HomeInfoTiles';

const Home = () => {
    return (
        <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('/assets/lobby.jpg')` }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center text-white pt-24">
                <h1 className="home-page-title">Witamy w systemie zarządzania hotelem</h1>
                <p className=" home-page-info text-xl mb-8 text-center max-w-xl">
                    Skorzystaj z menu powyżej, aby rezerwować, zarządzać rezerwacjami, pokojami i użytkownikami.
                </p>
                <HomeInfoTiles />
            </div>
        </div>
    );
};

export default Home;
