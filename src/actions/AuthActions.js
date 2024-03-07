import axios from 'axios'
import toast from 'react-hot-toast';
import bcrypt from 'bcryptjs'
import { useNavigate } from 'react-router-dom';
export const loginStart = () => ({
    type: 'LOGIN_START',
});
export const loginSuccess = (authUser) => (dispatch) => {
    console.log(authUser)
    dispatch({
        type: 'LOGIN_SUCCESS',
        payload: authUser
    });
    localStorage.setItem('user', JSON.stringify(authUser.user));
};

export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error,
});
export const loginCall = (userCredentials) => async (dispatch) => {
    dispatch(loginStart());

    try {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = storedUsers.find(user => user.email === userCredentials.email);

        if (user) {
            const isMatch = await bcrypt.compare(userCredentials.password, user.password);

            if (isMatch) {
                toast.success("Login successfully");
                const authUser = {
                    user: user
                }
                dispatch(loginSuccess(authUser))
            } else {
                toast.error("Invalid Password")
                dispatch(loginFailure('Invalid password'));
            }
        } else {
            dispatch(loginFailure('Invalid email'));
        }
    } catch (err) {
        dispatch(loginFailure(err.message));
    }
};
