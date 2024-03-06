import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserDetails } from '../../services/Service';
import Topbar from '../../components/topbar/Topbar';
import UpdateInformation from './UpdateInformation'
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import ChangePassword from '../../components/changePassword/ChangePassword';
import { UseSelector } from 'react-redux';
import './profile.css'
const Profile = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchUserDetails(username);
            setUser(data);
        };

        fetchData();
    }, [username]);
    const handleChangePassword = (passwords) => {
        console.log(passwords);
        setShowChangePasswordModal(false);
    };
    const handleUpdate = (updatedUser) => {
        console.log(updatedUser);
        setShowModal(false);
    }
    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            // Clear user session
            // Redirect to login page
            localStorage.removeItem("user")
            navigate('/login');
            window.location.reload()
        }
    };
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Topbar />
            <div className="profile-page">
                <div className='profile-content'>
                    <h2>Profile</h2>
                    <p>First Name: {user.firstname}</p>
                    <p>Last Name: {user.lastname}</p>
                    <p>Mobile Number: {user.mobilenumber}</p>
                    <p>Email: {user.email}</p>
                    <div className="profile-buttons">
                        <button className="profile-button update-user" onClick={() => setShowModal(true)}>Update User</button>
                        <button className="profile-button change-password" onClick={() => setShowChangePasswordModal(true)}>Change Password</button>
                        <button className="profile-button logout" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                <Modal isOpen={showChangePasswordModal} onClose={() => setShowChangePasswordModal(false)}>
                    <ChangePassword onChangePassword={handleChangePassword} />
                </Modal>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <UpdateInformation user={user} onUpdate={handleUpdate} />
                </Modal>
            </div>
        </>
    );
};

export default Profile;
