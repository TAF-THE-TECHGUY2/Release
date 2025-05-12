// src/components/BlogPost.jsx

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogById } from "../../api/blogService";
import {
  Box,
  Container,
  Typography,
  Avatar,
  CircularProgress,
  Button,
} from "@mui/material";

const BlogPost = () => {
  const { id } = useParams();

  const {
    data: post,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id).then((res) => res.data),
    staleTime: 300_000,
  });

  // Full‐screen loading
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

  // Full‐screen error
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
        <Typography color="error" variant="h6" gutterBottom>
          {error.message}
        </Typography>
        <Button variant="contained" onClick={refetch}>
          Retry
        </Button>
      </Box>
    );
  }

  // Destructure safely
  const {
    title = "",
    category = "",
    description = "",
    image,
    backgroundColor,
    author = "",
    author_avatar,
    date_created,
    createdAt,
    scripture,
  } = post || {};

  // Paragraph splitting
  const paragraphs = description
    .split(" ")
    .reduce((acc, w, i) => {
      const idx = Math.floor(i / 40);
      if (!acc[idx]) acc[idx] = [];
      acc[idx].push(w);
      return acc;
    }, [])
    .map((chunk, idx) => (
      <Typography key={idx} paragraph sx={{ fontSize: "18px", lineHeight: 1.8 }}>
        {chunk.join(" ")}
      </Typography>
    ));

  return (
    <Box sx={{ background: backgroundColor || "#3f593e", color: "white", py: 4 }}>
      <Container>
        <Typography align="center" variant="overline" sx={{ letterSpacing: 1 }}>
          Topic: {category}
        </Typography>
        <Typography align="center" variant="h4" fontWeight="bold" sx={{ my: 1 }}>
          {title}
        </Typography>
        <Typography align="center" variant="body1" sx={{ mb: 3 }}>
          {description.split(" ").slice(0, 20).join(" ")}…
        </Typography>

        {/* CENTERED IMAGE */}
        {image && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 4,
            }}
          >
            <Box
              component="img"
              src={image}
              alt={title}
              sx={{
                maxHeight: "300px",
                borderRadius: "10px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            />
          </Box>
        )}
      </Container>

      <Container
        sx={{
          background: "#fff",
          color: "#222",
          borderRadius: "12px 12px 0 0",
          mt: 4,
          py: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Avatar src={author_avatar || "/assets/avatar.jpg"} />
          <Typography fontWeight="medium">{author}</Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(date_created || createdAt).toLocaleDateString()}
          </Typography>
        </Box>

        {paragraphs.length ? paragraphs : <Typography>No content available.</Typography>}

        {scripture && (
          <Typography fontWeight="bold" mt={3}>
            Scripture Reading: {scripture}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default BlogPost;
