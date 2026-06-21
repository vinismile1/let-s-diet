import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import db from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import dietRoutes from "./routes/dietRoutes.js";
import planRoutes from "./routes/planRoutes.js";

import { authMiddleware } from "./middlewares/authMiddleware.js";
import { adminMiddleware } from "./middlewares/adminMiddleware.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "https://let-s-diet.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* ===========================
        MIDDLEWARE
=========================== */

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

app.use(express.json());

/* LOGGER */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

/* ===========================
        BASIC ROUTES
=========================== */

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.get("/user", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to Dashboard",
    user: req.user,
  });
});

/* ===========================
        ADMIN USERS
=========================== */

app.get(
  "/api/admin/users",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    const sql = "SELECT id, name, email FROM users";

    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      res.json(result);
    });
  }
);

app.put(
  "/api/admin/users/:id",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;

    const sql =
      "UPDATE users SET name = ?, email = ? WHERE id = ?";

    db.query(sql, [name, email, userId], (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      res.json({ message: "User updated successfully" });
    });
  }
);

app.delete(
  "/api/admin/users/:id",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    const userId = req.params.id;

    const sql = "DELETE FROM users WHERE id = ?";

    db.query(sql, [userId], (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User deleted successfully" });
    });
  }
);

/* ===========================
        ADMIN STATS
=========================== */

app.get(
  "/api/admin/stats",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    const stats = {};

    db.query(
      "SELECT COUNT(*) AS totalUsers FROM users",
      (err, userResult) => {
        if (err) return res.status(500).json(err);

        stats.totalUsers = userResult[0].totalUsers;

        db.query(
          "SELECT COUNT(*) AS totalAdmins FROM admins",
          (err, adminResult) => {
            if (err) return res.status(500).json(err);

            stats.totalAdmins = adminResult[0].totalAdmins;

            db.query(
              "SELECT COUNT(*) AS totalDietPlans FROM diet_plans",
              (err, dietResult) => {
                if (err) return res.status(500).json(err);

                stats.totalDietPlans =
                  dietResult[0].totalDietPlans;

                res.json(stats);
              }
            );
          }
        );
      }
    );
  }
);

/* ===========================
      LATEST USERS
=========================== */

app.get(
  "/api/admin/latest-users",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    const sql = `
      SELECT id, name, email
      FROM users
      ORDER BY id DESC
      LIMIT 5
    `;

    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      res.json(result);
    });
  }
);

/* ===========================
     MONTHLY USERS
=========================== */

app.get(
  "/api/admin/monthly-users",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
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
        return res.status(500).json({ message: err.message });
      }

      res.json(result);
    });
  }
);

/* ===========================
        ROUTES
=========================== */

app.use("/users", userRoutes);
app.use("/admins", adminRoutes);
app.use("/diet", dietRoutes);
app.use("/plans", planRoutes);

/* ===========================
        404 HANDLER
=========================== */

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ===========================
        ERROR HANDLER
=========================== */

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Internal Server Error" });
});


/* ===========================
        SERVER START
=========================== */

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});