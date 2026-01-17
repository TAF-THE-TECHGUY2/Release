const express = require("express");
const Blog = require("../models/Blog");
const auth = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");

const router = express.Router();

router.get("/", async (req, res) => {
  const page = Math.max(parseInt(req.query.page || "1", 10), 1);
  const rawLimit = req.query.limit || "12";
  const limit =
    rawLimit === "all" ? 0 : Math.max(parseInt(rawLimit, 10) || 12, 1);
  const search = (req.query.search || "").trim();
  const category = (req.query.category || "").trim();

  const filter = {};
  if (category && category !== "All") {
    filter.category = category;
  }
  if (search) {
    const regex = new RegExp(search, "i");
    filter.$or = [
      { title: regex },
      { description: regex },
      { author: regex },
      { category: regex },
    ];
  }

  const total = await Blog.countDocuments(filter);
  const query = Blog.find(filter).sort({ createdAt: -1 });

  if (limit > 0) {
    query.skip((page - 1) * limit).limit(limit);
  }

  const items = await query;
  res.json({
    items,
    total,
    page,
    limit: limit || total,
    pages: limit ? Math.ceil(total / limit) : 1,
  });
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ error: "Not found" });
  res.json(blog);
});

router.post("/", auth, requireRole("admin", "editor"), async (req, res) => {
  const { title, category, author, image, description, backgroundColor } = req.body;
  if (!title || !category || !author || !description || !backgroundColor) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const created = await Blog.create({
    title,
    category,
    author,
    image: image || "",
    description,
    backgroundColor,
  });

  res.status(201).json(created);
});

router.put("/:id", auth, requireRole("admin", "editor"), async (req, res) => {
  const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

router.delete("/:id", auth, requireRole("admin"), async (req, res) => {
  const deleted = await Blog.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.json({ message: "Deleted" });
});

module.exports = router;
