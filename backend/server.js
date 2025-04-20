const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json({ limit: "50mb" })); // Increase JSON payload limit
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// Dummy Database (Replace with actual DB in production)
let blogs = [];

// 📌 Route to Create a Blog
app.post("/blogs", (req, res) => {
  const { title, category, author, image, description } = req.body;
  
  if (!title || !category || !author || !image || !description) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const newBlog = {
    id: blogs.length + 1,
    title,
    category,
    author,
    image,
    description,
    createdAt: new Date().toISOString(),
  };

  blogs.push(newBlog);
  res.status(201).json({ message: "Blog created successfully!", blog: newBlog });
});

// 📌 Route to Fetch All Blogs
app.get("/blogs", (req, res) => {
  res.json(blogs);
});

// 📌 Route to Fetch a Single Blog by ID
app.get("/blogs/:id", (req, res) => {
  const blogId = parseInt(req.params.id); // Convert ID from string to number
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
  res.json({ message: "Blog deleted successfully!" });
});

// 📌 Route to Update a Blog
app.put("/blogs/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  const { title, category, author, image, description } = req.body;
  const blog = blogs.find((b) => b.id === blogId);

  if (!blog) {
    return res.status(404).json({ error: "Blog not found!" });
  }

  blog.title = title || blog.title;
  blog.category = category || blog.category;
  blog.author = author || blog.author;
  blog.image = image || blog. image;
  blog.description = description || blog.description;

  res.json({ message: "Blog updated successfully!", blog });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
