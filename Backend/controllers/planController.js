import db from "../config/db.js";

/* =========================
   CREATE PLAN
========================= */
export const createPlan = (req, res) => {

  const userId = req.user.id;

  const {
    currentWeight,
    targetWeight,
    height,
    goal,
    activityLevel,
  } = req.body;

  const dietPlan = {
    breakfast: "Oats + Banana + Eggs",
    lunch: "Rice + Chicken / Paneer",
    dinner: "Salad + Protein Shake",
  };

  const workoutPlan = {
    monday: "Chest + Triceps",
    tuesday: "Back + Biceps",
    wednesday: "Cardio",
    thursday: "Legs",
    friday: "Shoulders",
  };

  const sql = `
    INSERT INTO plans
    (
      user_id,
      current_weight,
      target_weight,
      height,
      goal,
      activity_level,
      diet_plan,
      workout_plan
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      userId,
      currentWeight,
      targetWeight,
      height,
      goal,
      activityLevel,
      JSON.stringify(dietPlan),
      JSON.stringify(workoutPlan),
    ],
    (err, result) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          message: err.message,
        });
      }

      res.status(201).json({
        message: "Plan created successfully",
        planId: result.insertId,
      });

    }
  );
};


/* =========================
   GET USER PLANS
========================= */
export const getPlans = (req, res) => {

  const userId = req.user.id;

  const sql = `
    SELECT *
    FROM plans
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [userId], (err, result) => {

    if (err) {
      console.log(err);

      return res.status(500).json({
        message: err.message,
      });
    }

    const plans = result.map((plan) => ({
      ...plan,

      diet_plan:
        typeof plan.diet_plan === "string"
          ? JSON.parse(plan.diet_plan)
          : plan.diet_plan,

      workout_plan:
        typeof plan.workout_plan === "string"
          ? JSON.parse(plan.workout_plan)
          : plan.workout_plan,
    }));

    res.status(200).json(plans);

  });

};


/* =========================
   GET ALL PLANS (ADMIN)
========================= */
export const getAllPlans = (req, res) => {

  const sql = `
    SELECT
      plans.*,
      users.name,
      users.email
    FROM plans
    JOIN users
    ON plans.user_id = users.id
    ORDER BY plans.created_at DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {

      console.log(err);

      return res.status(500).json({
        message: err.message,
      });

    }

    const plans = result.map((plan) => ({
      ...plan,

      diet_plan:
        typeof plan.diet_plan === "string"
          ? JSON.parse(plan.diet_plan)
          : plan.diet_plan,

      workout_plan:
        typeof plan.workout_plan === "string"
          ? JSON.parse(plan.workout_plan)
          : plan.workout_plan,
    }));


    res.status(200).json(plans);

  });

};