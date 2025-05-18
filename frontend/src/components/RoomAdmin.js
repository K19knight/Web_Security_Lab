import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import axios from '../auth/config/axiosConfig';
import { toast } from 'react-toastify';

const Room = ({ room, onRoomsUpdate }) => {
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        size: room.size,
        maxGuests: room.maxGuests,
        pricePerOneNight: room.pricePerOneNight,
    });
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const getImageSource = async (roomSize) => {
            let imageName;

            if (roomSize <= 15) {
                imageName = "small.jpg";
            } else if (roomSize <= 30) {
                imageName = "medium.jpg";
            } else {
                imageName = "big.jpg";
            }

            const imageUrl = `/room_images/${imageName}`;

            try {
                await new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => {
                        setImageSrc(imageUrl);
                        resolve();
                    };
                    img.onerror = () => {
                        setImageSrc('/room_images/noImage.jpg');
                        resolve();
                    };
                    img.src = imageUrl;
                });
            } catch (error) {
                console.error("Błąd podczas ładowania obrazu:", error);
            }
        };

        getImageSource(room.size);
    }, [room.size]);

    const handleDelete = async () => {
        const confirmed = window.confirm(`Czy na pewno chcesz usunąć pokój o ID ${room.id}?`);
        if (!confirmed) return;

        try {
            await axios.delete(`/api/room/${room.id}`);
            toast.success('Pokój został usunięty');
            onRoomsUpdate();
        } catch (error) {
            toast.error('Błąd podczas usuwania pokoju');
            console.error(error);
        }
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleCancelEdit = () => {
        setEditing(false);
        setFormData({
            size: room.size,
            maxGuests: room.maxGuests,
            pricePerOneNight: room.pricePerOneNight,
        });
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`/api/room/${room.id}`, formData);
            toast.success('Pokój został zaktualizowany');
            setEditing(false);
            onRoomsUpdate();
        } catch (error) {
            toast.error('Błąd podczas aktualizacji pokoju');
            console.error(error);
        }
    };

    return (
        <div className="manage-room">
                <div  className="manage-room-field"><strong>Numer:</strong> {room.id}</div>
                {editing ? (
                    <>
                        <div>
                            <strong>Rozmiar:</strong>
                            <input
                                type="number"
                                value={formData.size}
                                onChange={(e) => setFormData({ ...formData, size: parseInt(e.target.value) })}
                            />
                        </div>
                        <div>
                            <strong>Maks. Gości:</strong>
                            <input
                                type="number"
                                value={formData.maxGuests}
                                onChange={(e) => setFormData({ ...formData, maxGuests: parseInt(e.target.value) })}
                            />
                        </div>
                        <div>
                            <strong>Cena/noc:</strong>
                            <input
                                type="number"
                                value={formData.pricePerOneNight}
                                onChange={(e) => setFormData({ ...formData, pricePerOneNight: parseInt(e.target.value) })}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="manage-room-field"><strong>Rozmiar:</strong> {room.size} m²</div>
                        <div className="manage-room-field"><strong>Maks. Gości:</strong> {room.maxGuests}</div>
                        <div className="manage-room-field"><strong>Cena/noc:</strong> {room.pricePerOneNight} zł</div>
                    </>
                )}

            <div className="room-actions">
                {editing ? (
                    <>
                        <button className="btn btn-success" onClick={handleSave}><FaSave /></button>
                        <button className="btn btn-secondary" onClick={handleCancelEdit}><FaTimes /></button>
                    </>
                ) : (
                    <>
                        <button className="btn btn-primary" onClick={handleEdit}><FaEdit /></button>
                        <button className="btn btn-danger" onClick={handleDelete}><FaTrash /></button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Room;
