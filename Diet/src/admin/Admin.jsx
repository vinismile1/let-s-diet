import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import {
  Menu,
  Bell,
  Moon,
  Sun,
  Search,
} from "lucide-react";

const Admin = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-900">

      {/* Sidebar */}
      <div
  className={`
    fixed top-[88px] left-0
    h-[calc(100vh-88px)]
    w-64
    bg-gradient-to-b
    from-slate-900
    via-slate-800
    to-slate-950
    text-white
    border-r border-slate-700
    shadow-2xl
    z-50
    ${openSidebar ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
    transition-transform duration-300 ease-in-out
  `}
>
  <Sidebar />
</div>

      {/* Main Area */}
      <div className="flex-1 lg:ml-64 bg-gray-100 dark:bg-slate-900 min-h-screen">

        {/* Header */}
       <div className="bg-white dark:bg-slate-800 shadow px-6 py-4 flex justify-between items-center">

          {/* Left */}
          <div className="flex items-center gap-4">

            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
              onClick={() => setOpenSidebar(!openSidebar)}
            >
              <Menu
                size={28}
                className="text-gray-700 dark:text-white"
              />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Admin Dashboard
              </h1>

              <p className="hidden md:block text-sm text-gray-500 dark:text-gray-400">
                Manage users, diet plans and analytics
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            {/* Search */}
            <div className="hidden md:flex items-center bg-gray-100 dark:bg-slate-700 rounded-xl px-4 py-2">

              <Search
                size={18}
                className="text-gray-500 dark:text-gray-300"
              />

              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none ml-2 text-gray-700 dark:text-white"
              />

            </div>

            {/* Bell */}
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">

              <Bell
                size={22}
                className="text-gray-700 dark:text-white"
              />

            </button>

            {/* Dark Mode */}
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
              onClick={() => setDarkMode(!darkMode)}
            >

              {darkMode ? (
                <Sun
                  size={22}
                  className="text-yellow-400"
                />
              ) : (
                <Moon
                  size={22}
                  className="text-gray-700"
                />
              )}

            </button>

            {/* Profile */}
            <div className="flex items-center gap-3">

              <div className="hidden md:block text-right">

                <p className="font-semibold text-gray-800 dark:text-white">
                  Admin
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  admin@gmail.com
                </p>

              </div>

              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>

            </div>

          </div>

        </div>

        {/* Content */}
        <div className="p-6 overflow-x-auto">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default Admin;