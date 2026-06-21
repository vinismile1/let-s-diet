import bcrypt from "bcrypt";
import db from "../config/db.js";
import jwt from "jsonwebtoken";


// REGISTER ADMIN
export const registerAdmin = (req, res) => {

  const { name, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql =
    "INSERT INTO admins(name, email, password) VALUES (?, ?, ?)";

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

 console.log(err);

return res.status(500).json({
  message: err.message
});
}

      res.status(201).json({
        message: "Admin Registered Successfully"
      });

    }
  );
};



// LOGIN ADMIN
export const loginAdmin = (req, res) => {

  console.log("LOGIN REQUEST RECEIVED");

  const { email, password } = req.body;

  console.log(email);

  const sql = "SELECT * FROM admins WHERE email = ?";

  db.query(sql, [email], (err, result) => {

    console.log("QUERY FINISHED");

    if (err) {
      console.log("DB ERROR:", err);

      return res.status(500).json({
        message: "Server Error"
      });
    }

    console.log(result);

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
        email: user.email,
        role: "admin"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      message: "Admin Login Successful",
      token
    });

  });

};