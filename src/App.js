import logo from './logo.svg';
import './App.css';

import { useEffect } from "react";
import Login from "./views/login/Login";
import Register from "./views/register/Register";
import Home from "./views/home/Home";
import { loginSuccess } from '../src/actions/AuthActions'
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate

} from "react-router-dom"
import ProductList from './components/productList/ProductList';
import ProductDetails from './components/productDetails/ProductDetails';
import { Toaster } from 'react-hot-toast';
import Profile from './views/profile/Profile';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const authUser = {
      user: user
    }
    // console.log(authUser)
    if (user) {
      dispatch(loginSuccess(authUser));
    }
  }, [dispatch]);

  const user = useSelector(state => state.auth.user)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={user ? <Home /> : <Register />}></Route>
          <Route exact path='/login' element={user ? <Home /> : <Login />}></Route>
          <Route exact path='/register' element={<Register />}></Route>
          <Route exact path="/product/:id" element={<ProductDetails />}></Route>

          <Route exact path="/profile/:username" element={<Profile />} ></Route>
        </Routes>
        <Toaster />
      </BrowserRouter >
    </>
  );
}

export default App;
