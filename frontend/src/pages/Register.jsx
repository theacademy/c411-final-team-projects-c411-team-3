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

  // Functions to validate input format
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidUsername = (username) => /^[a-zA-Z0-9_]{3,20}$/.test(username);
  const isValidPassword = (password) => /^(?=.*\d).{6,}$/.test(password);

  // Function to validate form fields
  const validateForm = () => {
    const usernameValid = isValidUsername(username);
    const emailValid = isValidEmail(email);
    const passwordValid = isValidPassword(password);

    setUsernameError(!usernameValid);
    setEmailError(!emailValid);
    setPasswordError(!passwordValid);
    return usernameValid && emailValid && passwordValid;
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
      window.dispatchEvent(new Event("userChanged"));
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
              helperText={
                !username
                    ? "Enter a username (3-20 characters)"
                    : !isValidUsername(username)
                        ? "Only letters, numbers, underscores allowed"
                        : ""
              }
          />
          <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={!email
                  ? "Enter your email (e.g., name@example.com)"
                  : !isValidEmail(email)
                      ? "Invalid email format"
                      : ""
              }
          />
          <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={!password
                  ? "At least 6 characters and 1 digit"
                  : !isValidPassword(password)
                      ? "Invalid password format"
                      : ""
              }
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={
              !isValidUsername(username) ||
              !isValidEmail(email) ||
              !isValidPassword(password)
          }>
            Register
          </Button>
        </form>
      </Container>
  );
};

export default Register;

