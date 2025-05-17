import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../auth/config/axiosConfig";
import { useAuth } from "../auth/AuthContext";
import Room from "../components/Room";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReserveRoom = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const roomId = location.state?.roomId;
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);

    const searchParams = JSON.parse(localStorage.getItem("roomSearchParams") || "{}");

    useEffect(() => {
        if (!roomId) {
            toast.error("Brak identyfikatora pokoju.");
            navigate("/availableRooms");
            return;
        }

        const fetchRoom = async () => {
            try {
                const response = await axios.get(`/api/room/${roomId}`);
                setRoom(response.data);
            } catch (error) {
                toast.error("Nie udało się pobrać danych pokoju.");
                navigate("/rooms");
            } finally {
                setLoading(false);
            }
        };

        fetchRoom();
    }, [roomId, navigate]);

    const handleReservation = async () => {
        if (!user || !room) return;

        try {
            const start = new Date(searchParams.start);
            const end = new Date(searchParams.end);
            const guests = parseInt(searchParams.guests);

            if (isNaN(start) || isNaN(end) || isNaN(guests)) {
                toast.error("Niepoprawne dane w formularzu.");
                return;
            }

            const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            const price = nights * room.pricePerOneNight;

            const reservationDto = {
                start: start.toISOString(),
                end: end.toISOString(),
                userId: user.id,
                roomId: room.id,
                guests: guests,
                price: price
            };

            await axios.post("/api/reservation", reservationDto);
            toast.success("Rezerwacja zakończona sukcesem!");
            setTimeout(() => navigate("/myProfile"), 1500);
        } catch (error) {
            toast.error(error.response?.data?.message || "Wystąpił błąd przy składaniu rezerwacji.");
        }
    };

    if (loading) return <p>Ładowanie...</p>;

    return (
        <div className="reserve-page">
            <h2 className="page-title">Potwierdź rezerwację pokoju</h2>
            {room && <Room room={room} hideRentButton={true} />}

            <div className="confirm-rent-button">
                <button className="btn btn-success" onClick={handleReservation}>
                    Złóż rezerwację
                </button>
            </div>
        </div>
    );
};

export default ReserveRoom;
