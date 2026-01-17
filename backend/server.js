const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const connectDB = require("./config/db");
const Blog = require("./models/Blog");
const User = require("./models/User");
const blogRoutes = require("./routes/blogs");
const authRoutes = require("./routes/auth");
const uploadRoutes = require("./routes/uploads");

const envPath = path.join(__dirname, ".env");
if (!fs.existsSync(envPath)) {
  console.warn("Warning: .env not found in backend. Copy .env.example to .env.");
}

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);

app.get("/", (_req, res) => {
  res.send("Bible Study Backend is running.");
});

app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);
app.use("/uploads", uploadRoutes);

const ensureAdminUser = async () => {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return;

  const existing = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });
  if (existing) return;

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await User.create({
    email: ADMIN_EMAIL.toLowerCase(),
    passwordHash,
    role: "admin",
  });
};

const start = async () => {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is required");
  }
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is required");
  }

  await connectDB(MONGODB_URI);
  await ensureAdminUser();

  const count = await Blog.countDocuments();
  if (count === 0) {
    console.log("No blogs found in MongoDB.");
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

start().catch((err) => {
  console.error("Failed to start server:", err.message);
  process.exit(1);
});
