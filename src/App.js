import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import KaRoutes from "./routes/KaRoutes";
import LoginSignup from "./pages/LoginSignup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login-signup" exact element={<LoginSignup />} />
        <Route path="/*" element={<KaRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
