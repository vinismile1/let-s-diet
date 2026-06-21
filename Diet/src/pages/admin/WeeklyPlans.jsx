import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Calendar,
  User,
  Target,
  Weight
} from "lucide-react";

const WeeklyPlans = () => {

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchPlans = async () => {

      try {

        const token = localStorage.getItem("adminToken");

        const res = await axios.get(
          "https://let-s-diet-production.up.railway.app/plans/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPlans(res.data);

      } catch (err) {
        console.log(err);
      }

      finally {
        setLoading(false);
      }

    };

    fetchPlans();

  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500">
        Loading plans...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold  dark:text-white">
          Weekly Plans
        </h1>

        <p className="text-gray-500">
          All users generated plans
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 ">

        {plans.map((plan) => (

          <div
            key={plan.id}
            className="bg-gray-200 border rounded-2xl p-6  "
          >

            <div className="flex items-center gap-2 mb-3">

              <User className="text-blue-600"/>

              <div>
                <h2 className="font-bold text-xl">
                  {plan.name}
                </h2>

                <p className="text-gray-500">
                  {plan.email}
                </p>
              </div>

            </div>


            <div className="space-y-2 text-gray-700">

              <p className="flex gap-2">
                <Target size={18}/>
                Goal:
                <b>{plan.goal}</b>
              </p>

              <p className="flex gap-2">
                <Weight size={18}/>
                Current Weight:
                {plan.current_weight} kg
              </p>

              <p>
                Target Weight:
                {plan.target_weight} kg
              </p>

              <p>
                Height:
                {plan.height} cm
              </p>

              <p>
                Activity Level:
                {plan.activity_level}
              </p>

            </div>

            <hr className="my-4"/>

            <div>

              <h3 className="font-bold text-green-600 mb-2">
                Diet Plan
              </h3>

              <p>
                Breakfast :
                {plan.diet_plan.breakfast}
              </p>

              <p>
                Lunch :
                {plan.diet_plan.lunch}
              </p>

              <p>
                Dinner :
                {plan.diet_plan.dinner}
              </p>

            </div>

            <hr className="my-4"/>

            <div>

              <h3 className="font-bold text-blue-600 mb-2">
                Workout Plan
              </h3>

              <p>Monday : {plan.workout_plan.monday}</p>
              <p>Tuesday : {plan.workout_plan.tuesday}</p>
              <p>Wednesday : {plan.workout_plan.wednesday}</p>
              <p>Thursday : {plan.workout_plan.thursday}</p>
              <p>Friday : {plan.workout_plan.friday}</p>

            </div>

            <div className="mt-4 text-gray-500 flex gap-2">
              <Calendar size={18}/>
              {new Date(plan.created_at).toLocaleDateString()}
            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default WeeklyPlans;