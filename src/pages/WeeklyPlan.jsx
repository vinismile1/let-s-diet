import { Calendar, Dumbbell, Salad } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const WeeklyPlan = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { plan, form, bodyType } = state || {};
  const [selectedDay, setSelectedDay] = useState(0);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  if (!plan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          No plan data found
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-yellow-400 px-5 py-3 rounded-xl text-gray-900 font-medium hover:bg-yellow-300 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  const dietPlan = plan?.dietPlan || {};
  const exercisePlan = plan?.exercisePlan || {};

  const currentDiet = dietPlan[selectedDay] || {};
  const currentExercise = exercisePlan[selectedDay] || {};

  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-50 via-white to-yellow-100 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-yellow-600 transition"
        >
          Back
        </button>
        <h1 className="text-3xl font-bold max-w-md text-yellow-500 text-center">
          Your Personalized Fitness Plan
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-4 border-t-4 border-yellow-400">
          <Salad className="text-yellow-500 w-8 h-8" />
          <div>
            <p className="text-gray-600 text-sm">Body Type</p>
            <p className="text-lg font-semibold">{bodyType}</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-4 border-t-4 border-yellow-400">
          <Dumbbell className="text-yellow-500 w-8 h-8" />
          <div>
            <p className="text-gray-600 text-sm">Target Weight</p>
            <p className="text-lg font-semibold">{form?.targetWeight} kg</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-4 border-t-4 border-yellow-400">
          <Calendar className="text-yellow-500 w-8 h-8" />
          <div>
            <p className="text-gray-600 text-sm">Calories/Day</p>
            <p className="text-lg font-semibold">{form?.calory} kcal</p>
          </div>
        </div>
      </div>

      {/* Day Selector */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {days.map((day, i) => (
          <button
            key={day}
            onClick={() => setSelectedDay(i)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              selectedDay === i
                ? "bg-yellow-400 text-gray-900 shadow-md"
                : "bg-white text-gray-600 hover:bg-yellow-100"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Plans Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Diet Plan */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-yellow-400">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 bg-yellow-200 p-4 rounded-lg">
            <Salad className="w-5 h-5" /> Diet Plan - {days[selectedDay]}
          </h2>

          {currentDiet.focus && (
            <h6 className="font-semibold text-md text-yellow-600 mb-3">
              Focus: {currentDiet.focus}
            </h6>
          )}

          {currentDiet.meals ? (
            <ul className="space-y-2">
              {Object.entries(currentDiet.meals).map(([meal, desc], idx) => (
                <li key={idx}>
                  <span className="font-semibold text-blue-600 capitalize">
                    {meal}:
                  </span>{" "}
                  {desc}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No meal details available.</p>
          )}
        </div>

        {/* Exercise Plan */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-yellow-400">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 bg-yellow-200 p-4 rounded-lg">
            <Dumbbell className="w-5 h-5" /> Exercise Plan - {days[selectedDay]}
          </h2>

          {currentExercise.activity && (
            <>
              <h6 className="font-semibold text-md text-yellow-600 mb-1">
                {currentExercise.activity}
              </h6>
              <p className="text-sm text-gray-500 mb-3">
                Duration: {currentExercise.duration}
              </p>
            </>
          )}

          {currentExercise.details ? (
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {currentExercise.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">
              No exercise details available.
            </p>
          )}
        </div>
      </div>
        <p className="font-semibold p-8 text-green-600 text-center">{plan.disclaimer}</p>
    </div>
  );
};

export default WeeklyPlan;