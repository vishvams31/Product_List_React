import logo from './logo.svg';
import './App.css';

import { useEffect } from "react";
import Login from "./views/login/Login";
import Register from "./views/register/Register";
import Home from "./views/home/Home";
import { loginSuccess } from '../src/redux/actions/AuthActions'
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom"
import ProductDetails from './components/productDetails/ProductDetails';
import { Toaster } from 'react-hot-toast';
import Profile from './views/profile/Profile';
import HomeOrRegister from './components/HomeOrRegister/HomeOrRegister';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const authUser = {
      user: user
    }
    if (user) {
      dispatch(loginSuccess(authUser));
    }
  }, [dispatch]);

  const user = useSelector(state => state.auth.user)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeOrRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
