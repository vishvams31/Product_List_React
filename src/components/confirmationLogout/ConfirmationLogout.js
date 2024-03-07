import './confirmatoinLogout.css'
const ConfirmLogoutModal = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="confirm-logout-modal-overlay">
            <div className="confirm-logout-modal">
                <p>Are you sure you want to logout?</p>
                <button className="yes" onClick={onConfirm}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
        </div>
    );
};
export default ConfirmLogoutModal