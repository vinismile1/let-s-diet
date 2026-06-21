import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Target,
  Weight,
  Ruler,
  Activity,
  ClipboardList,
  CalendarDays,
  Dumbbell,
  Utensils
} from "lucide-react";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(
          "http://localhost:5000/plans/plans",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(res.data?.[0] || null);
      } catch (err) {
        console.log(err);
        setData(null);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500 dark:text-gray-300">
        Loading Dashboard...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-3xl font-bold mb-4 dark:text-white">
          Welcome User
        </h1>

        <p className="text-gray-500 mb-6">
          No fitness plan found. let's create one for you
        </p>

        <Link
          to="/user/target-setup"
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
        >
          Create Your First Plan
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold dark:text-white">
          Welcome Back 
        </h1>

        <p className="text-gray-500 dark:text-gray-300 mt-2">
          Track your fitness journey and stay consistent.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow">
          <Target className="text-blue-500 mb-4" />
          <h3 className="text-gray-500 dark:text-gray-300">
            Goal
          </h3>
          <p className="text-xl font-bold dark:text-white">
            {data.goal}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow">
          <Weight className="text-green-500 mb-4" />
          <h3 className="text-gray-500 dark:text-gray-300">
            Current Weight
          </h3>
          <p className="text-xl font-bold dark:text-white">
            {data.current_weight} kg
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow">
          <Activity className="text-orange-500 mb-4" />
          <h3 className="text-gray-500 dark:text-gray-300">
            Target Weight
          </h3>
          <p className="text-xl font-bold dark:text-white">
            {data.target_weight} kg
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow">
          <Ruler className="text-purple-500 mb-4" />
          <h3 className="text-gray-500 dark:text-gray-300">
            Height
          </h3>
          <p className="text-xl font-bold dark:text-white">
            {data.height} cm
          </p>
        </div>

      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-5 dark:text-white">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <Link
            to="/user/plans"
            className="bg-blue-600 text-white rounded-2xl p-6 shadow hover:scale-105 duration-300"
          >
            <ClipboardList size={32} className="mb-4" />

            <h3 className="font-bold text-xl mb-2">
              My Plans
            </h3>

            <p className="text-blue-100">
              View all generated plans
            </p>
          </Link>

          <Link
            to="/user/weekly-plan"
            className="bg-green-600 text-white rounded-2xl p-6 shadow hover:scale-105 duration-300"
          >
            <CalendarDays size={32} className="mb-4" />

            <h3 className="font-bold text-xl mb-2">
              Weekly Plan
            </h3>

            <p className="text-green-100">
              Track weekly activities
            </p>
          </Link>

          <Link
            to="/user/target-setup"
            className="bg-orange-500 text-white rounded-2xl p-6 shadow hover:scale-105 duration-300"
          >
            <Target size={32} className="mb-4" />

            <h3 className="font-bold text-xl mb-2">
              Update Goal
            </h3>

            <p className="text-orange-100">
              Modify your target
            </p>
          </Link>

        </div>
      </div>

      {/* Diet & Workout */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Diet */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow">

          <div className="flex items-center gap-3 mb-6">
            <Utensils className="text-green-500" />
            <h2 className="text-2xl font-bold dark:text-white">
              Diet Plan
            </h2>
          </div>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">

            <p>
              <strong>Breakfast:</strong>{" "}
              {data.diet_plan?.breakfast}
            </p>

            <p>
              <strong>Lunch:</strong>{" "}
              {data.diet_plan?.lunch}
            </p>

            <p>
              <strong>Dinner:</strong>{" "}
              {data.diet_plan?.dinner}
            </p>

          </div>

        </div>

        {/* Workout */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow">

          <div className="flex items-center gap-3 mb-6">
            <Dumbbell className="text-blue-500" />
            <h2 className="text-2xl font-bold dark:text-white">
              Workout Plan
            </h2>
          </div>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">

            <p>
              <strong>Monday:</strong>{" "}
              {data.workout_plan?.monday}
            </p>

            <p>
              <strong>Tuesday:</strong>{" "}
              {data.workout_plan?.tuesday}
            </p>

            <p>
              <strong>Wednesday:</strong>{" "}
              {data.workout_plan?.wednesday}
            </p>

            <p>
              <strong>Thursday:</strong>{" "}
              {data.workout_plan?.thursday}
            </p>

            <p>
              <strong>Friday:</strong>{" "}
              {data.workout_plan?.friday}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;