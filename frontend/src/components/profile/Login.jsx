import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      navigate("/feed");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData,
      );
      console.log(response);
      if (response.status == 200) {
        setMessage("Sucess");

        localStorage.setItem("jwtToken", response.data.jwtToken);
        navigate("/feed");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }

    console.log(formData);
  };

  return (
    <>
      <NavBar />
      <div className="bg-lighter-base-color flex h-screen items-center justify-center">
        <form
          className="max-w-sm space-y-6 rounded-md bg-white p-8 shadow-md"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-4 text-center text-2xl font-thin">Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email or Username"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md border px-4 py-2 shadow-sm"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-md border px-4 py-2 shadow-sm"
          />
          <button
            type="submit"
            className="bg-base-color w-full rounded-md py-2 text-white shadow-md transition-all duration-300 hover:scale-105"
          >
            Login
          </button>
          {message && <h1 className="text-center text-green-500">{message}</h1>}
          {error && <h1 className="text-center text-red-600">{error}</h1>}
        </form>
      </div>
    </>
  );
};

export default Login;
