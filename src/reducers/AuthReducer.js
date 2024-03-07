// src/reducers/AuthReducer.js

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return { ...state, isFetching: true, error: null };
        case 'LOGIN_SUCCESS':
            return { ...state, user: action.payload.user, isFetching: false, error: null };
        case 'LOGIN_FAILURE':
            return { ...state, user: null, isFetching: false, error: action.payload };
        default:
            return state;
    }
};
export default AuthReducer;
