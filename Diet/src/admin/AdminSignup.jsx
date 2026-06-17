import React, { useState } from "react";
import { Key, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminSignup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {

    const response = await axios.post(
      "http://localhost:5000/admins/register",
      form
    );

    console.log(response.data);

    alert("Admin account created successfully!");

    navigate("/admin-login");

  } catch (error) {

    console.log(error);

    setError(
      error.response?.data?.message || "Something went wrong"
    );
  }
};

  return (
    <div className="bg-linear-to-br from-blue-200 to-white min-h-screen flex justify-center items-center px-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Admin Account 
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-semibold">Name:</label>
            <div className="flex items-center mt-2 border rounded-md focus-within:ring-2 ring-blue-300">
              <User size={22} className="m-2" />
              <input
                type="text"
                className="px-3 py-2 w-full outline-none"
                placeholder="Enter your name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="font-semibold">Email:</label>
            <div className="flex items-center mt-2 border rounded-md focus-within:ring-2 ring-blue-300">
              <Mail size={22} className="m-2" />
              <input
                type="email"
                className="px-3 py-2 w-full outline-none"
                placeholder="Enter your email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="font-semibold">Password:</label>
            <div className="flex items-center mt-2 border rounded-md focus-within:ring-2 ring-blue-300">
              <Key size={22} className="m-2" />
              <input
                type="password"
                className="px-3 py-2 w-full outline-none"
                placeholder="Enter your password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="px-4 py-2 bg-blue-300 rounded-xl shadow-lg font-semibold text-lg w-full mt-4 hover:bg-blue-400 transition"
          >
            Sign Up As Admin
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/admin-login")}
          >
            Login As Admin
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;
