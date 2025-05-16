import React, {useEffect, useState} from "react";
import axios from '../auth/config/axiosConfig';
import {useAuth} from "../auth/AuthContext";
import RentButton from "./RentButton";

const Room = ({room, hidePrice, roomRent}) => {
    const {user} = useAuth();
    const [imageSrc, setImageSrc] = useState(null);

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
                console.error("Error loading image:", error);
            }
        };

        getImageSource(room.size);
    }, [room.size]);
    const handleDelete = async () => {
        try {
            await axios.delete(`/api/room/${room.id}`);
            window.location.reload();
        } catch (error) {
            console.error("Error deleting room:", error);
        }
    };


    const isAdmin = user?.role === 'ADMIN';

    return (
        <div className="room-container">
            <div className="room-info">
                <h2>{room.name}</h2>
                <p><strong>Rozmiar (m²):</strong> {room.size}</p>
                <p><strong>Maksymalna liczba gości:</strong> {room.maxGuests}</p>
                {!hidePrice && <p><strong>Cena za noc: {room.pricePerOneNight} PLN</strong></p>}

                {(user || isAdmin) && (
                    <div className="button-group">
                        {user && <RentButton roomId={room.id} />}
                        {isAdmin && (
                            <div className="delete-button">
                                <button className="btn btn-danger" onClick={handleDelete}>Usuń pokój</button>
                            </div>
                        )}
                    </div>
                )}

                {roomRent && (
                    <div className="rent-info">
                        <p><strong>Cena za noc: {roomRent.price} PLN </strong></p>
                        <p><strong>Okres wynajmu (w dniach):</strong> {roomRent.term} dni</p>
                        <p><strong>Data rozpoczęcia wynajmu:</strong> {new Date(roomRent.rentDate).toLocaleDateString()}
                        </p>
                        <p><strong>Data zakończenia
                            wynajmu:</strong> {new Date(new Date(roomRent.rentDate).getTime() + roomRent.term * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </p>
                    </div>
                )}
            </div>

            <div className="room-image">
                {imageSrc && <img src={imageSrc} alt={room.size} />}
            </div>
        </div>
    );
};

export default Room;
