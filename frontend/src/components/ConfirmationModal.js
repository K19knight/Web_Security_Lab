import React, { useState, useEffect } from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, formData }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsExiting(false);
        }
    }, [isOpen]);

    if (!isOpen && !isExiting) return null;

    const handleCancel = () => {
        setIsExiting(true);
    };

    const handleAnimationEnd = () => {
        if (isExiting) {
            onClose();
        }
    };

    return (
        <div
            className={`modal-backdrop${isExiting ? ' exit' : ''}`}
            onClick={handleCancel}
            onAnimationEnd={handleAnimationEnd}
        >
            <div
                className={`modal-box${isExiting ? ' exit' : ''}`}
                onClick={(e) => {
                    if (isExiting) {
                        e.stopPropagation();
                        return;
                    }
                    e.stopPropagation();
                }}
            >
                <h2>Potwierdź dodanie pokoju</h2>
                <p>Rozmiar:<strong> {formData.size} m²</strong></p>
                <p>Maks. liczba gości:<strong> {formData.maxGuests}</strong></p>
                <p>Cena za noc: <strong>{formData.pricePerOneNight} PLN</strong></p>
                {formData.description && (
                    <div>
                        <strong>Opis pokoju:</strong>
                        <p>{formData.description}</p>
                    </div>
                )}

                <div className="modal-buttons">
                    <button className="modal-button-confirm" onClick={onConfirm}>Dodaj</button>
                    <button className="modal-button-cancel" onClick={handleCancel}>Anuluj</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
