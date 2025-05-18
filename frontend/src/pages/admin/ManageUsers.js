import React, { useEffect, useState } from 'react';
import axios from '../../auth/config/axiosConfig';
import { toast } from 'react-toastify';
import User from '../../components/User';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/user/getAll');
            setUsers(response.data);
        } catch (error) {
            toast.error('Błąd podczas pobierania użytkowników');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="manager-container">
            <h2 className="page-title">Lista użytkowników</h2>
            {users.length === 0 ? (
                <p>Brak użytkowników do wyświetlenia</p>
            ) : (
                users.map(user => (
                    <User key={user.id} user={user} onStatusChange={fetchUsers} />
                ))
            )}
        </div>
    );
};

export default ManageUsers;
