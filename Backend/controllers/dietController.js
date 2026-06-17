import db from "../config/db.js";

export const addDietPlan = (req, res) => {
  const {
    body_type,
    calories,
    breakfast,
    lunch,
    dinner,
    workout,
  } = req.body;

  const sql = `
    INSERT INTO diet_plans
    (body_type, calories, breakfast, lunch, dinner, workout)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      body_type,
      calories,
      breakfast,
      lunch,
      dinner,
      workout,
    ],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: err.message,
        });
      }

      res.status(201).json({
        message: "Diet Plan Added Successfully",
      });
    }
  );
};

export const getDietPlans = (req, res) => {

  const sql = "SELECT * FROM diet_plans";

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);

      return res.status(500).json(err);
    }

    res.status(200).json(result);

  });

};

export const updateDietPlan = (req, res) => {

  const { id } = req.params;

  const {
    body_type,
    calories,
    breakfast,
    lunch,
    dinner,
    workout
  } = req.body;

  const sql = `
    UPDATE diet_plans
    SET
    body_type = ?,
    calories = ?,
    breakfast = ?,
    lunch = ?,
    dinner = ?,
    workout = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      body_type,
      calories,
      breakfast,
      lunch,
      dinner,
      workout,
      id
    ],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Diet Plan Updated Successfully"
      });

    }
  );

};

export const deleteDietPlan = (req, res) => {

  const { id } = req.params;

  const sql = "DELETE FROM diet_plans WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Diet Plan Deleted Successfully"
    });

  });

};