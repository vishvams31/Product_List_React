import "./register.css";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { checkEmailUniqueness, handleClick } from '../../services/Service';
import toast from "react-hot-toast";

export default function Register() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const email = watch('email')
        const isEmailUnique = checkEmailUniqueness(email)
        if (!isEmailUnique) {
            toast.error("Email is already in use")
            return
        }
        await handleClick(data, navigate);
    };

    const validatePassword = () => {
        const passwordValue = watch('password');
        const passwordAgainValue = watch('passwordAgain');

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;

        if (!regex.test(passwordValue)) {
            toast.error('Password must be 8 to 32 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
            return false;
        }
        if (passwordValue !== passwordAgainValue) {
            toast.error('Passwords do not match');
            return false;
        }

        return true;
    };

    const validateMobileNumber = () => {
        const mobileNumber = watch('mobilenumber');
        const regex = /^\d{10}$/;

        if (!regex.test(mobileNumber)) {
            toast.error('Mobile number must be exactly 10 digits');
            return false;
        }
        return true;
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <form className="loginBox" onSubmit={handleSubmit(onSubmit)}>
                    <div className="loginboxTitle">Register User</div>
                    <input placeholder="Firstname" {...register("firstname", { required: true })} className="loginInput" />
                    {errors.firstname && <span>This field is required</span>}
                    <input placeholder="Lastname" {...register("lastname", { required: true })} className="loginInput" />
                    {errors.lastname && <span>This field is required</span>}
                    <input placeholder="Email" {...register("email", { required: true, pattern: /^[a-z0-9._%+-]+@gmail\.com$/ })} className="loginInput" type="email" />
                    {errors.email && <p className="validEmail">Please enter a valid email address</p>}
                    <input placeholder="Mobile no." {...register("mobilenumber", { required: true })} className="loginInput" type="number" onBlur={validateMobileNumber} />
                    {errors.mobilenumber && <span>This field is required</span>}
                    <input placeholder="Password" {...register("password", { required: true })} className="loginInput" type="password" onBlur={validatePassword} />
                    {errors.password && <span>This field is required</span>}
                    <input placeholder="Password Again" {...register("passwordAgain", { required: true })} className="loginInput" type="password" />
                    {errors.passwordAgain && <span>This field is required</span>}
                    <button className="loginButton" type="submit">Sign Up</button>
                    <button className="loginRegisterButton" onClick={() => navigate("/login")}>
                        Log into Account
                    </button>
                </form>
            </div>
        </div>
    );
}
