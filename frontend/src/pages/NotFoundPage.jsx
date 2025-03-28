import React from "react";
import { Container, Typography, Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ textAlign: "center", mt: 8, mb: 6 }}>
      <Typography
        variant="h2"
        sx={{ fontWeight: 400, fontSize: "5rem", color: "text.primary" }}
      >
        SORRY
      </Typography>

      <Typography
        variant="h5"
        sx={{ fontWeight: 300, fontSize: "1.75rem", mt: 1, color: "text.secondary" }}
      >
        we couldn't find that page
      </Typography>

      <Typography
        variant="body1"
        sx={{ mt: 2, fontSize: "1.25rem", color: "text.secondary" }}
      >
        But don’t worry — one of our furry friends is sniffing it out.
      </Typography>

      <Box
        component="img"
        src="/guity-dog.png"
        alt="Sad but cute dog"
        sx={{
          maxWidth: 360,
          width: "100%",
          mt: 4,
          borderRadius: 2,
        }}
      />

      <Typography variant="body1"
        sx={{ mt: 2, fontSize: "1.25rem", color: "text.secondary" }}>
        go back to{" "}
        <Link
          component="button"
          underline="hover"
          color="primary"
          onClick={() => navigate("/pets")}
        >
          homepage
        </Link>
      </Typography>
    </Container>
  );
};

export default NotFoundPage;