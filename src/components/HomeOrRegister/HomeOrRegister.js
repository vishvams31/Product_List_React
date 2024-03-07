import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Home from '../../views/home/Home';
import Register from '../../views/register/Register';

const HomeOrRegister = () => {
    const user = useSelector(state => state.auth.user);

    if (user) {
        return <Home />;
    } else {
        return <Register />;
    }
};
export default HomeOrRegister