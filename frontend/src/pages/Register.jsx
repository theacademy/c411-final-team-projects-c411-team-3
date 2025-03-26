import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/user";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  // Function to validate email format
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Function to validate form fields
  const validateForm = () => {
    setUsernameError(!username);
    setEmailError(!email || !isValidEmail(email));
    setPasswordError(!password);
    return username && email && isValidEmail(email) && password;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!validateForm()) {
      setError("Please fill in all fields correctly.");
      return;
    }

    try {
      const user = await registerUser(username, email, password);
      console.log("User registered successfully!");
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/profile-setup");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Create an Account
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={usernameError}
              helperText={usernameError ? "Username is required" : ""}
          />
          <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailError ? "Enter a valid email address" : ""}
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
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={!username || !email || !isValidEmail(email) || !password}>
            Register
          </Button>
        </form>
      </Container>
  );
};

export default Register;
