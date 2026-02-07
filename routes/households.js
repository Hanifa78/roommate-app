const express = require("express");
const router = express.Router();
const db = require("../db");

// Create a household
router.post("/create", (req, res) => {
  const { name, userId } = req.body;

  const sql = "INSERT INTO households (name) VALUES (?)";
  db.query(sql, [name], (err, result) => {
    if (err) return res.status(500).json(err);

    const householdId = result.insertId;

    // Add creator as member
    const memberSql =
      "INSERT INTO household_members (household_id, user_id, role) VALUES (?, ?, 'admin')";
    db.query(memberSql, [householdId, userId], (err2) => {
      if (err2) return res.status(500).json(err2);

      res.status(201).json({
        message: "Household created",
        householdId,
      });
    });
  });
});

module.exports = router;

// Join a household
router.post("/join", (req, res) => {
  const { householdId, userId } = req.body;

  const sql = `
    INSERT INTO household_members (household_id, user_id, role)
    VALUES (?, ?, 'member')
  `;

  db.query(sql, [householdId, userId], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Joined household successfully" });
  });
});
