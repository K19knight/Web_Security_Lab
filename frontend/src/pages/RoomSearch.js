import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RoomSearch = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [guests, setGuests] = useState('');
    const [size, setSize] = useState('');
    const [pricePerOneNight, setPricePerOneNight] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const savedFilters = JSON.parse(localStorage.getItem('roomSearchParams'));
        if (savedFilters) {
            setStartDate(savedFilters.startDate || '');
            setEndDate(savedFilters.endDate || '');
            setGuests(savedFilters.guests || '');
            setSize(savedFilters.size || '');
            setPricePerOneNight(savedFilters.price || '');
        }
    }, []);

    const clearFilters = () => {
        setStartDate('');
        setEndDate('');
        setGuests('');
        setSize('');
        setPricePerOneNight('');
        localStorage.removeItem('roomSearchParams');
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!startDate || !endDate || !guests) {
            toast.error("Wypełnij wymagane pola: daty i liczba gości");
            return;
        }

        const start = new Date(`${startDate}T16:00:00`);
        const end = new Date(`${endDate}T11:00:00`);

        if (start >= end) {
            toast.error("Data zakończenia musi być po dacie rozpoczęcia");
            return;
        }

        const searchData = {
            start: start.toISOString(),
            end: end.toISOString(),
            guests: parseInt(guests),
            size: size ? parseInt(size) : null,
            pricePerOneNight: pricePerOneNight ? parseFloat(pricePerOneNight) : null
        };

        localStorage.setItem("roomSearchParams", JSON.stringify(searchData));
        navigate("/availableRooms");
    };

    return (
        <div className="search-page">
            <h2 className="page-title">Wyszukaj pokój</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Data rozpoczęcia *</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        className="form-control"
                    />
                    <small>Godzina rozpoczęcia: 16:00</small>
                </div>
                <div className="form-group">
                    <label>Data zakończenia *</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        className="form-control"
                    />
                    <small>Godzina zakończenia: 11:00</small>
                </div>
                <div className="form-group">
                    <label>Liczba gości *</label>
                    <input
                        type="number"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        required
                        className="form-control"
                        min={1}
                    />
                </div>
                <div className="form-group">
                    <label>Minimalny rozmiar pokoju (opcjonalnie)</label>
                    <input
                        type="number"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="form-control"
                        min={1}
                    />
                </div>
                <div className="form-group">
                    <label>Maksymalna cena za noc (opcjonalnie)</label>
                    <input
                        type="number"
                        value={pricePerOneNight}
                        onChange={(e) => setPricePerOneNight(e.target.value)}
                        className="form-control"
                        min={0}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Szukaj</button>
                <button type="button" onClick={clearFilters}>
                    Wyczyść filtry
                </button>
            </form>
            <div style={{ marginTop: '10px' }}>
                <small>* - pola obowiązkowe</small>
            </div>
        </div>
    );
};

export default RoomSearch;
