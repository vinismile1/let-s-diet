import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";

import About from "./pages/About";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AdminSignup from "./admin/AdminSignup";
import AdminLogin from "./admin/AdminLogin";

import Dashboard from "./user/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

import Admin from "./admin/Admin";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import AdminHome from "./admin/AdminHome";

import TargetForm from "./user/TargetForm";
import WeeklyPlan from "./user/WeeklyPlan";

/* ADMIN PAGES */
import Users from "./admin/Users";
import DietPlans from "./admin/DietPlans";
import Exercises from "./admin/Exercises";
import WeeklyPlans from "./admin/WeeklyPlans";
import Feedback from "./admin/Feedback";
import Analytics from "./admin/Analytics";

/*User Layout*/
import UserLayout from "./user/UserLayout";
import MyPlans from "./user/MyPlans";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />


        {/* ADMIN PROTECTED + LAYOUT */}
        <Route
          path="/admin"
          element={
            <AdminPrivateRoute>
              <Admin />
            </AdminPrivateRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="users" element={<Users />} />
          <Route path="diet-plans" element={<DietPlans />} />
          <Route path="exercises" element={<Exercises />} />
          <Route path="weekly-plans" element={<WeeklyPlans />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        {/* USER PROTECTED + LAYOUT */}
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UserLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="target-setup" element={<TargetForm />} />
          <Route path="weekly-plan" element={<WeeklyPlan />} />
          <Route path="my-plans" element={<MyPlans />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;