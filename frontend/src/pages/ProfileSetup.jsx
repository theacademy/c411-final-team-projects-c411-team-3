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

  // Tracks if the user has focused on an input field and left it
  const [touchedFields, setTouchedFields] = useState({
    firstName: false,
    lastName: false,
    phoneNumber: false,
    birthDate: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (!storedUser) {
      navigate("/"); // Redirect to login if no user data is found
    }
  }, [storedUser, navigate]);

  useEffect(() => {
    // Check form validity whenever an input changes
    setIsFormValid(
        firstName.trim() &&
        lastName.trim() &&
        /^\d+$/.test(phoneNumber) &&
        birthDate.trim()
    );
  }, [firstName, lastName, phoneNumber, birthDate]);

  const handleBlur = (field) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!isFormValid) {
      setError("Please fill in all fields correctly.");
      return;
    }

    const userInfo = { firstName, lastName, phoneNumber, birthDate };

    try {
      const updatedInfo = await updateUserInfo(storedUser.id, userInfo);
      console.log("Profile updated:", updatedInfo);

      localStorage.setItem("user", JSON.stringify({ ...storedUser, userInfo: updatedInfo }));

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
              onBlur={() => handleBlur("firstName")}
              error={touchedFields.firstName && !firstName.trim()}
              helperText={touchedFields.firstName && !firstName.trim() ? "First name is required" : ""}
          />
          <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={() => handleBlur("lastName")}
              error={touchedFields.lastName && !lastName.trim()}
              helperText={touchedFields.lastName && !lastName.trim() ? "Last name is required" : ""}
          />
          <TextField
              label="Phone Number"
              type="tel"
              fullWidth
              margin="normal"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onBlur={() => handleBlur("phoneNumber")}
              error={touchedFields.phoneNumber && !/^\d+$/.test(phoneNumber)}
              helperText={
                touchedFields.phoneNumber && !/^\d+$/.test(phoneNumber)
                    ? "Phone number must contain only digits"
                    : ""
              }
          />
          <TextField
              label="Birthdate"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              onBlur={() => handleBlur("birthDate")}
              error={touchedFields.birthDate && !birthDate.trim()}
              helperText={touchedFields.birthDate && !birthDate.trim() ? "Birthdate is required" : ""}
          />
          <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!isFormValid}
          >
            Save Profile
          </Button>
        </form>
      </Container>
  );
};

export default ProfileSetup;
