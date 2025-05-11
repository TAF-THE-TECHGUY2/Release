// src/components/BlogPage.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Container, 
  Tabs, 
  Tab, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography 
} from "@mui/material";
import { fetchBlogs } from "../../api/blogService"; // Adjust the import path as necessary

const BlogPage = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlogs()
      .then((res) => {
        const posts = res.data;
        setBlogPosts(posts);
        // Build category list: All + unique categories
        const uniqueCats = ["All", ...new Set(posts.map((b) => b.category))];
        setCategories(uniqueCats);
      })
      .catch((err) => {
        console.error("Failed to fetch blogs:", err);
        setError("Unable to load posts. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Typography align="center">Loading posts…</Typography>;
  }
  if (error) {
    return <Typography color="error" align="center">{error}</Typography>;
  }

  const filtered =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((b) => b.category === selectedCategory);

  return (
    <Container
      sx={{
        py: 5,
        backgroundColor: "#f6f1ea",
        minHeight: "100vh",
      }}
    >
      {/* Page Title */}
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        sx={{ fontFamily: "'Merriweather', serif", mb: 2 }}
      >
        Devotionals on Community
      </Typography>

      {/* Tabs for Categories */}
      <Tabs
        value={selectedCategory}
        onChange={(_, val) => setSelectedCategory(val)}
        centered
        textColor="inherit"
        indicatorColor="primary"
        sx={{
          mb: 4,
          borderBottom: "2px solid #ddd",
          ".MuiTab-root": {
            textTransform: "none",
            fontWeight: 500,
            fontSize: "1rem",
            color: "#444",
            minWidth: 100,
          },
          ".Mui-selected": {
            color: "#000",
            fontWeight: "bold",
            borderBottom: "3px solid #c62828",
          },
          ".MuiTabs-indicator": {
            backgroundColor: "transparent",
          },
        }}
      >
        {categories.map((cat) => (
          <Tab key={cat} label={cat} value={cat} disableRipple />
        ))}
      </Tabs>

      {/* Blog Cards */}
      <Grid container spacing={4}>
        {filtered.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "0.3s",
                backgroundColor: "#fff",
                ":hover": {
                  transform: "scale(1.02)",
                  boxShadow: 6,
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/post/${post.id}`)}
            >
              {post.image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt={post.title}
                />
              )}
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  {new Date(post.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.description.split(" ").slice(0, 20).join(" ")}…
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BlogPage;
