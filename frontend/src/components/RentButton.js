import React from "react";
import { useNavigate } from "react-router-dom";

const RentButton = ({ roomId }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/reserveRoom", {
            state: { roomId: roomId }
        });
    };

    return (
        <div className="rent-button">
            <button className="btn btn-primary" onClick={handleClick}>
                Rezerwuj
            </button>
        </div>
    );
};

export default RentButton;
