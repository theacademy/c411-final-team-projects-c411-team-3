import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { updateUserInfo } from "../services/user";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!storedUser) {
      navigate("/"); // Redirect to login if no user data is found
    }
  }, [storedUser, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const userInfo = { firstName, lastName, phoneNumber, birthDate };

    try {
      const updatedInfo = await updateUserInfo(storedUser.id, userInfo);
      console.log("Profile updated:", updatedInfo);

      // Update localStorage with new user info
      localStorage.setItem("user", JSON.stringify({ ...storedUser, userInfo: updatedInfo }));

      // Redirect to home/dashboard
      navigate("/home");
    } catch (err) {
      setError(typeof err === "string" ? err : "Profile update failed");
    }
  };

  return (
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Complete Your Profile
        </Typography>
        {error && <Typography color="error">{String(error)}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
              label="First Name"
              fullWidth
              margin="normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
              label="Phone Number"
              type="tel"
              fullWidth
              margin="normal"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
              label="Birthdate"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save Profile
          </Button>
        </form>
      </Container>
  );
};

export default ProfileSetup;
