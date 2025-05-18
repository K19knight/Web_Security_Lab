import React from 'react';
import { FaUser, FaBan, FaUnlock, FaTrash } from 'react-icons/fa';
import axios from '../auth/config/axiosConfig';
import { toast } from 'react-toastify';

const User = ({ user, onStatusChange }) => {
    const handleToggleBlock = async () => {
        try {
            await axios.post('/api/admin/block', { userId: user.id });
            toast.success(`Użytkownik ${user.email} został ${user.nonBlocked ? 'zablokowany' : 'odblokowany'}`);
            onStatusChange();
        } catch (error) {
            toast.error("Błąd podczas zmiany statusu użytkownika");
            console.error(error);
        }
    };

    const handleDeleteUser = async () => {
        const confirmed = window.confirm(`Czy na pewno chcesz usunąć użytkownika ${user.email}?`);
        if (!confirmed) return;

        try {
            await axios.delete(`/api/user/${user.id}`);
            toast.success(`Użytkownik ${user.email} został usunięty`);
            onStatusChange();
        } catch (error) {
            toast.error("Błąd podczas usuwania użytkownika");
            console.error(error);
        }
    };

    return (
        <div className="manage-users-user">
            <div className="manage-users-field">
                <strong><FaUser style={{ marginRight: '5px' }} />ID:</strong> {user.id}
            </div>
            <div className="manage-users-field"><strong>Email:</strong> {user.email}</div>
            <div className="manage-users-field"><strong>Imię:</strong> {user.name}</div>
            <div className="manage-users-field"><strong>Nazwisko:</strong> {user.surname}</div>
            <div className="manage-users-field"><strong>Rola:</strong> {user.role}</div>
            <div className={`reservation-status ${user.nonBlocked ? 'active' : 'closed'}`}>
                {user.nonBlocked ? 'Aktywny' : 'Zablokowany'}
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                    onClick={handleToggleBlock}
                    className={`btn ${user.nonBlocked ? 'btn-danger' : 'btn-success'}`}
                >
                    {user.nonBlocked ? <><FaBan style={{ marginRight: '5px' }} />Zablokuj</> : <><FaUnlock style={{ marginRight: '5px' }} />Odblokuj</>}
                </button>

                <button
                    onClick={handleDeleteUser}
                    className="btn btn-outline-danger"
                    title="Usuń użytkownika"
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default User;
