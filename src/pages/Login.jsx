import React, { useState } from "react";
import { Mail, Key } from "lucide-react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
      await signInWithEmailAndPassword(auth, form.email, form.password);
      alert("Login successful!");
      navigate("/dashboard");       // ✅ FIXED
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Logged in with Google!");
      navigate("/dashboard");       // ✅ FIXED
    } catch (error) {
      console.error("Google login error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="bg-linear-to-br from-green-100 to-white min-h-screen flex justify-center items-center px-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 🌿
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-semibold">Email:</label>
            <div className="flex items-center mt-2 border rounded-md focus-within:ring-2 ring-green-300">
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
            <div className="flex items-center mt-2 border rounded-md focus-within:ring-2 ring-green-300">
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
            className="px-4 py-2 bg-green-400 rounded-xl shadow-lg font-semibold text-lg w-full mt-4 hover:bg-green-500 transition"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="px-4 py-2 bg-red-400 rounded-xl shadow-lg font-semibold text-lg w-full mt-4 hover:bg-red-500 transition"
        >
          Login with Google
        </button>

        <p className="text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
