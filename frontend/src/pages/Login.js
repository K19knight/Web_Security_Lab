import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import axios from '../auth/config/axiosConfig';
import { toast } from "react-toastify";

const LoginForm = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validate = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const sqlInjectionPattern = /(\b(SELECT|DROP|INSERT|DELETE|UPDATE|OR|AND|--|;|'|"|=)\b)/i;

        if (!email) {
            toast.error('Email jest wymagany');
            return false;
        }
        if (!emailRegex.test(email)) {
            toast.error('Niepoprawny format email');
            return false;
        }
        if (sqlInjectionPattern.test(email)) {
            toast.error('Email zawiera niedozwolone znaki lub słowa');
            return false;
        }

        if (!password) {
            toast.error('Hasło jest wymagane');
            return false;
        }
        if (sqlInjectionPattern.test(password)) {
            toast.error('Hasło zawiera niedozwolone znaki lub słowa');
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            const response = await axios.post('/auth/login', { email, password });
            const token = response.data.token;
            login(token);
            toast.success('Zalogowano pomyślnie');
        } catch (error) {
            const message = error.response?.data?.message || 'Błąd logowania';
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
