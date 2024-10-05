import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Signup from "./components/profile/Signup";
import Login from "./components/profile/Login";
import Summary from "./components/profile/Summary";
import Home from "./pages/Home";
import Map from "./pages/Map";
import LandingPage from "./pages/LandingPage";

function ProtectedRoute({ element }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return element;
}

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Summary />} />}
        />
        <Route path="/feed" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/map" element={<ProtectedRoute element={<Map />} />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
