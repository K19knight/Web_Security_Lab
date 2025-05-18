import React, { useEffect, useState } from 'react';
import axios from '../../auth/config/axiosConfig';
import Room from '../../components/RoomAdmin';
import { toast } from 'react-toastify';

const ManageRooms = () => {
    const [rooms, setRooms] = useState([]);

    const fetchRooms = async () => {
        try {
            const response = await axios.get('/api/room/getAll');
            setRooms(response.data);
        } catch (error) {
            toast.error('Nie udało się pobrać pokoi');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div className="manager-container">
            <h2 className="page-title">Zarządzaj Pokojami</h2>
            {rooms.length === 0 ? (
                <p>Brak użytkowników do wyświetlenia</p>
            ) : (
                rooms.map(room => (
                    <Room key={room.id} room={room} onRoomsUpdate={fetchRooms} />
                ))
            )}
        </div>
    );
};

export default ManageRooms;
