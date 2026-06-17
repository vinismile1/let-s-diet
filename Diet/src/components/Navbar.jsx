import React, { useState} from "react";
import { Link, useLocation } from "react-router-dom";
import { Salad, Menu, X } from "lucide-react";

const Navbar = () => {
  const menu = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Login", to: "/login" },
  ];

  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Add scroll effect for shadow
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrolled(window.scrollY > 30);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
   <nav
  className="
  fixed
  top-0
  left-0
  w-full
  z-50
  bg-white
  shadow-md
  height: 88px
"
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
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {menu.map((item) => {
            const isActive = location.pathname === item.to;

            return (
              <Link
                key={item.label}
                to={item.to}
                className={`font-medium transition duration-200 hover:text-amber-600 ${isActive ? "text-amber-600" : "text-gray-700"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-8 py-4 flex flex-col gap-4">

          {menu.map((item) => {
            const isActive = location.pathname === item.to;

            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={`font-medium ${isActive
                    ? "text-amber-600"
                    : "text-gray-700"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}

        </div>
      )}
    </nav>
  );
};

export default Navbar;
