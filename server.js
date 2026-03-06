const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "super_secret_key_change_this" ;
const app = express();

app.use(express.json());



// serve fronyend from express
app.use(express.static(path.join(__dirname, "client")));

// Routes
const usersRoutes = require("./routes/users");
const householdsRoutes = require("./routes/households");
const billsRoutes = require("./routes/bills");
const choresRoutes = require("./routes/chores");


// Routes
app.use("/api/users", usersRoutes);
app.use("/api/households", householdsRoutes);
app.use("/api/bills", billsRoutes);
app.use("/api/chores", choresRoutes); 

// Test route
app.get("/", (req, res) => {
  res.send("Roommate App Backend is running 🚀");
});

// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
