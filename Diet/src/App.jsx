import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

/* COMPONENTS */
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AdminPrivateRoute from "./components/AdminPrivateRoute";

/* PUBLIC PAGES */
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WorkInProgress from "./pages/WorkInProgress";
import AIConsult from "./pages/AIConsult";

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
import UserLayout from "./pages/user/UserLayout";
import Dashboard from "./pages/user/Dashboard";
import TargetForm from "./pages/user/TargetForm";
import UserWeeklyPlan from "./pages/user/UserWeeklyPlan";
import MyPlans from "./pages/user/MyPlans";
import Portfolio from "./pages/user/Portfolio";

function AppContent() {
  const location = useLocation();

  const hideNavbar =
    location.pathname.startsWith("/user") ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/workinprogress" element={<WorkInProgress/>} />
        <Route path="/ai" element={<AIConsult />} />

        {/* USER AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ADMIN AUTH */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignup />} />

        {/* ADMIN PANEL */}
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
          <Route path="exercises" element={<WorkInProgress />} />
          <Route path="weekly-plans" element={<WeeklyPlans />} />
          <Route path="feedback" element={<WorkInProgress />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        {/* USER PANEL */}
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
          <Route path="plans" element={<MyPlans />} />
          <Route path="portfolio" element={<Portfolio />} />
        </Route>

      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;