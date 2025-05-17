import React from 'react';

const MyReservationItem = ({ reservation }) => {
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

    return (
        <div className="reservation-card">
            <div className="reservation-field"><strong>Pobyt:</strong> {formatDate(reservation.start)} - {formatDate(reservation.end)}</div>
            <div className="reservation-field"><strong>Goście:</strong> {reservation.guests}</div>
            <div className="reservation-field"><strong>Cena:</strong> {reservation.price} zł</div>
            <div className="reservation-field"><strong>Pokój #{reservation.roomId}:</strong> {reservation.roomSize} m²</div>
            <div className={`reservation-status ${isActive ? 'active' : 'closed'}`}>
                {isActive ? 'Aktywna' : 'Zakończona'}
            </div>
        </div>
    );
};

export default MyReservationItem;
