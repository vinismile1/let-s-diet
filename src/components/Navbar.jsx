import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Salad } from "lucide-react";

const Navbar = () => {
  const menu = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Login", to: "/login" },
  ];

  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect for shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-md ${
        scrolled
          ? "bg-white/80 shadow-lg"
          : "bg-white/50 shadow-sm"
      }`}
    >
      <div className="mx-auto px-8 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link
          to="/"
          className="text-2xl font-semibold flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <Salad size={32} className="text-green-600" />
          <span className="text-gray-800">
            Get
            <span className="text-amber-600 font-bold">Healthy</span>
          </span>
        </Link>

        {/* Menu Section */}
        <div className="flex gap-6">
          {menu.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`relative font-medium transition duration-200 hover:text-amber-600 ${
                  isActive ? "text-amber-600" : "text-gray-700"
                }`}
              >
                {item.label}
                {/* Underline effect */}
                <span
                  className={`absolute left-0 bottom-0 w-full h-[0.5] bg-amber-500 transition-all duration-300 ${
                    isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  } group-hover:scale-x-100 group-hover:opacity-100`}
                ></span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
