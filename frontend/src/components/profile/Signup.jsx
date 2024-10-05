import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    tags: [],
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const addTags = (e) => {
    e.preventDefault();

    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: [...prevFormData.tags, e.target.value],
    }));
  };

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
        "http://localhost:3000/signup",
        formData,
      );

      console.log(response);

      const data = response.data;

      if (response.status !== 200) {
        console.log(data);
        setError(data.message || "An error occurred");
      } else {
        const jwtToken = data.jwtToken;

        localStorage.setItem("jwtToken", jwtToken);
        setMessage("Signup was successful!");
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "An error occurred"); // Use optional chaining
    }

    console.log(formData);
  };

  return (
    <div className="bg-lighter-base-color flex h-screen items-center justify-center">
      <form
        className="max-w-sm space-y-6 rounded-md bg-white p-8 shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-center text-2xl font-thin">Sign Up</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-md border px-4 py-2 shadow-sm focus:outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-md border px-4 py-2 shadow-sm focus:outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-md border px-4 py-2 shadow-sm focus:outline-none"
        />
        <select
          className="w-full rounded-md border px-4 py-2 shadow-sm focus:outline-none"
          name="tags"
          placeholder="select location tags"
          multiple
          onChange={(e) => addTags(e)}
        >
          <option value="NYC">Newyork City</option>
        </select>
        <button
          type="submit"
          className="bg-darker-base-color w-full rounded-md py-2 text-white shadow-md transition-all duration-300 hover:scale-105"
        >
          Sign Up
        </button>
        {error && <h1 className="text-center text-red-500">{error}</h1>}
        {message && <h1 className="text-center text-green-500">{message}</h1>}
      </form>
    </div>
  );
};

export default Signup;
