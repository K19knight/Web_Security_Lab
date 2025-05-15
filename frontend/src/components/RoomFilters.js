import React, { useState, useEffect } from "react";
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

const RoomFilter = ({ rooms, onRoomTypeChange, onSortChange }) => {
    const [selectedRoomType, setSelectedRoomType] = useState("");
    const [uniqueRoomTypes, setUniqueRoomTypes] = useState([]);
    const [sortByPriceAsc, setSortByPriceAsc] = useState(true);

    useEffect(() => {
        const roomTypes = [...new Set(rooms.map(room => room.type))];
        setUniqueRoomTypes(roomTypes);
    }, [rooms]);

    const handleSortChange = () => {
        setSortByPriceAsc(!sortByPriceAsc);
        onSortChange(!sortByPriceAsc);
    };

    const handleRoomTypeChange = (e) => {
        setSelectedRoomType(e.target.value);
        onRoomTypeChange(e.target.value);
    };

    return (
        <div className="filters">
            <label htmlFor="roomType" className="filter-label">Wybierz typ pokoju:</label>
            <select
                id="roomType"
                value={selectedRoomType}
                onChange={handleRoomTypeChange}
                className="filter-select"
            >
                <option value="">Wszystkie typy</option>
                {uniqueRoomTypes.map((type, idx) => (
                    <option key={idx} value={type}>{type}</option>
                ))}
            </select>

            <button onClick={handleSortChange} className="sort-button">
                {sortByPriceAsc ? "Sortuj od najtańszych" : "Sortuj od najdroższych"}
                {sortByPriceAsc ? <BsArrowUp className="sort-button-icon" /> : <BsArrowDown className="sort-button-icon" />}
            </button>
        </div>
    );
};

export default RoomFilter;