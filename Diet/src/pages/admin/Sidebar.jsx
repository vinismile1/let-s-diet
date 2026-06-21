import React from "react";
import {
  LayoutDashboard,
  Users,
  Utensils,
  Dumbbell,
  CalendarDays,
  MessageSquare,
  BarChart3,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-xl transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-slate-800"
    }`;

  return (
    <div className="h-full flex flex-col justify-between px-4 py-6 text-white">
      {/* Logo */}
      <div>
        <h1 className="text-2xl font-bold mb-8">Let's Diet</h1>

        <div className="space-y-2">
          {/* <NavLink to="/admin" end className={linkStyle}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink> */}

          <NavLink
                    to="/admin"
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

          {/* <NavLink to="/admin/users" className={linkStyle}>
            <Users size={20} />
            Users
          </NavLink> */}

          <NavLink
                    to="/admin/users" 
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
                          : "hover:bg-slate-800"
                      }`
                    }
                  >
                    <Users size={20} />
            Users
                  </NavLink>

          {/* <NavLink to="/admin/diet-plans" className={linkStyle}>
            <Utensils size={20} />
            Diet Plans
          </NavLink> */}

           <NavLink
                    to="/admin/diet-plans"
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
                          : "hover:bg-slate-800"
                      }`
                    }
                  >
                    <Utensils size={20} />
            Diet Plans
                  </NavLink>

          {/* <NavLink to="/admin/exercises" className={linkStyle}>
            <Dumbbell size={20} />
            Exercises
          </NavLink> */}

           <NavLink
                    to="/admin/exercises"
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
                          : "hover:bg-slate-800"
                      }`
                    }
                  >
                   <Dumbbell size={20} />
            Exercises
                  </NavLink>

          {/* <NavLink to="/admin/weekly-plans" className={linkStyle}>
            <CalendarDays size={20} />
            Weekly Plans
          </NavLink> */}

           <NavLink
                    to="/admin/weekly-plans"
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
                          : "hover:bg-slate-800"
                      }`
                    }
                  >
                   <CalendarDays size={20} />
            Weekly Plans
                  </NavLink>

          {/* <NavLink to="/admin/feedback" className={linkStyle}>
            <MessageSquare size={20} />
            Feedback
          </NavLink> */}

           <NavLink
                    to="/admin/feedback"
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
                          : "hover:bg-slate-800"
                      }`
                    }
                  >
                    <MessageSquare size={20} />
            Feedback
                  </NavLink>



          {/* <NavLink to="/admin/analytics" className={linkStyle}>
            <BarChart3 size={20} />
            Analytics
          </NavLink> */}

          <NavLink
                    to="/admin/analytics"
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
                          : "hover:bg-slate-800"
                      }`
                    }
                  >
                  <BarChart3 size={20} />
            Analytics
                  </NavLink>

        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 text-red-400 hover:text-red-500 border-t border-slate-700 pt-4"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;