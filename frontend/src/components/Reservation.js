import React from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from '../auth/config/axiosConfig';
import { toast } from 'react-toastify';

const Reservation = ({ reservation, onReservationsUpdate, isActive }) => {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(`Czy na pewno chcesz anulować rezerwację #${reservation.id}?`);
        if (!confirmed) return;

        try {
            await axios.delete(`/api/reservation/${reservation.id}`);
            toast.success('Rezerwacja została usunięta.');
            onReservationsUpdate();
        } catch (error) {
            toast.error('Błąd podczas usuwania rezerwacji.');
            console.error(error);
        }
    };

    return (
        <div className="reservation-card">
            <div className="reservation-field"><strong>ID Rezerwacji:</strong> {reservation.id}</div>
            <div className="reservation-field"><strong>Klient:</strong> {reservation.customer?.name} {reservation.customer?.surname} ({reservation.customer?.email})</div>
            <div className="reservation-field"><strong>Pokój #{reservation.room?.id}:</strong> {reservation.room?.size} m²</div>
            <div className="reservation-field"><strong>Pobyt:</strong> {formatDate(reservation.start)} – {formatDate(reservation.end)}</div>
            <div className="reservation-field"><strong>Goście:</strong> {reservation.guests}</div>
            <div className="reservation-field"><strong>Cena:</strong> {reservation.price} zł</div>
            <div className={`reservation-status ${isActive ? 'active' : 'closed'}`}>
                {isActive ? 'Aktywna' : 'Zakończona'}
            </div>

            {isActive && (
                <button
                    className="btn btn-danger"
                    onClick={handleDelete}
                    title="Usuń rezerwację"
                    style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}
                >
                    <FaTrash /> Usuń
                </button>
            )}
        </div>
    );
};

export default Reservation;
