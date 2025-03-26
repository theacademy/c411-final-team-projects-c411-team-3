import React, { useState } from "react";
import {Container, TextField, Button, Typography, Link} from "@mui/material";
import {useNavigate} from "react-router-dom";
import { loginUser } from "../services/user";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const user = await loginUser(username, password);
      console.log("User logged in:", user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/home");
    } catch (err) {
      const errorMessage = typeof err === "string" ? err : err?.error || "Invalid login credentials";
      setError(errorMessage);
    }
  };
  return (
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleLogin}>
          <TextField
              label="Username"
              type="username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
