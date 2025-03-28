import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Divider,
  Box,
} from "@mui/material";

export default function EditPetPage() {
  const { id: petId } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role || "";

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/pets/${petId}`)
      .then((res) => setPet(res.data))
      .catch((err) => console.error("Error fetching pet:", err));
  }, [petId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/pets/${petId}`, pet, {
        headers: { role: userRole },
      })
      .then(() => {
        alert("Update successful");
        navigate(`/pets/${petId}`);
      })
      .catch((err) => {
        console.error("Update failed:", err.response);
        alert("Update failed: " + (err.response?.status || err.message));
      });
  };

  if (!pet) return <Typography align="center">Loading...</Typography>;
  if (userRole !== "ADMIN") return <Typography align="center">You are not authorized.</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Edit Pet Information
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Pet Name"
                name="petName"
                value={pet.petName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Species"
                name="species"
                value={pet.species}
                fullWidth
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Size"
                name="size"
                value={pet.size}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                label="Sex"
                name="sex"
                value={pet.sex}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="m">Male</MenuItem>
                <MenuItem value="f">Female</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Age"
                name="age"
                value={pet.age}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Primary Breed"
                name="primaryBreed"
                value={pet.primaryBreed}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Secondary Breed"
                name="secondaryBreed"
                value={pet.secondaryBreed}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="State"
                name="stateCode"
                value={pet.stateCode}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="City"
                name="city"
                value={pet.city}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                label="Status"
                name="status"
                value={pet.status}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="adopted">Adopted</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          {/* Centered Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mt: 4,
              flexWrap: "wrap",
            }}
          >
            <Button variant="outlined" onClick={() => navigate(`/pets/${petId}`)}>
              Back to Pet Detail
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}