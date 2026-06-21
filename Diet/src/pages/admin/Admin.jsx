import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Menu, Bell, Moon, Sun, Search } from "lucide-react";

const Admin = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
    const [darkMode, setDarkMode] = useState(
      localStorage.getItem("theme") === "dark"
    );

     useEffect(() => {
        setOpenSidebar(false);
      }, [location.pathname]);

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
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-900 ">

      {/* SIDEBAR (fixed but NOT overlapping header anymore) */}
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
        <Sidebar />
      </aside>


      {/* MAIN WRAPPER (IMPORTANT FIX) */}
      <div className="flex flex-col flex-1 lg:ml-64 min-h-screen">

        {/* HEADER (now inside main area only) */}
        <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-800 shadow  dark:text-white">

          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden"
              onClick={() => setOpenSidebar(!openSidebar)}
            >
              <Menu />
            </button>

            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Admin Dashboard
            </h1>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            <div className="hidden md:flex items-center bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded">
              <Search size={16} />
              <input
                className="bg-transparent outline-none ml-2"
                placeholder="Search..."
              />
            </div>

            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun /> : <Moon />}
            </button>

            <Bell />
          </div>

        </header>

        {/* PAGE CONTENT */}
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default Admin;