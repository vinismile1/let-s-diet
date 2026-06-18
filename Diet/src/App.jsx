import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


import PrivateRoute from "./components/PrivateRoute";
import AdminPrivateRoute from "./components/AdminPrivateRoute";

/* ADMIN PAGES */
import AdminSignup from "./pages/admin/AdminSignup";
import AdminLogin from "./pages/admin/AdminLogin";
import Admin from "./pages/admin/Admin";
import AdminHome from "./pages/admin/AdminHome";
import Users from "./pages/admin/Users";
import DietPlans from "./pages/admin/DietPlans";
import Exercises from "./pages/admin/Exercises";
import WeeklyPlans from "./pages/admin/WeeklyPlans";
import Feedback from "./pages/admin/Feedback";
import Analytics from "./pages/admin/Analytics";

/* USER PAGES */
import Dashboard from "./pages/user/Dashboard";
import UserLayout from "./pages/user/UserLayout";
import MyPlans from "./pages/user/MyPlans";
import Portfolio from "./pages/user/Portfolio";
import UserWeeklyPlan from "./pages/user/UserWeeklyPlan";
import TargetForm from "./pages/user/TargetForm";
import UserWeeklyPlan from "./user/UserWeeklyPlan";


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
          <Route path="weekly-plan" element={<UserWeeklyPlan />} />
          <Route path="my-plans" element={<MyPlans />} />
          <Route path="portfolio" element={<Portfolio />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;