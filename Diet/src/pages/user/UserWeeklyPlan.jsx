import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Dumbbell, Salad } from "lucide-react";

const UserWeeklyPlan = () => {

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchPlan = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://let-s-diet-production.up.railway.app/plans/plans",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // latest plan
        setPlan(res.data[0]);

      } catch (err) {
        console.log(err);
      }

      finally {
        setLoading(false);
      }

    };

    fetchPlan();

  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10">
        Loading...
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="text-center mt-10">
        No plan found
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Weekly Plan
        </h1>

        <p className="text-gray-500">
          Your current diet and workout schedule
        </p>
      </div>

      {/* Diet Card */}

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">

        <h2 className="flex items-center gap-2 text-green-600 text-2xl font-bold mb-6">
          <Salad />
          Diet Plan
        </h2>

        <div className="space-y-4 text-lg">

          <div>
            <span className="font-bold">
              Breakfast:
            </span>
            {" "}
            {plan.diet_plan.breakfast}
          </div>

          <div>
            <span className="font-bold">
              Lunch:
            </span>
            {" "}
            {plan.diet_plan.lunch}
          </div>

          <div>
            <span className="font-bold">
              Dinner:
            </span>
            {" "}
            {plan.diet_plan.dinner}
          </div>

        </div>

      </div>

      {/* Workout Card */}

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">

        <h2 className="flex items-center gap-2 text-blue-600 text-2xl font-bold mb-6">
          <Dumbbell />
          Workout Plan
        </h2>

        <div className="space-y-3">

          <p>
            <b>Monday:</b> {plan.workout_plan.monday}
          </p>

          <p>
            <b>Tuesday:</b> {plan.workout_plan.tuesday}
          </p>

          <p>
            <b>Wednesday:</b> {plan.workout_plan.wednesday}
          </p>

          <p>
            <b>Thursday:</b> {plan.workout_plan.thursday}
          </p>

          <p>
            <b>Friday:</b> {plan.workout_plan.friday}
          </p>

        </div>

      </div>

      <div className="flex items-center gap-2 text-gray-500">

        <Calendar size={18} />

        Created On:

        {new Date(plan.created_at).toLocaleDateString()}

      </div>

    </div>
  );
};

export default UserWeeklyPlan;