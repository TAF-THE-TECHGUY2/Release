import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../../api/blogService";
import { excerpt } from "../../utils/text";
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
  Pagination,
  TextField,
} from "@mui/material";

const BlogPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 9;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["blogs", selectedCategory, search, page],
    queryFn: () =>
      fetchBlogs({
        page,
        limit,
        search,
        category: selectedCategory,
      }).then((res) => res.data),
  });

  const posts = data?.items || [];
  const totalPages = data?.pages || 1;

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

  const categories = ["All", ...new Set(posts.map((p) => p.category))];

  return (
    <Container sx={{ py: 5, backgroundColor: "#f6f1ea", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        sx={{ mb: 2 }}
      >
        Devotionals on Community
      </Typography>

      <Tabs
        value={selectedCategory}
        onChange={(_, v) => {
          setSelectedCategory(v);
          setPage(1);
        }}
        centered
        textColor="inherit"
        indicatorColor="primary"
        sx={{ mb: 4, borderBottom: "2px solid #ddd" }}
      >
        {categories.map((cat) => (
          <Tab key={cat} label={cat} value={cat} />
        ))}
      </Tabs>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <TextField
          size="small"
          label="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          sx={{ minWidth: 280 }}
        />
      </Box>

      <Grid container spacing={4}>
        {posts.map((post) => (
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
                  {excerpt(post.description, 20)}...
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          page={page}
          count={totalPages}
          onChange={(_e, value) => setPage(value)}
        />
      </Box>
    </Container>
  );
};

export default BlogPage;
