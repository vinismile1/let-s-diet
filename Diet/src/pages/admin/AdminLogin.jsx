import React, { useState } from "react";
import { Mail, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
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
        "https://let-s-diet-production.up.railway.app/admins/login",
        form
      );

      localStorage.setItem(
  "adminToken",
  response.data.token
);

console.log(response.data);

alert("Login Successful!");

navigate("/admin");

    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    }
  };

  return (
    <div className="bg-linear-to-br from-blue-100 to-white min-h-screen flex justify-center items-center px-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back Admin 
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            onClick={() => navigate("/admin-login")}
            className="px-4 py-2 bg-blue-400 rounded-xl shadow-lg font-semibold text-lg w-full mt-4 hover:bg-blue-500 transition"
          >
            Login As Admin
          </button>
        </form>

        {/* <button
          onClick={handleGoogleLogin}
          className="px-4 py-2 bg-red-400 rounded-xl shadow-lg font-semibold text-lg w-full mt-4 hover:bg-red-500 transition"
        >
          Login as Admin with Google
        </button> */}

        <p className="text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/admin-signup")}
          >
            Sign Up
          </span>
        </p>

         <p className="text-center mt-4 text-gray-600">
          Sign up as Admin{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/admin-signup")}
          >
            Sign Up as Admin
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
