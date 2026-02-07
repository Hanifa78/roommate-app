const express = require("express");
const router = express.Router();
const db = require("../db");

// Create a bill
router.post("/create", (req, res) => {
  const { householdId, title, amount, dueDate, createdBy } = req.body;

  const sql = `
    INSERT INTO bills (household_id, title, amount, due_date, created_by)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [householdId, title, amount, dueDate, createdBy],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Bill created",
        billId: result.insertId
      });
    }
  );
});

module.exports = router;

