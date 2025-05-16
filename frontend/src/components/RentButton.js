import React from "react";
import { Link } from "react-router-dom";

const RentButton = ({ carId }) => {
    return (
        <div className="rent-button">
            <Link to={`/rent-car/${carId}`} style={{ textDecoration: "none" }}>
                <button className="btn btn-primary">
                    Rezerwuj
                </button>
            </Link>
        </div>
    );
};

export default RentButton;