import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Header from "../components/Header";

function KaRoutes() {
  const checkAuthentication = () => {
    const currntLoggedIn = localStorage.getItem("Raman-Current-LoggedIn-Email");
    if (currntLoggedIn) return true;
    return false;
  };

  return checkAuthentication() ? (
    <>
      <Header />
      <div>
        <Routes>
          <Route exact="true" path="/" element={<Home />} />
          <Route exact="true" path="/cart" element={<Cart />} />
          <Route exact="true" path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </>
  ) : (
    <Navigate to="/login-signup" />
  );
}

export default KaRoutes;
