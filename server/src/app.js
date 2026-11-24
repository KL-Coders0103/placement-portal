const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const { protect, authorize } = require("./middlewares/authMiddleware");
const studentRoutes = require("./routes/studentRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.send("Placement Portal API running 🚀");
});

app.get("/api/test/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

app.get("/api/test/admin", protect, authorize("admin"), (req, res) => {
  res.json({
    message: "Admin route accessed"
  });
});

module.exports = app;
