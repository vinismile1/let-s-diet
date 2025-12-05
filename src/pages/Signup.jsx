import React, { useState } from "react";
import { Key, Mail, User } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { db, auth, googleProvider } from "../Firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Signup = () => {
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
      console.log(form.name, form.email, form.password);
      
      const userData = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      console.log(userData);
      

      const user = userData.user;
      console.log(user);

      await setDoc(doc(db, "user", user.uid), {
        name: form.name,
        email: form.email,
        uid: user.uid,
        createdAt: serverTimestamp(),
      });
      console.log("dfi");
      

      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      alert("Signed up with Google successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error signing up with Google:", error);
      setError(error.message);
    }
  };

  return (
    <div className="bg-linear-to-br from-yellow-200 to-white min-h-screen flex justify-center items-center px-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account 🌿
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-semibold">Name:</label>
            <div className="flex items-center mt-2 border rounded-md focus-within:ring-2 ring-yellow-300">
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
            <div className="flex items-center mt-2 border rounded-md focus-within:ring-2 ring-yellow-300">
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
            <div className="flex items-center mt-2 border rounded-md focus-within:ring-2 ring-yellow-300">
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
            className="px-4 py-2 bg-yellow-300 rounded-xl shadow-lg font-semibold text-lg w-full mt-4 hover:bg-yellow-400 transition"
          >
            Sign Up
          </button>
        </form>

        <button
          onClick={handleGoogleSignup}
          className="px-4 py-2 bg-red-400 rounded-xl shadow-lg font-semibold text-lg w-full mt-4 hover:bg-red-500 transition"
        >
          Sign Up with Google
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
