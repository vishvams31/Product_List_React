import React from 'react';
import { useNavigate } from 'react-router-dom';
import './updateInformation.css';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { updateUser, checkEmailUniqueness } from '../../services/Service';
import toast from 'react-hot-toast';
import regex from '../../constants/Regex';
import message from '../../constants/Message';

const UpdateUser = ({ user, onUpdate }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            mobilenumber: user.mobilenumber,
        }
    });
    const email = watch('email');
    const [emailChanged, setEmailChanged] = useState(false);

    useEffect(() => {
        if (email !== user.email) {
            setEmailChanged(true);
        }
    }, [email, user.email]);
    const mobileNumberPattern = regex.MOBILE_REGEX;
    const gmailPattern = regex.EMAIL_REGEX;

    const onSubmit = async (data) => {
        const userId = user._id;
        try {
            // Check if the email is unique
            if (emailChanged && data.email !== user.email) {
                const isEmailUnique = await checkEmailUniqueness(data.email);
                if (!isEmailUnique) {
                    toast.error(message.EMAIL_ALREADY_USED);
                    return;
                }

            }
            const updatedUser = await updateUser(data, user);
            console.log(message.SUCCESS_UPDATE, updatedUser);
            onUpdate(updatedUser);
        } catch (error) {
            console.error(message.ERR_UPDATE, error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="update-user-form">
            <h2>Update User</h2>
            <label htmlFor="firstname">First Name:</label>
            <input
                type="text"
                id="firstname"
                name="firstname"
                {...register("firstname", { required: true })}
            />
            {errors.firstname && <p>F{message.FIELD_REQUIRED}</p>}
            <label htmlFor="lastname">Last Name:</label>
            <input
                type="text"
                id="lastname"
                name="lastname"
                {...register("lastname", { required: true })}
            />
            {errors.lastname && <p>{message.FIELD_REQUIRED}</p>}
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                {...register("email", { required: true, pattern: gmailPattern })}
            />
            {errors.email && <p className='MobileNumberValidation'>{message.EMAIL_NOT_VALID}</p>}
            <label htmlFor="mobilenumber">Mobile Number:</label>
            <input
                type="text"
                id="mobilenumber"
                name="mobilenumber"
                {...register("mobilenumber", { required: true, pattern: mobileNumberPattern })}
            />
            {errors.mobilenumber && <p className='MobileNumberValidation'>{message.MOBILE_NOT_VALID}</p>}
            <button type="submit">Update</button>
        </form>
    );
};

export default UpdateUser;
