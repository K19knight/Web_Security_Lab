import React, { useEffect, useState } from "react";
import axios from '../auth/config/axiosConfig';
import Room from "../components/Room";
import { toast } from "react-toastify";

const AvailableRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(3);

    useEffect(() => {
        const fetchAvailableRooms = async () => {
            try {
                const params = JSON.parse(localStorage.getItem("roomSearchParams"));
                if (!params) {
                    toast.error("Brak parametrów wyszukiwania pokoi.");
                    setLoading(false);
                    return;
                }
                console.log("Params wysyłane do backendu:", params);
                const response = await axios.post('/api/room/getAvailable', params, {
                    headers: { 'Content-Type': 'application/json' }
                });
                setRooms(response.data);
            } catch (error) {
                toast.error("Błąd podczas pobierania dostępnych pokoi.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAvailableRooms();
    }, []);

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (!rooms.length && !loading) {
        return <div>Brak dostępnych pokoi spełniających podane kryteria.</div>;
    }

    return (
        <div>
            {loading ? (
                <div className="title-info">Ładowanie pokoi...</div>
            ) : (
                <div>
                    <div className="title-info">
                        <h2>Dostępne pokoje</h2>
                    </div>

                    {/* Górna paginacja */}
                    <div className="pagination-container top">
                        <ul className="pagination">
                            {Array(Math.ceil(rooms.length / roomsPerPage)).fill().map((_, i) => (
                                <li key={i} className="page-item">
                                    <button onClick={() => paginate(i + 1)} className="page-link">
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {currentRooms.map(room => (
                        <Room key={room.id} room={room} />
                    ))}

                    {/* Dolna paginacja */}
                    <div className="pagination-container bottom">
                        <ul className="pagination">
                            {Array(Math.ceil(rooms.length / roomsPerPage)).fill().map((_, i) => (
                                <li key={i} className="page-item">
                                    <button onClick={() => paginate(i + 1)} className="page-link">
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvailableRooms;
