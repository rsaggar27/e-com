import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Cart from "./pages/cart/Cart";
import Products from "./pages/products/Products";
import { useSelector } from "react-redux"

const App = () => {

  const isLoggIn = useSelector((state) => state.auth.isLoggIn)
  const cartItems = useSelector((state) => state.cart.itemsList)
  return (
    <>
      <Router>
        <Routes>
          <Route  path="/" element={<><Header />< Home /></>} />
          <Route  path="/login" element={<Login />} />
          <Route  path="/register" element={<Register />} />
          <Route  path="/products" element={<><Header /><Products /></>} />
          <Route  path="/cart" element={<><Header /><Cart /></>} />
          <Route  path="/profile" element={<><Header /><Profile /></>} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
