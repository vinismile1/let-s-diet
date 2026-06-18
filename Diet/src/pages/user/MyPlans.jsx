import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Utensils, Dumbbell } from "lucide-react";

const MyPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/my-plans",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPlans(res.data || []);
      } catch (err) {
        console.log(err);
        setError("Failed to load plans");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 dark:text-white">
        Loading plans...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          My Plans
        </h1>
        <p className="text-gray-500 dark:text-gray-300">
          All your generated diet and workout plans
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {plans.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">
            No plans found
          </p>
        ) : (
          plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow"
            >

              {/* Type */}
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">
                  {plan.type === "diet" ? (
                    <Utensils className="text-green-500" />
                  ) : (
                    <Dumbbell className="text-blue-500" />
                  )}

                  <span className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-300">
                    {plan.type}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-gray-400 text-sm">
                  <Calendar size={14} />
                  {new Date(plan.date).toLocaleDateString()}
                </div>

              </div>

              {/* Title */}
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mt-3">
                {plan.title}
              </h2>

              {/* Details */}
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">

                {plan.calories && (
                  <p>Calories: {plan.calories} kcal</p>
                )}

                {plan.level && (
                  <p>Level: {plan.level}</p>
                )}

              </div>

              {/* Action */}
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                View Details
              </button>

            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default MyPlans;