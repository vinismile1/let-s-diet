import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Activity,
  Target,
  Flame,
  TrendingUp,
  Droplet,
  Dumbbell,
} from "lucide-react";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    currentWeight: 0,
    targetWeight: 0,
    calories: 0,
    bmi: 0,
  });

  const [latestPlan, setLatestPlan] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        // 🔥 fetch latest plan
        const res = await axios.get(
          "http://localhost:5000/api/my-plans",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const dataArr = res.data || [];

        if (dataArr.length > 0) {
          const plan = res.data[0];

          const current = plan.current_weight;
          const height = plan.height / 100;

          const bmi = (current / (height * height)).toFixed(1);

          setData({
            currentWeight: plan.current_weight,
            targetWeight: plan.target_weight,
            calories: 2400, // later AI-based
            bmi,
          });

          setLatestPlan(plan);
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 dark:text-white">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Welcome */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Good Evening 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-300 mt-1">
          Ready to push your fitness goals today?
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow">
          <Activity className="text-blue-500" />
          <p className="text-gray-500">Current Weight</p>
          <h2 className="text-2xl font-bold">{data.currentWeight} kg</h2>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow">
          <Target className="text-green-500" />
          <p className="text-gray-500">Target Weight</p>
          <h2 className="text-2xl font-bold">{data.targetWeight} kg</h2>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow">
          <Flame className="text-orange-500" />
          <p className="text-gray-500">Calories/day</p>
          <h2 className="text-2xl font-bold">{data.calories} kcal</h2>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow">
          <TrendingUp className="text-purple-500" />
          <p className="text-gray-500">BMI</p>
          <h2 className="text-2xl font-bold">{data.bmi}</h2>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <Link to="my-plans" className="p-4 bg-blue-50 dark:bg-slate-700 rounded-xl">
            <Target className="text-blue-500 mb-2" />
            Generate Plan
          </Link>

          <Link to="weekly-plan" className="p-4 bg-green-50 dark:bg-slate-700 rounded-xl">
            <Dumbbell className="text-green-500 mb-2" />
            Weekly Plan
          </Link>

          <Link to="target-setup" className="p-4 bg-orange-50 dark:bg-slate-700 rounded-xl">
            <Droplet className="text-orange-500 mb-2" />
            Track Progress
          </Link>

        </div>
      </div>

      {/* Latest Plan */}
      {latestPlan && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-3">
            Latest Plan
          </h2>

          <p>Goal: {latestPlan.goal}</p>
          <p>Activity: {latestPlan.activity_level}</p>
        </div>
      )}

    </div>
  );
};

export default Dashboard;