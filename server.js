const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Roommate App Backend is running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
