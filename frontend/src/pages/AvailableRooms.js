import React, {useEffect, useState, useCallback} from "react";
import axios from "../auth/config/axiosConfig";
import Room from "../components/Room";
import {toast} from "react-toastify";
import FilterRooms from "../components/FilterRooms";

const AvailableRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(5);

    const fetchAvailableRooms = useCallback(async () => {
        setLoading(true);
        try {
            const params = JSON.parse(localStorage.getItem("roomSearchParams"));
            if (!params) {
                toast.error("Brak parametrów wyszukiwania pokoi.");
                setLoading(false);
                return;
            }

            const response = await axios.post("/api/room/getAvailable", params, {
                headers: {"Content-Type": "application/json"}
            });

            setRooms(response.data);
            setFilteredRooms(response.data);
        } catch (error) {
            toast.error("Błąd podczas pobierania dostępnych pokoi.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const savedParams = localStorage.getItem("roomSearchParams");
        if (savedParams) {
            fetchAvailableRooms();
        } else {
            setLoading(false);
        }
    }, [fetchAvailableRooms]);

    const handleFiltersChange = (updatedFilters) => {
        localStorage.setItem("roomSearchParams", JSON.stringify(updatedFilters));
        fetchAvailableRooms();
    };

    const handleSortChange = (desc) => {
        const sorted = [...rooms].sort((a, b) =>
            desc ? a.pricePerOneNight - b.pricePerOneNight : b.pricePerOneNight - a.pricePerOneNight
        );
        setFilteredRooms(sorted);
    };



    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div>
            {loading ? (
                <div className="title-info">Ładowanie pokoi...</div>
            ) : (
                <>
                    <div className="title-info">
                        <h2>Dostępne pokoje</h2>
                    </div>

                    <FilterRooms
                        onFiltersChange={handleFiltersChange}
                        onSortChange={handleSortChange}
                    />

                    {!rooms.length ? (
                        <div className="title-info">Brak dostępnych pokoi spełniających podane kryteria.</div>
                    ) : (
                        <>
                            {currentRooms.map((room) => (
                                <Room key={room.id} room={room} />
                            ))}

                            <div className="pagination-container bottom">
                                <ul className="pagination">
                                    {Array(Math.ceil(filteredRooms.length / roomsPerPage)).fill().map((_, i) => (
                                        <li key={i} className="page-item">
                                            <button onClick={() => paginate(i + 1)} className="page-link">
                                                {i + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );

}

export default AvailableRooms;
