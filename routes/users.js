const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt= require('bcrypt');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecretkey" ;
// Create user (register)
router.post("/register", async (req, res) => {
const { name, email, password } = req.body;

try {
// hash password
const hashedPassword = await bcrypt.hash(password, 10);

const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

db.query(sql, [name, email, hashedPassword], (err, result) => {
if (err) {
console.error(err);
return res.status(500).json({ error: "Database error" });
}

res.status(201).json({
message: "User created successfully",
userId: result.insertId,
});
});

} catch (error) {
console.error(error);
res.status(500).json({ error: "Server error" });
}
});
// Login user
router.post("/login", (req, res) => {

const { email, password } = req.body;

const sql = "SELECT * FROM users WHERE email = ?";

db.query(sql, [email], (err, results) => {

if (err) {
return res.status(500).json({ error: "Database error" });
}

if (results.length === 0) {
return res.status(401).json({ message: "Invalid credentials" });
}

const user = results[0];

bcrypt.compare(password, user.password, (err, isMatch) => {

if (err) {
return res.status(500).json({ error: "Server error" });
}

if (!isMatch) {
return res.status(401).json({ message: "Invalid credentials" });
}

const token = jwt.sign(
{ id: user.id, email: user.email },
JWT_SECRET,
{ expiresIn: "1hr" }
);

res.json({
message: "Login successful",
token: token
});

});

});

});

module.exports = router;
