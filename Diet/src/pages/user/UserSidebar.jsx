import React , { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Utensils,
  Target ,
  Dumbbell,
  CalendarDays,
  MessageSquare,
  BarChart3,
  LogOut,
  Projector
} from "lucide-react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const UserSidebar = () => {

  const [user, setUser] = useState(null);

useEffect(() => {

  const fetchUser = async () => {

    try {

      const token = localStorage.getItem("token");

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

const navigate = useNavigate();

const handleLogout = () => {

  localStorage.removeItem("token");

  navigate("/login");

};


  return (
    <div className="h-full flex flex-col justify-between px-4 py-6 text-white">

      <div>

      {/* <h1 className="text-2xl font-bold mb-8">Let's Diet</h1> */}

      <div className="space-y-2">

        <NavLink
          to="/user"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
                : "hover:bg-slate-800"
            }`
          }
        >
          <LayoutDashboard size={20}/>
          Dashboard
        </NavLink>

        <NavLink
          to="/user/target-setup"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
                : "hover:bg-slate-800"
            }`
          }
        >
          <Target size={20}/>
          Target Setup
        </NavLink>

        <NavLink
  to="/user/plans"
  className={({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
        : "hover:bg-slate-800"
    }`
  }
>
  <Utensils size={20}/>
  My Plans
</NavLink>

        <NavLink
          to="/user/weekly-plan"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
                : "hover:bg-slate-800"
            }`
          }
        >
          <CalendarDays size={20}/>
            Weekly Plan
        </NavLink>

        <NavLink
          to="/user/portfolio"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
                : "hover:bg-slate-800"
            }`
          }
        >
          <Projector size={20}/>
          Portfolio
        </NavLink>

        {/* <NavLink
          to="/admin/feedback"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`
          }
        >
          <MessageSquare size={20}/>
          Feedback
        </NavLink>

        <NavLink
          to="/admin/analytics"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`
          }
        >
          <BarChart3 size={20}/>
          Analytics
        </NavLink> */}

      </div>

      </div>
      <div className="mt-auto border-t border-slate-700 pt-6">

    <div className="flex items-center gap-3 mb-6">

       <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-lg">
    {user?.name?.charAt(0).toUpperCase()}
</div>

<div>
    <h3 className="font-semibold">
        {user?.name}
    </h3>

    <p className="text-sm text-gray-400">
        {user?.email}
    </p>
</div>

    </div>
<button
    onClick={handleLogout}
    className="flex items-center gap-3 text-red-400 hover:text-red-500"
>
    <LogOut size={20}/>
    Logout
</button>

</div>

    </div>
  );
};

export default UserSidebar;