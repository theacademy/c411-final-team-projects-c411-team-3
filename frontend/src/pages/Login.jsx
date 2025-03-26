import React, { useState } from "react";
import { Container, TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/user";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    setUsernameError(!username);
    setPasswordError(!password);
    return username && password;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);

    if (!validateForm()) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const user = await loginUser(username, password);
      console.log("User logged in:", user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/home"); //placeholder
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
              type="text"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={usernameError}
              helperText={usernameError ? "Username is required" : ""}
          />
          <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordError ? "Password is required" : ""}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={!username || !password}>
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
