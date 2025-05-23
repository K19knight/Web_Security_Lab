import React, {useState} from 'react';
import axios from '../auth/config/axiosConfig';
import {toast} from 'react-toastify';
import {useAuth} from "../auth/AuthContext";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const {login} = useAuth();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    //Sprawdzanie wymagań dotyczących haseł
    const isStrongPassword = (password) => {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
        return strongPasswordRegex.test(password);
    };

    // Funkcja sprawdzająca, czy pole tekstowe nie zawiera tagów HTML lub podejrzanych atrybutów
    const validateTextInput = (text) => {
        const forbiddenPatterns = [
            /<\s*script.*?>/i,
            /<\/\s*script\s*>/i,
            /<.*on\w+\s*=/i,   // np. onerror=, onclick= itp.
            /<.*javascript:/i,
            /<.*>/i  // jakikolwiek inny tag HTML
        ];
        for (const pattern of forbiddenPatterns) {
            if (pattern.test(text)) {
                return false;
            }
        }
        return true;
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            toast.error("Wprowadź poprawny adres e-mail");
            return;
        }

        if (!validateTextInput(name)) {
            toast.error("Imię zawiera niedozwolone znaki lub tagi HTML");
            return;
        }

        if (!validateTextInput(surname)) {
            toast.error("Nazwisko zawiera niedozwolone znaki lub tagi HTML");
            return;
        }

        if (!isStrongPassword(password)) {
            toast.error("Hasło musi mieć co najmniej 8 znaków, w tym dużą literę, małą literę, cyfrę i znak specjalny.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Hasła nie są takie same");
            return;
        }

        try {
            const response = await axios.post('/auth/register', {
                email,
                password,
                name,
                surname
            });

            const token = response.data?.token;
            if (token) {
                login(token);
                toast.success("Zarejestrowano i zalogowano!");
            }
        } catch (error) {
            const message = error.response?.data?.message || "Błąd rejestracji";
            toast.error(message);
        }
    };

    return (
        <div className="login-page">
            <h2 className="page-title">Rejestracja</h2>
            <form className="form" onSubmit={handleRegister}>
                <div className="form-group">
                    <label htmlFor="register-name">Imię</label>
                    <input
                        id="register-name"
                        type="text"
                        className="form-control"
                        placeholder="Imię"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="register-surname">Nazwisko</label>
                    <input
                        id="register-surname"
                        type="text"
                        className="form-control"
                        placeholder="Nazwisko"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="register-email">Adres e-mail</label>
                    <input
                        id="register-email"
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="register-password">Hasło</label>
                    <input
                        id="register-password"
                        type="password"
                        className="form-control"
                        placeholder="Hasło"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <small className="form-text text-muted" style={{ marginTop: '5px' }}>
                        Hasło musi zawierać co najmniej 8 znaków, w tym:
                        <ul style={{ marginTop: '5px', marginBottom: 0, paddingLeft: '20px' }}>
                            <li>dużą literę (A-Z)</li>
                            <li>małą literę (a-z)</li>
                            <li>cyfrę (0-9)</li>
                            <li>znak specjalny (np. !@#$%^&*)</li>
                        </ul>
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="register-confirm-password">Potwierdź hasło</label>
                    <input
                        id="register-confirm-password"
                        type="password"
                        className="form-control"
                        placeholder="Potwierdź hasło"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Zarejestruj się
                </button>
            </form>
        </div>
    );
}

export default Register;
