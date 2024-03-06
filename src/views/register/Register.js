import "./register.css";
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleClick } from '../../services/Service'
import toast from "react-hot-toast";

export default function Register() {
    const email = useRef();
    const firstname = useRef();
    const lastname = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const mobilenumber = useRef();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        await handleClick(e, password, firstname, lastname, email, mobilenumber, navigate);
    };
    const validatePassword = () => {
        const passwordValue = password.current.value;
        const passwordAgainValue = passwordAgain.current.value;
        console.log(passwordValue)
        console.log(passwordAgainValue)
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;

        // Check if the passwords match
        if (!regex.test(passwordValue)) {
            toast.error('Password must be 8 to 32 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
            password.current.value = '';
            passwordAgain.current.value = '';
            return false;
        }
        if (passwordValue !== passwordAgainValue) {
            toast.error('Passwords do not match');
            passwordAgain.current.value = '';
            return false;
        }

        return true;
    };

    const validateMobileNumber = () => {
        const mobileNumber = mobilenumber.current.value;
        const regex = /^\d{10}$/;
        if (!regex.test(mobileNumber)) {
            toast.error('Mobile number must be exactly 10 digits');
            mobilenumber.current.value = '';
            return false;
        }
        return true;
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <form className="loginBox" onSubmit={handleSubmit}>
                    <div className="loginboxTitle">Register User</div>
                    <input placeholder="firstname" required ref={firstname} className="loginInput" />
                    <input placeholder="lastname" required ref={lastname} className="loginInput" />
                    <input placeholder="Email" required ref={email} className="loginInput" type="email" />
                    <input placeholder="Mobile no." required ref={mobilenumber} className="loginInput" type="number" onBlur={validateMobileNumber} />
                    <input placeholder="Password" required ref={password} className="loginInput" type="password"
                        onBlur={validatePassword} />
                    <input placeholder="Password Again" required ref={passwordAgain} className="loginInput" type="password" />
                    <button className="loginButton" type="submit">Sign Up</button>
                    <button className="loginRegisterButton" onClick={() => {
                        navigate("/login")
                    }}>
                        Log into Account
                    </button>
                </form>
            </div>
        </div>
    );
}