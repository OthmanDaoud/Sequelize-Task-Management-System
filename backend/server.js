// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { initDatabase } = require("./config/database");
const User = require("./models/User");
const Task = require("./models/Task");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Set up associations
User.hasMany(Task);
Task.belongsTo(User);

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
