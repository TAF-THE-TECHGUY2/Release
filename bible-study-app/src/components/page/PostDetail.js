import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Avatar,
} from "@mui/material";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("blogs"));
    const selected = stored?.find((b) => b.id.toString() === id.toString());
    setPost(selected);
  }, [id]);

  if (!post) return <Typography>Loading...</Typography>;

  const paragraphs = post.description
    .split(" ")
    .reduce((acc, word, i) => {
      const idx = Math.floor(i / 40);
      if (!acc[idx]) acc[idx] = [];
      acc[idx].push(word);
      return acc;
    }, [])
    .map((chunk, idx) => (
      <Typography
        key={idx}
        paragraph
        sx={{ fontSize: "18px", lineHeight: 1.8 }}
      >
        {chunk.join(" ")}
      </Typography>
    ));

  return (
    <Box sx={{ background: post.backgroundColor || "#3f593e", color: "white", py: 4 }}>
      <Container>
        <Typography align="center" variant="overline" sx={{ letterSpacing: 1 }}>
          Topic: {post.category}
        </Typography>
        <Typography
          align="center"
          variant="h4"
          fontWeight="bold"
          sx={{ my: 1 }}
        >
          {post.title}
        </Typography>
        <Typography align="center" variant="body1" sx={{ mb: 3 }}>
          {post.description.split(" ").slice(0, 20).join(" ")}...
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <img
            src={post.image}
            alt={post.title}
            style={{
              maxHeight: "300px",
              borderRadius: "10px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          />
        </Box>
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
          <Avatar src={post.author_avatar || "/assets/avatar.jpg"} />
          <Typography fontWeight="medium">
            {post.author || "Anonymous"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(post.date_created).toLocaleDateString()}
          </Typography>
        </Box>

        {paragraphs}

        {post.scripture && (
          <Typography fontWeight="bold" mt={3}>
            Scripture Reading: {post.scripture}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default BlogPost;
