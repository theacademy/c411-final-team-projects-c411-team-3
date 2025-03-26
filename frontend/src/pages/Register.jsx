import React, {useState} from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import {useNavigate} from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("User registered:", {username, email, password}); // placeholder
    navigate("/profile-setup");
  };
  return (
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Create an Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField label="Email" type="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </Container>
  );
};

export default Register;