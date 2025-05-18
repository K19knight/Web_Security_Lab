import React from 'react';
import { FaUser, FaBan, FaUnlock } from 'react-icons/fa';
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
            <button
                onClick={handleToggleBlock}
                className={`btn ${user.nonBlocked ? 'btn-danger' : 'btn-success'}`}
                style={{ marginTop: '10px' }}
            >
                {user.nonBlocked ? <><FaBan style={{ marginRight: '5px' }} />Zablokuj</> : <><FaUnlock style={{ marginRight: '5px' }} />Odblokuj</>}
            </button>
        </div>
    );
};

export default User;
