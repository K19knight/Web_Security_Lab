import React, { useState } from 'react';
import axios from '../../auth/config/axiosConfig';
import { toast } from 'react-toastify';
import ConfirmationModal from "../../components/ConfirmationModal";

const AddRoom = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        size: '',
        maxGuests: '',
        pricePerOneNight: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validate = () => {
        const size = parseInt(formData.size, 10);
        const maxGuests = parseInt(formData.maxGuests, 10);
        const price = parseInt(formData.pricePerOneNight, 10);

        if (isNaN(size) || size < 5) {
            toast.error("Rozmiar pokoju musi wynosić co najmniej 5 m²");
            return false;
        }

        if (isNaN(maxGuests) || maxGuests < 1) {
            toast.error("Liczba gości musi wynosić co najmniej 1");
            return false;
        }

        if (isNaN(price) || price < 40) {
            toast.error("Cena za noc musi wynosić co najmniej 40 PLN");
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setShowModal(true);
        }
    };

    const confirmSubmit = async () => {
        try {
            const payload = {
                size: Number(formData.size),
                maxGuests: Number(formData.maxGuests),
                pricePerOneNight: Number(formData.pricePerOneNight)
            };

            if (formData.description.trim() !== '') {
                payload.description = formData.description;
            }

            await axios.post('/api/room', payload);
            toast.success('Pokój został dodany!');
            setFormData({ size: '', maxGuests: '', pricePerOneNight: '', description: '' });
        } catch (error) {
            toast.error('Błąd podczas dodawania pokoju.');
        } finally {
            setShowModal(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-form">
                <h2 className="page-title">Dodaj Pokój</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="size">Rozmiar pokoju (m²):</label>
                        <input type="number" name="size" className="form-control" value={formData.size}
                               onChange={handleChange} placeholder="Np. 25" min="5" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="maxGuests">Maks. liczba gości:</label>
                        <input type="number" name="maxGuests" className="form-control" value={formData.maxGuests}
                               onChange={handleChange} placeholder="Np. 2" min="1" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="pricePerOneNight">Cena za noc (PLN):</label>
                        <input type="number" name="pricePerOneNight" className="form-control"
                               value={formData.pricePerOneNight}
                               onChange={handleChange} placeholder="Np. 100" min="40" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Opis pokoju (opcjonalnie):</label>
                        <textarea name="description" className="form-control" value={formData.description}
                                  onChange={handleChange} placeholder="Dodaj dowolny opis lub notatkę..." rows={4} />
                    </div>

                    <button type="submit" className="btn btn-primary">Dodaj pokój</button>
                </form>

                <ConfirmationModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={confirmSubmit}
                    formData={formData}
                />
            </div>
        </div>
    );
};

export default AddRoom;
