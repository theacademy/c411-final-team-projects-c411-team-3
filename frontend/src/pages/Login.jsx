import React, { useState } from "react";
import {Container, TextField, Button, Typography, Link} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login attempt with:", { email, password });
    // Add API call here
  };

  return (
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign In
          </Button>
        </form>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Don't have an account?{" "}
          <Link component="button" onClick={() => navigate("/register")} color="primary">
            Create Account
          </Link>
        </Typography>
      </Container>
  );
};

export default Login;
