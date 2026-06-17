import React from "react";
import {
  LayoutDashboard,
  Users,
  Utensils,
  Dumbbell,
  CalendarDays,
  MessageSquare,
  BarChart3,
  LogOut
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-full overflow-y-auto text-white p-6">

      <h1 className="text-3xl font-bold mb-10">
        Let's Diet
      </h1>

      <div className="space-y-2">

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`
          }
        >
          <LayoutDashboard size={20}/>
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`
          }
        >
          <Users size={20}/>
          Users
        </NavLink>

        <NavLink
          to="/admin/diet-plans"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`
          }
        >
          <Utensils size={20}/>
          Diet Plans
        </NavLink>

        <NavLink
          to="/admin/exercises"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`
          }
        >
          <Dumbbell size={20}/>
          Exercises
        </NavLink>

        <NavLink
          to="/admin/weekly-plans"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`
          }
        >
          <CalendarDays size={20}/>
          Weekly Plans
        </NavLink>

        <NavLink
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
        </NavLink>

      </div>

      <div className="mt-16 border-t border-slate-700 pt-6">

        <button className="flex items-center gap-3 text-red-400 hover:text-red-500">

          <LogOut size={20}/>

          Logout

        </button>

      </div>

    </div>
  );
};

export default Sidebar;