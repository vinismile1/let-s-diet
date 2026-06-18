import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Target, Weight, Activity, Flame } from "lucide-react";
import axios from "axios";

const TargetForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentWeight: "",
    targetWeight: "",
    height: "",
    activityLevel: "moderate",
    goal: "lose-fat",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  await axios.post(
    "http://localhost:5000/api/my-plans",
    form,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  navigate("/user/my-plans");
};

useEffect(() => {
  const fetchPlans = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/my-plans",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setPlans(res.data);
  };

  fetchPlans();
}, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Set Your Fitness Goal
        </h1>
        <p className="text-gray-500 dark:text-gray-300 mt-1">
          Help us create your personalized diet & workout plan
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow space-y-5"
      >

        {/* Current Weight */}
        <div>
          <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Weight size={18} />
            Current Weight (kg)
          </label>
          <input
            type="number"
            name="currentWeight"
            value={form.currentWeight}
            onChange={handleChange}
            className="w-full mt-2 p-3 rounded-xl border dark:bg-slate-700 dark:text-white"
            placeholder="e.g. 72"
          />
        </div>

        {/* Target Weight */}
        <div>
          <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Target size={18} />
            Target Weight (kg)
          </label>
          <input
            type="number"
            name="targetWeight"
            value={form.targetWeight}
            onChange={handleChange}
            className="w-full mt-2 p-3 rounded-xl border dark:bg-slate-700 dark:text-white"
            placeholder="e.g. 65"
          />
        </div>

        {/* Height */}
        <div>
          <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Activity size={18} />
            Height (cm)
          </label>
          <input
            type="number"
            name="height"
            value={form.height}
            onChange={handleChange}
            className="w-full mt-2 p-3 rounded-xl border dark:bg-slate-700 dark:text-white"
            placeholder="e.g. 175"
          />
        </div>

        {/* Goal */}
        <div>
          <label className="text-gray-600 dark:text-gray-300">
            Fitness Goal
          </label>

          <select
            name="goal"
            value={form.goal}
            onChange={handleChange}
            className="w-full mt-2 p-3 rounded-xl border dark:bg-slate-700 dark:text-white"
          >
            <option value="lose-fat">Lose Fat</option>
            <option value="build-muscle">Build Muscle</option>
            <option value="maintain">Maintain Weight</option>
          </select>
        </div>

        {/* Activity Level */}
        <div>
          <label className="text-gray-600 dark:text-gray-300">
            Activity Level
          </label>

          <select
            name="activityLevel"
            value={form.activityLevel}
            onChange={handleChange}
            className="w-full mt-2 p-3 rounded-xl border dark:bg-slate-700 dark:text-white"
          >
            <option value="low">Low (Sedentary)</option>
            <option value="moderate">Moderate</option>
            <option value="high">High (Athletic)</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          <Flame size={18} />
          Generate My Plan
        </button>

      </form>
    </div>
  );
};

export default TargetForm;