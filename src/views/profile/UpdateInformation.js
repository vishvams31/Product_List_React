import React from 'react';
import { useNavigate } from 'react-router-dom';
import './updateInformation.css';
import { useForm } from 'react-hook-form';
import { updateUser, checkEmailUniqueness } from '../../services/Service';
import toast from 'react-hot-toast';

const UpdateUser = ({ user, onUpdate }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            mobilenumber: user.mobilenumber,
        }
    });

    // Define the regex pattern for the mobile number
    const mobileNumberPattern = /^\d{10}$/;
    const gmailPattern = /^[a-z0-9._%+-]+@gmail\.com$/;

    const onSubmit = async (data) => {
        const userId = user._id;
        try {
            // Check if the email is unique
            if (data.email !== user.email) {
                const isEmailUnique = await checkEmailUniqueness(data.email);
                if (!isEmailUnique) {
                    toast.error("Email is already in use.");
                    return;
                }

                const updatedUser = await updateUser(data, user);
                console.log('User updated successfully:', updatedUser);
                onUpdate(updatedUser);
            }
            else {
                toast.error("You have entered the same email")
            }
        } catch (error) {
            console.error('Failed to update user:', error);
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
            {errors.firstname && <p>First name is required.</p>}
            <label htmlFor="lastname">Last Name:</label>
            <input
                type="text"
                id="lastname"
                name="lastname"
                {...register("lastname", { required: true })}
            />
            {errors.lastname && <p>Last name is required.</p>}
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                {...register("email", { required: true, pattern: gmailPattern })}
            />
            {errors.email && <p className='MobileNumberValidation'>* Email is not valid</p>}
            <label htmlFor="mobilenumber">Mobile Number:</label>
            <input
                type="text"
                id="mobilenumber"
                name="mobilenumber"
                {...register("mobilenumber", { required: true, pattern: mobileNumberPattern })}
            />
            {errors.mobilenumber && <p className='MobileNumberValidation'>* Mobile number is not valid.</p>}
            <button type="submit">Update</button>
        </form>
    );
};

export default UpdateUser;
