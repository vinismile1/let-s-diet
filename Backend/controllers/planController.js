import db from "../config/db.js";

// SAVE TARGET + GENERATE PLAN
export const createPlan = (req, res) => {
  const userId = req.user.id;

  const {
    currentWeight,
    targetWeight,
    height,
    goal,
    activityLevel,
  } = req.body;

  // 🔥 SIMPLE AI LOGIC (we'll upgrade later)
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
  };

  const sql = `
    INSERT INTO plans 
    (user_id, current_weight, target_weight, height, goal, activity_level, diet_plan, workout_plan)
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
        return res.status(500).json(err);
      }

      res.json({
        message: "Plan created successfully",
        planId: result.insertId,
      });
    }
  );
};

// GET USER PLANS
export const getPlans = (req, res) => {
  const userId = req.user.id;

  const sql = "SELECT * FROM plans WHERE user_id = ? ORDER BY created_at DESC";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};