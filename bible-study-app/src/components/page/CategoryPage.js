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
  Typography,
  Box,
} from "@mui/material";

const BlogPage = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const stored = localStorage.getItem("blogs");
    if (stored) {
      const parsed = JSON.parse(stored);
      setBlogPosts(parsed);
      const unique = ["All", ...new Set(parsed.map((b) => b.category))];
      setCategories(unique);
    }
  }, []);

  const filtered = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter((b) => b.category === selectedCategory);

  return (
    <Container sx={{ py: 5, backgroundColor: "#f6f1ea", minHeight: "100vh" }}>
      {/* Page Title */}
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        sx={{ fontFamily: "'Merriweather', serif", mb: 2 }}
      >
        devotionals on community
      </Typography>

      {/* Beautiful Tabs Navigation */}
      <Tabs
        value={selectedCategory}
        onChange={(e, val) => setSelectedCategory(val)}
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

      {/* Blog Cards Grid */}
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
              <CardMedia
                component="img"
                height="200"
                image={post.image}
                alt={post.title}
              />
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  {new Date(post.date_created).toLocaleDateString()}
                </Typography>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.description.split(" ").slice(0, 20).join(" ")}...
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
