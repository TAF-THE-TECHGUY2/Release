const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Blog = require("../models/Blog");

dotenv.config();

const sourcePaths = [
  path.join(__dirname, "..", "blogs.json"),
  path.join(__dirname, "..", "blog.json"),
];

const readSource = () => {
  for (const filePath of sourcePaths) {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      return JSON.parse(raw);
    }
  }
  throw new Error("No blog.json or blogs.json found in backend folder.");
};

const normalizeBlog = (entry) => {
  const createdAt =
    entry.createdAt || entry.date_created || entry.dateCreated || new Date();
  return {
    title: entry.title || "Untitled",
    category: entry.category || "Uncategorized",
    author: entry.author || "Unknown",
    image: entry.image || "",
    description: entry.description || "",
    backgroundColor: entry.backgroundColor || "#3f593e",
    createdAt,
    updatedAt: createdAt,
  };
};

const run = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required");
  }

  await connectDB(process.env.MONGODB_URI);
  const source = readSource();
  const items = Array.isArray(source) ? source : source.items || [];
  if (!items.length) {
    console.log("No blog records found to import.");
    return;
  }

  const docs = items.map(normalizeBlog);
  await Blog.deleteMany({});
  await Blog.insertMany(docs);
  console.log(`Imported ${docs.length} blogs.`);
};

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Import failed:", err.message);
    process.exit(1);
  });
