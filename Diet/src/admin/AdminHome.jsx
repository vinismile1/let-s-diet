import React from "react";
import {
  Users,
  Utensils,
  Dumbbell,
  CalendarDays,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminHome = () => {

  const [stats, setStats] = useState({
  totalUsers: 0,
  totalAdmins: 0,
  totalDietPlans: 0,
});

const [latestUsers, setLatestUsers] = useState([]);
useEffect(() => {
  axios
    .get("http://localhost:5000/api/admin/stats")
    .then((response) => {
      setStats(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

    axios
  .get("http://localhost:5000/api/admin/latest-users")
  .then((response) => {

    setLatestUsers(response.data);

  })
  .catch((err) => {

    console.log(err);

  });
}, []);
  return (
    <div>

      {/* Heading */}
      <h1 className="text-3xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8">
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
        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-2xl font-semibold mb-5">
            Recent Activity
          </h2>

          <div className="space-y-4">

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
        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-2xl font-semibold mb-5">
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
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-semibold mb-6">
          Latest Users
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Name</th>
                <th className="text-left py-3">Email</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>
<tbody>

  {latestUsers.map((user) => (

    <tr
      key={user.id}
      className="border-b"
    >

      <td className="py-4">
        {user.name}
      </td>

      <td>
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