import React, { useEffect, useState } from 'react';
import axios from '../../auth/config/axiosConfig';
import Reservation from '../../components/Reservation';
import { toast } from 'react-toastify';

const ManageReservations = () => {
    const [reservations, setReservations] = useState([]);

    const fetchReservations = async () => {
        try {
            const res = await axios.get('/api/reservation/getAll');
            const now = new Date();

            const enrichedReservations = res.data.map(reservation => {
                const end = new Date(reservation.end);
                return {
                    ...reservation,
                    isActive: end > now
                };
            });

            const sorted = enrichedReservations.sort((a, b) => {
                if (a.isActive !== b.isActive) {
                    return a.isActive ? -1 : 1;
                }
                return new Date(b.end) - new Date(a.end);
            });

            setReservations(sorted);
        } catch (error) {
            toast.error('Nie udało się pobrać rezerwacji.');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    return (
        <div className="manager-container">
            <h2 className="page-title">Zarządzaj Rezerwacjami</h2>
            {reservations.length === 0 ? (
                <p>Brak rezerwacji do wyświetlenia.</p>
            ) : (
                reservations.map(res => (
                    <Reservation
                        key={res.id}
                        reservation={res}
                        onReservationsUpdate={fetchReservations}
                        isActive={res.isActive}
                    />
                ))
            )}
        </div>
    );
};

export default ManageReservations;
