import React from "react";
import { Link } from "react-router-dom";

const HomeButton = () => {
    return (
        <div className="logo">
            <Link to="/" style={{ textDecoration: "none", marginLeft: "10px" }}>
                <img
                    src="/logo.png"
                    alt="Home"
                />
            </Link>
        </div>

    );
};

export default HomeButton;