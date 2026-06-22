import React, { useState, useEffect } from "react";
import UserSidebar from "./UserSidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu, Bell, Moon, Sun, Search } from "lucide-react";
import axios from "axios";

const UserLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const location = useLocation();
  const navigate = useNavigate();

  // CLOSE SIDEBAR ON ROUTE CHANGE
  useEffect(() => {
    setOpenSidebar(false);
  }, [location.pathname]);

  // DARK MODE SYNC
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // AUTO REDIRECT SAFETY (IMPORTANT FIX)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

   const [user, setUser] = useState(null);

useEffect(() => {

  const fetchUser = async () => {

    try {

      const token = localStorage.getItem("token");
      console.log("TOKEN =", token);
      
      const res = await axios.get(
        "https://let-s-diet-production.up.railway.app/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);

    } catch (err) {
      console.log(err);
    }

  };

  fetchUser();

}, []);

  return (
    <div className="h-full min-h-screen bg-gray-100 dark:bg-slate-900">

      {/* SIDEBAR */}
     <aside
        className={`
          fixed top-0 left-0 h-screen w-64
          bg-slate-900 text-white
          transform transition-transform duration-300
          ${openSidebar ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          z-40
        `}
      >
        <UserSidebar />
      </aside>

      {/* MAIN */}
      <div className="flex-1 lg:ml-64 min-h-screen flex flex-col dark:text-white">

        {/* HEADER */}
        <div className="bg-white dark:bg-slate-800 shadow px-6 py-4 flex justify-between items-center dark:text-white">

          <button
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setOpenSidebar(!openSidebar)}
          >
            <Menu />
          </button>

          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Fitness Dashboard
          </h1>

          <div className="flex items-center gap-4 dark:text-white">

            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun /> : <Moon />}
            </button>

            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center">
             <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-lg">
    {user?.name?.charAt(0).toUpperCase()}
</div>
            </div>

          </div>

        </div>

        {/* CONTENT */}
        <div className="p-6 flex-1 overflow-x-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default UserLayout;