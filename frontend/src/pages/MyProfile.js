import React, { useEffect, useState } from 'react';
import axios from '../auth/config/axiosConfig';
import { toast } from 'react-toastify';

const MyProfile = () => {
    const [profile, setProfile] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        surname: ''
    });

    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/user/myProfile');
                setProfile(response.data);
                setFormData(response.data);
            } catch (error) {
                toast.error('Błąd podczas pobierania profilu');
                console.error(error);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handlePasswordChange = (e) => {
        setPasswordData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        try {
            await axios.put('/api/user/myProfile', formData);
            setProfile(formData);
            setIsEditing(false);
            setShowPasswordForm(false);
            toast.success("Dane zaktualizowane");
        } catch (error) {
            toast.error("Błąd podczas zapisywania danych");
            console.error(error);
        }
    };

    const handleCancel = () => {
        setFormData(profile);
        setIsEditing(false);
        setShowPasswordForm(false);
    };

    const handleChangePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            toast.error("Nowe hasła nie są zgodne");
            return;
        }

        try {
            await axios.put('/auth/changePassword', {
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword
            });

            toast.success("Hasło zostało zmienione");
            setShowPasswordForm(false);
            setPasswordData({
                oldPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            });
        } catch (error) {
            toast.error("Błąd przy zmianie hasła");
            console.error(error);
        }
    };

    return (
        <div className="login-page">
            <h2 className="page-title">Mój profil</h2>
            <div className="my-profile">
                {isEditing ? (
                    <form>
                        <div>
                            <label><strong>Email</strong></label><br />
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div>
                            <label><strong>Imię</strong></label><br />
                            <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div>
                            <label><strong>Nazwisko</strong></label><br />
                            <input type="text" name="surname" value={formData.surname} onChange={handleChange} />
                        </div>

                        <button
                            type="button"
                            className="btn btn-warning"
                            style={{ marginTop: '10px' }}
                            onClick={() => setShowPasswordForm(prev => !prev)}
                        >
                            {showPasswordForm ? 'Ukryj zmianę hasła' : 'Zmień hasło'}
                        </button>

                        {showPasswordForm && (
                            <div style={{ marginTop: '10px' }}>
                                <div>
                                    <label>Stare hasło</label><br />
                                    <input type="password" name="oldPassword" value={passwordData.oldPassword} onChange={handlePasswordChange} />
                                </div>
                                <div>
                                    <label>Nowe hasło</label><br />
                                    <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} />
                                </div>
                                <div>
                                    <label>Potwierdź nowe hasło</label><br />
                                    <input type="password" name="confirmNewPassword" value={passwordData.confirmNewPassword} onChange={handlePasswordChange} />
                                </div>
                                <button type="button" className="btn btn-success" onClick={handleChangePassword} style={{ marginTop: '10px' }}>
                                    Zapisz nowe hasło
                                </button>
                            </div>
                        )}

                        <div style={{ marginTop: '20px' }}>
                            <button type="button" onClick={handleSave} className="btn btn-primary">Zapisz</button>{' '}
                            <button type="button" onClick={handleCancel} className="btn btn-secondary">Anuluj</button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <p><strong>Email</strong><br />{profile.email}</p>
                        <p><strong>Imię</strong><br />{profile.name}</p>
                        <p><strong>Nazwisko</strong><br />{profile.surname}</p>
                        <button onClick={() => setIsEditing(true)} className="btn btn-primary">Edytuj</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
