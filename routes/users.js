const express = require("express");
const router = express.Router();
const db = require("../db");

// Create user (register)
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(201).json({
      message: "User created successfully",
      userId: result.insertId,
    });
  });
});
// Login user
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = `
    SELECT u.id, u.name, u.email, hm.household_id
    FROM users u
    LEFT JOIN household_members hm ON u.id = hm.user_id
    WHERE u.email = ? AND u.password = ?
  `;

  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: results[0]
    });
  });
});

module.exports = router;
