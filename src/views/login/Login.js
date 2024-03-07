import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginCall } from '../../redux/actions/AuthActions';
import { useNavigate } from 'react-router-dom';
import "./login.css";
import message from '../../constants/Message';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isFetching = useSelector(state => state.auth.isFetching);
    const error = useSelector(state => state.auth.error);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const userCredentials = {
            email: data.email,
            password: data.password,
        };
        dispatch(loginCall(userCredentials, navigate));
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <form className="loginBox" onSubmit={handleSubmit(onSubmit)}>
                    <div className="loginboxTitle">Login User</div>
                    <input
                        placeholder="Email"
                        {...register("email", { required: true })}
                        className="loginInput"
                        type="email"
                    />
                    {errors.email && <div className="error">{message.FIELD_REQUIRED}</div>}
                    <input
                        placeholder="Password"
                        {...register("password", { required: true })}
                        className={`loginInput ${error ? 'errorInput' : ''}`}
                        type="password"
                    />
                    {errors.password && <div className="error">{message.FIELD_REQUIRED}</div>}
                    <button className="loginButton" type="submit" disabled={isFetching}>
                        Login
                    </button>
                    {error && <div className="error">{error}</div>}
                    <button className="loginRegisterButton" onClick={() => navigate("/register")}>
                        Create an account
                    </button>
                </form>
            </div>
        </div>
    );
}
