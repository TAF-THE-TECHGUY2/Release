const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// File path for storing blogs
const BLOGS_FILE = path.join(__dirname, "blogs.json");

// Load blogs from file at startup
let blogs = [];
if (fs.existsSync(BLOGS_FILE)) {
  const data = fs.readFileSync(BLOGS_FILE, "utf8");
  blogs = JSON.parse(data);
}

// Utility function to save blogs to file
function saveBlogsToFile() {
  fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2));
}

// 📌 Route to Create a Blog
app.post("/blogs", (req, res) => {
  const { title, category, author, image, description, backgroundColor } = req.body;

  if (!title || !category || !author || !image || !description || !backgroundColor) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const newBlog = {
    id: Date.now(),
    title,
    category,
    author,
    image,
    description,
    backgroundColor,
    createdAt: new Date().toISOString(),
  };

  blogs.push(newBlog);
  saveBlogsToFile();
  res.status(201).json({ message: "Blog created successfully!", blog: newBlog });
});

// 📌 Route to Fetch All Blogs
app.get("/blogs", (req, res) => {
  res.json(blogs);
});

// 📌 Route to Fetch a Single Blog by ID
app.get("/blogs/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  const blog = blogs.find((b) => b.id === blogId);

  if (!blog) {
    return res.status(404).json({ error: "Blog not found!" });
  }

  res.json(blog);
});

// 📌 Route to Delete a Blog
app.delete("/blogs/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  const blogIndex = blogs.findIndex((b) => b.id === blogId);

  if (blogIndex === -1) {
    return res.status(404).json({ error: "Blog not found!" });
  }

  blogs.splice(blogIndex, 1);
  saveBlogsToFile();
  res.json({ message: "Blog deleted successfully!" });
});

// 📌 Route to Update a Blog
app.put("/blogs/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  const { title, category, author, image, description, backgroundColor } = req.body;
  const blog = blogs.find((b) => b.id === blogId);

  if (!blog) {
    return res.status(404).json({ error: "Blog not found!" });
  }

  blog.title = title || blog.title;
  blog.category = category || blog.category;
  blog.author = author || blog.author;
  blog.image = image || blog.image;
  blog.description = description || blog.description;
  blog.backgroundColor = backgroundColor || blog.backgroundColor;

  saveBlogsToFile();
  res.json({ message: "Blog updated successfully!", blog });
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Bible Study Backend is running ✅");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
