const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());


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
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
