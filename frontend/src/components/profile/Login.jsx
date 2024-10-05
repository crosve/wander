import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // LOGIN LOGIC HERE
    console.log(formData);
  };

  return (
    <div className="bg-lighter-base-color flex h-screen items-center justify-center">
      <form
        className="max-w-sm space-y-6 rounded-md bg-white p-8 shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-center text-2xl font-thin">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
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
      </form>
    </div>
  );
};

export default Login;
