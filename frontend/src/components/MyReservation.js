import React from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from '../auth/config/axiosConfig';
import { toast } from 'react-toastify';

const MyReservationItem = ({ reservation, onCancel }) => {
    const formatDate = (dateTimeStr) => {
        const date = new Date(dateTimeStr);
        return date.toLocaleString('pl-PL', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    const now = new Date();
    const end = new Date(reservation.end);
    const isActive = end > now;

    const handleCancelReservation = async () => {
        const confirmed = window.confirm(`Czy na pewno chcesz odwołać rezerwację na pokój #${reservation.roomId}?`);
        if (!confirmed) return;

        try {
            await axios.delete(`/api/user/myReservation/${reservation.reservationId}`);
            toast.success('Rezerwacja została odwołana.');
            if (onCancel) onCancel();  // żeby rodzic mógł odświeżyć listę lub coś
        } catch (error) {
            toast.error('Błąd podczas odwoływania rezerwacji.');
            console.error(error);
        }
    };

    return (
        <div className="reservation-card">
            <div className="reservation-field"><strong>Pobyt:</strong> {formatDate(reservation.start)} - {formatDate(reservation.end)}</div>
            <div className="reservation-field"><strong>Goście:</strong> {reservation.guests}</div>
            <div className="reservation-field"><strong>Cena:</strong> {reservation.price} zł</div>
            <div className="reservation-field"><strong>Pokój #{reservation.roomId}:</strong> {reservation.roomSize} m²</div>
            <div className={`reservation-status ${isActive ? 'active' : 'closed'}`}>
                {isActive ? 'Aktywna' : 'Zakończona'}
            </div>

            {isActive && (
                <button
                    onClick={handleCancelReservation}
                    className="btn btn-outline-danger"
                    style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}
                    title="Odwołaj rezerwację"
                >
                    <FaTrash /> Odwołaj
                </button>
            )}
        </div>
    );
};

export default MyReservationItem;
