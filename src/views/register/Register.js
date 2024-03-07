import "./register.css";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { checkEmailUniqueness, handleClick } from '../../services/Service';
import toast from "react-hot-toast";
import regex from "../../constants/Regex"
import message from "../../constants/Message";

export default function Register() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const email = watch('email')
        const isEmailUnique = checkEmailUniqueness(email)
        if (!isEmailUnique) {
            toast.error(message.EMAIL_ALREADY_USED)
            return
        }
        await handleClick(data, navigate);
    };

    const validatePassword = () => {
        const passwordValue = watch('password');
        const passwordAgainValue = watch('passwordAgain');

        const passwordRegex = regex.PASSWORD_REGEX;
        console.log(passwordRegex)

        if (!passwordRegex.test(passwordValue)) {
            toast.error(message.PASSWORD_REQUIREMENT_DID_NOT_MATCH);
            return false;
        }
        if (passwordValue !== passwordAgainValue) {
            toast.error(message.PASSWORD_NOT_MATCH);
            return false;
        }

        return true;
    };

    const validateMobileNumber = () => {
        const mobileNumber = watch('mobilenumber');
        const mobileregex = regex.MOBILE_REGEX;


        if (!mobileregex.test(mobileNumber)) {
            toast.error(message.MOBILE_NOT_VALID)
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
                    {errors.firstname && <span>{message.FIELD_REQUIRED}</span>}
                    <input placeholder="Lastname" {...register("lastname", { required: true })} className="loginInput" />
                    {errors.lastname && <span>{message.FIELD_REQUIRED}</span>}
                    <input placeholder="Email" {...register("email", { required: true, pattern: regex.EMAIL_REGEX })} className="loginInput" type="email" />
                    {errors.email && <p className="validEmail">{message.EMAIL_NOT_VALID}</p>}
                    <input placeholder="Mobile no." {...register("mobilenumber", { required: true })} className="loginInput" type="number" onBlur={validateMobileNumber} />
                    {errors.mobilenumber && <span>{message.FIELD_REQUIRED}</span>}
                    <input placeholder="Password" {...register("password", { required: true })} className="loginInput" type="password" onBlur={validatePassword} />
                    {errors.password && <span>{message.FIELD_REQUIRED}</span>}
                    <input placeholder="Password Again" {...register("passwordAgain", { required: true })} className="loginInput" type="password" />
                    {errors.passwordAgain && <span>{message.FIELD_REQUIRED}</span>}
                    <button className="loginButton" type="submit">Sign Up</button>
                    <button className="loginRegisterButton" onClick={() => navigate("/login")}>
                        Log into Account
                    </button>
                </form>
            </div>
        </div>
    );
}
