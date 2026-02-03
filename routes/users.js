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

module.exports = router;
