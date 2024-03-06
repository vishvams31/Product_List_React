import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginCall } from '../../actions/AuthActions';
import { useNavigate } from 'react-router-dom';
import "./login.css";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isFetching = useSelector(state => state.auth.isFetching);
    const error = useSelector(state => state.auth.error);

    const handleClick = (e) => {
        e.preventDefault();
        const userCredentials = {
            email: email.current.value,
            password: password.current.value,
        };
        dispatch(loginCall(userCredentials));
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <form className="loginBox" onSubmit={handleClick}>
                    <div className="loginboxTitle">Login User</div>
                    <input placeholder="Email" required ref={email} className="loginInput" type="email" />
                    <input placeholder="Password" required ref={password} className="loginInput" type="password" />
                    <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
                    {error && <div className="error">{error}</div>}
                    <button className="loginRegisterButton" onClick={() => {
                        navigate("/register")
                    }}>
                        Create an account
                    </button>
                </form>
            </div>
        </div>
    );
}
