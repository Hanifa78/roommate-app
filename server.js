const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Routes
const usersRoutes = require("./routes/users");
const householdRoutes = require("./routes/households");


// Routes
app.use("/api/users", usersRoutes);
app.use("/api/households", householdRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Roommate App Backend is running 🚀");
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
