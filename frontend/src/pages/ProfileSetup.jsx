import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Profile details submitted:", { firstName, lastName, phoneNumber, birthDate });
    //navigate("/pets");
  };

  return (
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Complete Your Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="First Name" fullWidth margin="normal" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <TextField label="Last Name" fullWidth margin="normal" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <TextField label="Phone Number" fullWidth margin="normal" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <TextField label="Birthdate" type="date" fullWidth margin="normal" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save Profile
          </Button>
        </form>
      </Container>
  );
};

export default ProfileSetup;
