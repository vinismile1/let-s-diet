import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  Utensils,
  Dumbbell,
  CalendarDays,
} from "lucide-react";

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalDietPlans: 0,
  });

  const [latestUsers, setLatestUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsResponse, usersResponse] = await Promise.all([
          axios.get("https://let-s-diet-production.up.railway.app/api/admin/stats"),
          axios.get("https://let-s-diet-production.up.railway.app/api/admin/latest-users"),
        ]);

        setStats(statsResponse.data);
        setLatestUsers(usersResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Admin Dashboard
      </h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        {/* Users */}
        <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6">
          <Users size={40} />

          <h2 className="mt-4 text-lg">
            Total Users
          </h2>

          <p className="text-3xl font-bold mt-2">
            {stats.totalUsers}
          </p>
        </div>

        {/* Diet Plans */}
        <div className="bg-green-600 text-white rounded-xl shadow-lg p-6">
          <Utensils size={40} />

          <h2 className="mt-4 text-lg">
            Diet Plans
          </h2>

          <p className="text-3xl font-bold mt-2">
            {stats.totalDietPlans}
          </p>
        </div>

        {/* Exercises */}
        <div className="bg-orange-500 text-white rounded-xl shadow-lg p-6">
          <Dumbbell size={40} />

          <h2 className="mt-4 text-lg">
            Exercises
          </h2>

          <p className="text-3xl font-bold mt-2">
            80
          </p>
        </div>

        {/* Weekly Plans */}
        <div className="bg-purple-600 text-white rounded-xl shadow-lg p-6">
          <CalendarDays size={40} />

          <h2 className="mt-4 text-lg">
            Weekly Plans
          </h2>

          <p className="text-3xl font-bold mt-2">
            30
          </p>
        </div>

      </div>

      {/* Middle Section */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">

        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">

          <h2 className="text-2xl font-semibold mb-5 text-gray-800 dark:text-white">
            Recent Activity
          </h2>

          <div className="space-y-4 text-gray-600 dark:text-gray-300">

            <div className="border-b pb-3">
              New user registered
            </div>

            <div className="border-b pb-3">
              Weekly plan generated
            </div>

            <div className="border-b pb-3">
              Diet plan updated
            </div>

            <div>
              Exercise database modified
            </div>

          </div>

        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">

          <h2 className="text-2xl font-semibold mb-5 text-gray-800 dark:text-white">
            Quick Actions
          </h2>

          <div className="flex flex-col gap-4">

            <button className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              Add Diet Plan
            </button>

            <button className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
              Add Exercise
            </button>

            <button className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
              Generate Weekly Plan
            </button>

          </div>

        </div>

      </div>

      {/* Latest Users */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">

        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
          Latest Users
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b dark:border-slate-700">
                <th className="text-left py-3 text-gray-700 dark:text-gray-300">
                  Name
                </th>

                <th className="text-left py-3 text-gray-700 dark:text-gray-300">
                  Email
                </th>

                <th className="text-left py-3 text-gray-700 dark:text-gray-300">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>

              {latestUsers?.map((user) => (
                <tr
                  key={user.id}
                  className="border-b dark:border-slate-700"
                >

                  <td className="py-4 text-gray-700 dark:text-gray-200">
                    {user.name}
                  </td>

                  <td className="text-gray-700 dark:text-gray-200">
                    {user.email}
                  </td>

                  <td className="text-green-600 font-semibold">
                    Active
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
};

export default AdminHome;