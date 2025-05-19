import React from 'react';
import { FaBed, FaUsers, FaClipboardList, FaSearch } from 'react-icons/fa';


const tiles = [
    {
        icon: <FaSearch size={32} />,
        title: 'Zarezerwuj Pokój',
        description: 'Wyszukaj dostępny pokój w interesującym Cię terminie i zarezerwuj go łatwo i szybko.',
    },
    {
        icon: <FaClipboardList size={32} />,
        title: 'Zarządzaj Rezerwacjami',
        description: 'Przeglądaj, edytuj i usuwaj rezerwacje w systemie hotelowym.',
    },
    {
        icon: <FaBed size={32} />,
        title: 'Dodawaj Pokoje',
        description: 'Twórz nowe pokoje z opisem, rozmiarem i dostępnością.',
    },
    {
        icon: <FaUsers size={32} />,
        title: 'Zarządzaj Użytkownikami',
        description: 'Kontroluj konta klientów i pracowników hotelu.',
    }
];

const HomeInfoTiles = () => {
    return (
        <div className="tile-grid">
            {tiles
                .map((tile, index) => (
                    <div key={index} className="tile">
                        <div className="tile-icon">{tile.icon}</div>
                        <div className="tile-title">{tile.title}</div>
                        <div className="tile-description">{tile.description}</div>
                    </div>
                ))}
        </div>
    );
};

export default HomeInfoTiles;
