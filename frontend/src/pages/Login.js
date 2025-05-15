import React, {useState} from 'react';
import {useAuth} from '../auth/AuthContext';
import axios from '../config/axiosConfig'
import {toast} from "react-toastify";
const LoginForm = () => {
    const {login, error} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/auth/login", { email, password });
            const token = response.data.token;
            login(token);
            toast.success("Zalogowano pomyślnie");
        } catch (error) {
            const message = error.response?.data?.message || "Błąd logowania";
            toast.error(message);
        }
    };

    return (
        <div className="login-page">
            <h2 className="page-title">Zaloguj się</h2>
            <form className="form" onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="login-email">Adres e-mail</label>
                    <input
                        id="login-email"
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="login-password">Hasło</label>
                    <input
                        id="login-password"
                        type="password"
                        className="form-control"
                        placeholder="Hasło"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">
                    Zaloguj się
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
