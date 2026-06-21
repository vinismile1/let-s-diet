import bcrypt from "bcrypt";
import db from "../config/db.js";
import jwt from "jsonwebtoken";

console.log("USER CONTROLLER LOADED");

// REGISTER USER
export const registerUser = (req, res) => {

  const { name, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql =
    "INSERT INTO users(name, email, password) VALUES (?, ?, ?)";

  db.query(
    sql,
    [name, email, hashedPassword],
    (err, result) => {

      if (err) {

        console.log(err);

        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({
            message: "Email already exists"
          });
        }

        return res.status(500).json({
          message: err.message
        });
      }

      res.status(201).json({
        message: "User Registered Successfully"
      });

    }
  );
};


// LOGIN USER
console.log("USER CONTROLLER LOADED");
export const loginUser = (req, res) => {

  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, result) => {

    if (err) {
      return res.status(500).json({
        message: "Server Error"
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const user = result[0];

    const isMatch = bcrypt.compareSync(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    console.log("TOKEN =", token);

    res.status(200).json({
      message: "Login Successful",
      token
    });

  });

};



export const getProfile = (req, res) => {

  const userId = req.user.id;

  const sql = `
    SELECT
      users.name,
      users.email,
      plans.height,
      plans.current_weight,
      plans.goal
    FROM users
    LEFT JOIN plans
    ON users.id = plans.user_id
    WHERE users.id = ?
    ORDER BY plans.created_at DESC
    LIMIT 1
  `;

  db.query(sql, [userId], (err, result) => {

    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    res.json(result[0]);

  });
};

export const getCurrentUser = (req, res) => {

  const userId = req.user.id;

  const sql = `
    SELECT id, name, email
    FROM users
    WHERE id = ?
  `;

  db.query(sql, [userId], (err, result) => {

    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(result[0]);

  });

};