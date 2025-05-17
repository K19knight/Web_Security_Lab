import React, {useEffect, useState} from "react";
import axios from '../auth/config/axiosConfig';
import {useAuth} from "../auth/AuthContext";
import RentButton from "./RentButton";

const Room = ({ room, roomRent, hideRentButton = false }) => {
    const {user} = useAuth();
    const [imageSrc, setImageSrc] = useState(null);

    let stayNights = null;
    let totalPrice = null;
    let guests = null;

    try {
        const searchParams = JSON.parse(localStorage.getItem("roomSearchParams"));
        const start = new Date(searchParams?.start);
        const end = new Date(searchParams?.end);
        guests = searchParams?.guests;

        if (!isNaN(start) && !isNaN(end)) {
            const diffTime = end.getTime() - start.getTime();
            stayNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // liczba dni
            totalPrice = stayNights * room.pricePerOneNight;
        }
    } catch (e) {
        console.error("Nie można sparsować dat z localStorage.roomSearchParams");
    }
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
                <p><strong>Okres wynajmu:</strong> {stayNights} noc{stayNights === 1 ? '' : 'e'}, {guests} {guests === 1 ? 'osoba' : 'osoby'}</p>
                <h3><strong>{totalPrice} zł </strong></h3>
                <p><strong>Data zameldowania:</strong> {new Date(JSON.parse(localStorage.getItem("roomSearchParams"))?.start).toLocaleDateString()}</p>
                <p><strong>Data wymeldowania:</strong> {new Date(JSON.parse(localStorage.getItem("roomSearchParams"))?.end).toLocaleDateString()}</p>


                {(user || isAdmin) && (
                    <div className="button-group">
                        {user && !hideRentButton && <RentButton roomId={room.id} />}
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
