const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

const BLOGS_FILE = path.join(__dirname, "blogs.json");

let blogs = [];
if (fs.existsSync(BLOGS_FILE)) {
  blogs = JSON.parse(fs.readFileSync(BLOGS_FILE, "utf8"));
}

const saveBlogsToFile = () => {
  fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2));
};

app.get("/", (req, res) => {
  res.send("Bible Study Backend is running ✅");
});

app.get("/blogs", (req, res) => res.json(blogs));

app.get("/blogs/:id", (req, res) => {
  const blog = blogs.find((b) => b.id === parseInt(req.params.id));
  blog ? res.json(blog) : res.status(404).json({ error: "Not found" });
});

app.post("/blogs", (req, res) => {
  const { title, category, author, image, description, backgroundColor } = req.body;
  if (!title || !category || !author || !image || !description || !backgroundColor) {
    return res.status(400).json({ error: "All fields are required" });
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
  res.status(201).json(newBlog);
});

app.put("/blogs/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const blog = blogs.find((b) => b.id === id);
  if (!blog) return res.status(404).json({ error: "Not found" });

  Object.assign(blog, req.body);
  saveBlogsToFile();
  res.json(blog);
});

app.delete("/blogs/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = blogs.findIndex((b) => b.id === id);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  blogs.splice(index, 1);
  saveBlogsToFile();
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
