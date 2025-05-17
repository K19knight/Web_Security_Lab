import React from "react";
import {Nav, NavLink, NavMenu} from "./NavbarElements";
import LogoutButton from "./LogoutButton";
import {useAuth} from '../auth/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeButton from "./HomeButton";

const Navbar = () => {
    const {user} = useAuth();
    const isAdmin = user?.role === "ADMIN";

    let navmenu;
    if (user) {
        navmenu = (
            <NavMenu>
                <NavLink to="/">
                    Strona główna
                </NavLink>
                <NavLink to="/searchRoom">
                    Wyszukaj Pokój
                </NavLink>
                {(!isAdmin) && (
                    <>
                        <NavLink to="/myProfile">
                            Mój Profil
                        </NavLink>
                    </>
                )}


                {(isAdmin) && (
                    <>
                        <NavLink to="/addRoom">
                            Dodaj Pokoje
                        </NavLink>
                        <NavLink to="/manageRooms">
                            Pokoje
                        </NavLink>
                        <NavLink to="/manageReservation">
                            Rezerwacje
                        </NavLink>
                        <NavLink to="/manageUsers">
                            Użytkownicy
                        </NavLink>
                    </>
                )}
                <LogoutButton/>

            </NavMenu>
        )
    } else if (!user) {
        navmenu = (
            <NavMenu>
                <NavLink to="/">
                    Strona główna
                </NavLink>
                <NavLink to="/searchRoom">
                    Wyszukaj Pokój
                </NavLink>
                <NavLink to="/login">
                    Zaloguj się
                </NavLink>
                <NavLink to="/register">
                    Zarejestruj się
                </NavLink>
            </NavMenu>
        )
    }
    return (
        <>
            <Nav>
                <HomeButton/>
                {navmenu}
            </Nav>
        </>
    );
};

export default Navbar;