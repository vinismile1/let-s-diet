import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#9333ea"];

const Analytics = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalDietPlans: 0,
  });

  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    // Stats API
    axios
      .get("http://localhost:5000/api/admin/stats")
      .then((response) => {
        const data = response.data;

        setStats(data);

        setPieData([
          {
            name: "Users",
            value: data.totalUsers,
          },
          {
            name: "Admins",
            value: data.totalAdmins,
          },
          {
            name: "Diet Plans",
            value: data.totalDietPlans,
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });

    // Monthly Users API
    axios
      .get("http://localhost:5000/api/admin/monthly-users")
      .then((response) => {
        setBarData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Analytics
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* User Growth */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">

          <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
            User Growth
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis
                dataKey="month"
                stroke="#9ca3af"
              />

              <YAxis
                stroke="#9ca3af"
              />

              <Tooltip />

              <Bar
                dataKey="users"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

        {/* Distribution */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">

          <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
            Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                innerRadius={50}
                paddingAngle={5}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

          {/* Summary */}
          <div className="mt-6 space-y-4 text-gray-800 dark:text-white">

            <div className="flex justify-between border-b border-gray-200 dark:border-slate-700 pb-2">
              <span>Users</span>
              <span className="font-bold">
                {stats.totalUsers}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-200 dark:border-slate-700 pb-2">
              <span>Admins</span>
              <span className="font-bold">
                {stats.totalAdmins}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Diet Plans</span>
              <span className="font-bold">
                {stats.totalDietPlans}
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Analytics;