import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Signup from "./components/profile/Signup";
import Login from "./components/profile/Login";
import Summary from "./components/profile/Summary";
import Home from "./pages/Home";
import Map from "./pages/Map";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Summary />} />
        <Route path="/feed" element={<Home />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>
  );
}
