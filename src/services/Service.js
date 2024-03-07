import toast from 'react-hot-toast';
import bcrypt from 'bcryptjs';
import message from '../constants/Message';
const BASE_URL = "https://dummyjson.com/";
export const fetchProducts = async (skip, limit) => {
    try {
        const response = await fetch(BASE_URL + `products?skip=${skip}&limit=${limit}`);
        if (!response.ok) {
            throw new Error(message.ERR_NETWORK);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(message.ERR_PRODUCTS, error);
        return []; // Return an empty array in case of error
    }
};
export const fetchProductDetails = async (id) => {
    try {
        const response = await fetch(BASE_URL + `products/${id}`);
        if (!response.ok) {
            throw new Error(message.ERR_NETWORK);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(message.ERR_PRODUCT_DETAILS, error);
        return null;
    }
};
//register a user
export const handleClick = async (data, navigate) => {
    if (data.preventDefault) {
        data.preventDefault();
    }
    const { password, firstname, lastname, email, mobilenumber } = data;

    const hashPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    };

    try {
        const hashedPassword = await hashPassword(password);

        const userId = Date.now().toString();
        const newUser = {
            id: userId,
            firstname,
            lastname,
            email,
            mobilenumber,
            password: hashedPassword
        };

        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        toast.success(message.SUCCESS_REGISTER);
        navigate("/login");
    } catch (err) {
        console.log(err);
    }
};



export const fetchUserDetails = () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        return user;
    } catch (error) {
        console.error(message.ERR_USER_DETAILS, error);
        return null;
    }
};

//update userInformation
export const updateUser = (values, user) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = storedUsers.findIndex(u => u.id === user.id);

    if (userIndex !== -1) {
        const updatedUser = {
            ...user,
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            mobilenumber: values.mobilenumber,
        };
        storedUsers[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(storedUsers));
        localStorage.setItem('user', JSON.stringify(updatedUser));
        toast.success(message.SUCCESS_UPDATE);
    } else {
        toast.error(message.USER_BOT_FOUND);
    }
};

//change Password
export const changePassword = (newPassword, user) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = storedUsers.findIndex(u => u.id === user.id);

    if (userIndex !== -1) {
        const salt = bcrypt.genSaltSync(10);
        const hashedNewPassword = bcrypt.hashSync(newPassword, salt);
        const updatedUser = {
            ...user,
            password: hashedNewPassword,
        };
        storedUsers[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(storedUsers));

        // Update the current user's object in local storage 
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser && currentUser.id === user.id) {
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }

        toast.success(message.SUCCESS_PASSWORD);
    } else {
        toast.error(message.USER_BOT_FOUND);
    }
};
//upon update check email is unique
export const checkEmailUniqueness = (email) => {
    try {
        // Retrieve the users array from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const isEmailUnique = !users.some(user => user.email === email);

        return isEmailUnique;
    } catch (error) {
        console.error(message.ERR_EMAIL_UNIQUE, error);
        return false;
    }
};

