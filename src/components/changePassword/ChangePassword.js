import React from 'react';
import './changePassword.css'; // Import the CSS file
import { useForm } from 'react-hook-form';
import { changePassword } from '../../services/Service';
import toast from 'react-hot-toast';
import bcrypt from 'bcryptjs';
import regex from '../../constants/Regex';
import message from '../../constants/Message';

const ChangePassword = ({ onChangePassword }) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const passwordRegex = regex.PASSWORD_REGEX;

    const newPassword = watch('newPassword', '');
    const confirmNewPassword = watch('confirmNewPassword', '');

    const onSubmit = (data) => {
        const user = JSON.parse(localStorage.getItem('user'));

        // Verify the current password
        const isCurrentPasswordCorrect = bcrypt.compareSync(data.currentPassword, user.password);
        if (!isCurrentPasswordCorrect) {
            toast.error(message.ERR_PASSWORD_WRONG);
            return;
        }
        if (data.currentPassword == newPassword) {
            toast.error(message.ERR_PASSWORD_SAME)
            return;
        }
        changePassword(data.newPassword, user);
        onChangePassword({ currentPassword: data.currentPassword, newPassword: data.newPassword });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="change-password-form">
            <label className="change-password-label">
                Current Password:
                <input type="password" {...register("currentPassword", { required: true })} className="change-password-input" />
            </label>
            <label className="change-password-label">
                New Password:
                <input type="password" {...register("newPassword", { required: true, pattern: passwordRegex })} className="change-password-input" />
                {errors.newPassword && <p className='newPassword'>{message.PASSWORD_REQUIREMENT_DID_NOT_MATCH}</p>}
            </label>
            <label className="change-password-label">
                Confirm New Password:
                <input type="password" {...register("confirmNewPassword", { required: true, validate: value => value === newPassword || message.PASSWORD_NOT_MATCH })} className="change-password-input" />
                {errors.confirmNewPassword && <p className={errors.confirmNewPassword.message === message.PASSWORD_NOT_MATCH ? 'error-message' : ''}>{errors.confirmNewPassword.message}</p>}
            </label>


            <button type="submit" className="change-password-button">Change Password</button>
        </form>
    );
};

export default ChangePassword;
