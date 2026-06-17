import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { adminRoutes } from "./routes/adminRoutes.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import dietRoutes from "./routes/dietRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.get(
  "/dashboard",
  authMiddleware,
  (req, res) => {
    res.json({
      message: "Welcome to Dashboard",
      user: req.user
    });
  }
);

app.get("/api/admin/users", (req, res) => {
  const sql = "SELECT id, name, email FROM users";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: err });

    res.status(200).json(result);
  });
});

app.delete("/api/admin/users/:id", (req, res) => {
  const userId = req.params.id;

  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json({ message: err.message });
    }

    console.log("Affected rows:", result.affectedRows);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found or already deleted"
      });
    }

    res.status(200).json({
      message: "User deleted successfully"
    });
  });
});

app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

app.put("/api/admin/users/:id", (req, res) => {
  console.log("UPDATE ROUTE HIT");
  console.log("ID:", req.params.id);
  console.log("BODY:", req.body);

  const userId = req.params.id;
  const { name, email } = req.body;

  const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";

  db.query(sql, [name, email, userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }

    res.json({ message: "User updated successfully" });
  });
});

app.get("/api/admin/stats", (req, res) => {
  const stats = {};

  db.query(
    "SELECT COUNT(*) AS totalUsers FROM users",
    (err, userResult) => {
      if (err) {
        return res.status(500).json(err);
      }

      stats.totalUsers = userResult[0].totalUsers;

      db.query(
        "SELECT COUNT(*) AS totalAdmins FROM admins",
        (err, adminResult) => {
          if (err) {
            return res.status(500).json(err);
          }

          stats.totalAdmins = adminResult[0].totalAdmins;

          db.query(
            "SELECT COUNT(*) AS totalDietPlans FROM diet_plan",
            (err, dietResult) => {
              if (err) {
                return res.status(500).json(err);
              }

              stats.totalDietPlans = dietResult[0].totalDietPlans;

              res.json(stats);
            }
          );
        }
      );
    }
  );
});

app.get("/api/admin/latest-users", (req, res) => {

  const sql = `
    SELECT id, name, email
    FROM users
    ORDER BY id DESC
    LIMIT 5
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }

    res.status(200).json(result);

  });

});

app.get("/api/admin/monthly-users", (req, res) => {

  const sql = `
    SELECT
      MONTHNAME(created_at) AS month,
      COUNT(*) AS users
    FROM users
    GROUP BY MONTH(created_at)
    ORDER BY MONTH(created_at)
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);

      return res.status(500).json({
        message: err.message
      });
    }

    res.status(200).json(result);

  });

});

app.use("/users", userRoutes);
app.use("/admins", adminRoutes);
app.use("/diet", dietRoutes);
app.use("/plans", planRoutes);
app.listen(process.env.PORT, () => {
  console.log("SERVER FILE ACTIVE");
  console.log(`Server running on port ${process.env.PORT}`);
});