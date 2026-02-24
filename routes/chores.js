const express = require("express");
const router = express.Router();
const db = require("../db");

// Create a chore
router.post("/create", (req, res) => {
  const { householdId, name } = req.body;

  const sql = `
    INSERT INTO chores (household_id, name)
    VALUES (?, ?)
  `;

  db.query(sql, [householdId, name], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: "Chore created",
      choreId: result.insertId
    });
  });
  // Assign chore (rotates between members)
router.post("/assign", (req, res) => {
  const { choreId, householdId } = req.body;

  const membersSql = `
    SELECT user_id
    FROM household_members
    WHERE household_id = ?
    ORDER BY joined_at
  `;

  db.query(membersSql, [householdId], (err, members) => {
    if (err) return res.status(500).json(err);

    const nextUser = members[0].user_id;

    const assignSql = `
      INSERT INTO chore_assignments (chore_id, user_id)
      VALUES (?, ?)
    `;

    db.query(assignSql, [choreId, nextUser], (err2) => {
      if (err2) return res.status(500).json(err2);

      res.json({
        message: "Chore assigned",
        userId: nextUser
      });
    });
  });
});
// Complete chore and rotate
router.post("/complete", (req, res) => {
  const { assignmentId, choreId, householdId } = req.body;

  const completeSql = `
    UPDATE chore_assignments
    SET completed = 1
    WHERE id = ?
  `;

  db.query(completeSql, [assignmentId], (err) => {
    if (err) return res.status(500).json(err);

    const nextSql = `
      SELECT user_id
      FROM household_members
      WHERE household_id = ?
      AND user_id NOT IN (
        SELECT user_id
        FROM chore_assignments
        WHERE chore_id = ?
        ORDER BY assigned_at DESC
        LIMIT 1
      )
      LIMIT 1
    `;

    db.query(nextSql, [householdId, choreId], (err2, result) => {
      if (err2 || result.length === 0) {
        return res.json({ message: "Chore completed" });
      }

      const nextUser = result[0].user_id;

      db.query(
        "INSERT INTO chore_assignments (chore_id, user_id) VALUES (?, ?)",
        [choreId, nextUser]
      );

      res.json({ message: "Chore rotated" });
    });
  });
});

});

module.exports = router ;
