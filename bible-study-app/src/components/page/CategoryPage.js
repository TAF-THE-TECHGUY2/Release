// src/components/BlogPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../../api/blogService";
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
  CircularProgress,
  Button,
} from "@mui/material";

const BlogPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const {
    data: posts = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => fetchBlogs().then((res) => res.data),
  });

  // Full-viewport loading state
  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Error state with retry
  if (isError) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography color="error" gutterBottom>
          {error.message || "Failed to load posts."}
        </Typography>
        <Button variant="contained" onClick={() => refetch()}>
          Retry
        </Button>
      </Box>
    );
  }

  // Categories and filtering
  const categories = ["All", ...new Set(posts.map((p) => p.category))];
  const filtered =
    selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  return (
    <Container sx={{ py: 5, backgroundColor: "#f6f1ea", minHeight: "100vh" }}>
      {/* Page Title */}
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        sx={{ mb: 2 }}
      >
        Devotionals on Community
      </Typography>

      {/* Category Tabs */}
      <Tabs
        value={selectedCategory}
        onChange={(_, v) => setSelectedCategory(v)}
        centered
        textColor="inherit"
        indicatorColor="primary"
        sx={{ mb: 4, borderBottom: "2px solid #ddd" }}
      >
        {categories.map((cat) => (
          <Tab key={cat} label={cat} value={cat} />
        ))}
      </Tabs>

      {/* Blog Cards */}
      <Grid container spacing={4}>
        {filtered.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card
              onClick={() => navigate(`/post/${post.id}`)}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "0.3s",
                backgroundColor: "#fff",
                ":hover": { transform: "scale(1.02)", boxShadow: 6 },
              }}
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
