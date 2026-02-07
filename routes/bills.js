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

     const billId = result.insertId;

// Get all household members
const membersSql = `
  SELECT user_id
  FROM household_members
  WHERE household_id = ?
`;

db.query(membersSql, [householdId], (err, members) => {
  if (err) return res.status(500).json(err);

  const splitAmount = amount / members.length;

  const shareSql = `
    INSERT INTO bill_shares (bill_id, user_id, amount)
    VALUES ?
  `;

  const values = members.map(m => [
    billId,
    m.user_id,
    splitAmount
  ]);

  db.query(shareSql, [values], (err2) => {
    if (err2) return res.status(500).json(err2);

    res.status(201).json({
      message: "Bill created and split",
      billId
    });
  });
});

    }
  );
});

module.exports = router;

