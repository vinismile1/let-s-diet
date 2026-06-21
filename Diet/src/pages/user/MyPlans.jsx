import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Calendar,
  Utensils,
  Dumbbell,
} from "lucide-react";

const MyPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/plans/plans",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPlans(response.data);
      } catch (err) {
        console.log(err);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          My Plans
        </h1>

        <p className="text-gray-500 dark:text-gray-300 mt-2">
          Your generated diet and workout plans
        </p>
      </div>

      {plans.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
          <h2 className="text-gray-500 dark:text-gray-300">
            No plans found.
          </h2>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => {
            // Already parsed in backend
            const dietPlan = plan.diet_plan;
            const workoutPlan = plan.workout_plan;

            return (
              <div
                key={plan.id}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6"
              >
                {/* Date */}
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-300 mb-4">
                  <Calendar size={18} />
                  {new Date(plan.created_at).toLocaleDateString()}
                </div>

                {/* Goal */}
                <h2 className="text-2xl font-bold text-blue-600 mb-5">
                  Goal: {plan.goal}
                </h2>

                {/* Body Info */}
                <div className="space-y-2 mb-6 text-gray-700 dark:text-gray-200">
                  <p>
                    <strong>Current Weight:</strong>{" "}
                    {plan.current_weight} kg
                  </p>

                  <p>
                    <strong>Target Weight:</strong>{" "}
                    {plan.target_weight} kg
                  </p>

                  <p>
                    <strong>Height:</strong>{" "}
                    {plan.height} cm
                  </p>

                  <p>
                    <strong>Activity Level:</strong>{" "}
                    {plan.activity_level}
                  </p>
                </div>

                {/* Diet Plan */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Utensils className="text-green-600" />
                    <h3 className="text-lg font-bold">
                      Diet Plan
                    </h3>
                  </div>

                  <div className="space-y-2 text-gray-700 dark:text-gray-200">
                    <p>
                      <strong>Breakfast:</strong>{" "}
                      {dietPlan.breakfast}
                    </p>

                    <p>
                      <strong>Lunch:</strong>{" "}
                      {dietPlan.lunch}
                    </p>

                    <p>
                      <strong>Dinner:</strong>{" "}
                      {dietPlan.dinner}
                    </p>
                  </div>
                </div>

                {/* Workout Plan */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Dumbbell className="text-blue-600" />
                    <h3 className="text-lg font-bold">
                      Workout Plan
                    </h3>
                  </div>

                  <div className="space-y-2 text-gray-700 dark:text-gray-200">
                    <p>
                      <strong>Monday:</strong>{" "}
                      {workoutPlan.monday}
                    </p>

                    <p>
                      <strong>Tuesday:</strong>{" "}
                      {workoutPlan.tuesday}
                    </p>

                    <p>
                      <strong>Wednesday:</strong>{" "}
                      {workoutPlan.wednesday}
                    </p>

                    <p>
                      <strong>Thursday:</strong>{" "}
                      {workoutPlan.thursday}
                    </p>

                    <p>
                      <strong>Friday:</strong>{" "}
                      {workoutPlan.friday}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyPlans;