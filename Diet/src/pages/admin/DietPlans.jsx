import React, { useEffect, useState } from "react";
import axios from "axios";

const DietPlans = () => {

  const [plans, setPlans] = useState([]);

  const [form, setForm] = useState({
    body_type: "",
    calories: "",
    breakfast: "",
    lunch: "",
    dinner: "",
    workout: ""
  });

  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {

      const response = await axios.get(
        "https://let-s-diet-production.up.railway.app/diet/all"
      );

      setPlans(response.data);

    } catch (err) {

      console.log(err);

    }
  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const resetForm = () => {

    setForm({
      body_type: "",
      calories: "",
      breakfast: "",
      lunch: "",
      dinner: "",
      workout: ""
    });

    setEditingPlan(null);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingPlan) {

        await axios.put(
          `https://let-s-diet-production.up.railway.app/diet/update/${editingPlan.id}`,
          form
        );

        alert("Diet plan updated successfully");

      } else {

        await axios.post(
          "https://let-s-diet-production.up.railway.app/diet/add",
          form
        );

        alert("Diet plan added successfully");

      }

      fetchPlans();
      resetForm();

    } catch (err) {

      console.log(err);
      alert("Operation failed");

    }

  };

  const handleEdit = (plan) => {

    setEditingPlan(plan);

    setForm({
      body_type: plan.body_type,
      calories: plan.calories,
      breakfast: plan.breakfast,
      lunch: plan.lunch,
      dinner: plan.dinner,
      workout: plan.workout
    });

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this diet plan?")) {
      return;
    }

    try {

      await axios.delete(
        `https://let-s-diet-production.up.railway.app/diet/delete/${id}`
      );

      setPlans((prev) =>
        prev.filter((plan) => plan.id !== id)
      );

    } catch (err) {

      console.log(err);

    }

  };

  return (
    <div>

      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Diet Plans
      </h1>

      {/* FORM */}

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow mb-8 dark:text-white">

        <h2 className="text-2xl font-bold mb-5 dark:text-white">

          {editingPlan
            ? "Edit Diet Plan"
            : "Add Diet Plan"}

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="body_type"
            placeholder="Body Type"
            value={form.body_type}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="number"
            name="calories"
            placeholder="Calories"
            value={form.calories}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="breakfast"
            placeholder="Breakfast"
            value={form.breakfast}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="lunch"
            placeholder="Lunch"
            value={form.lunch}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="dinner"
            placeholder="Dinner"
            value={form.dinner}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="workout"
            placeholder="Workout"
            value={form.workout}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <div className="flex gap-3">

            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              {editingPlan
                ? "Update Plan"
                : "Add Plan"}
            </button>

            {editingPlan && (

              <button
                type="button"
                onClick={resetForm}
                className="bg-red-500 text-white px-6 py-3 rounded-lg"
              >
                Cancel
              </button>

            )}

          </div>

        </form>

      </div>

      {/* TABLE */}

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Body Type
              </th>

              <th className="p-4 text-left">
                Calories
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {plans.map((plan) => (

              <tr
                key={plan.id}
                className="border-b"
              >

                <td className="p-4">
                  {plan.id}
                </td>

                <td className="p-4">
                  {plan.body_type}
                </td>

                <td className="p-4">
                  {plan.calories}
                </td>

                <td className="p-4">

                  <button
                    onClick={() => handleEdit(plan)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default DietPlans;