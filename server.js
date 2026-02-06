const express = require("express");
const app = express();
const usersRoutes = require("./routes/users");
const householdRoutes = require("./routes/households");

app.use("/api/households", householdRoutes);

app.use(express.json());
app.use("/api/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("Roommate App Backend is running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
