import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Grid, Typography } from "@mui/material";

export default function EditPetPage() {
    const { id: petId } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const userRole = user?.role || "";

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/pets/${petId}`)
            .then((res) => {
                setPet(res.data);
            })
            .catch((err) => {
                console.error("Error fetching pet:", err);
            });
    }, [petId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPet((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        axios
            .put(`http://localhost:8080/api/pets/${petId}`, pet, {
                headers: {
                    role: userRole,
                },
            })
            .then(() => {
                alert("Update successful");
            })
            .catch((err) => {
                console.error("Update failed:", err.response);
                alert("Update failed: " + err.response?.status || err.message);
            });
    };

    if (!pet) return <p>Loading...</p>;
    if (userRole !== "ADMIN") return <p>You are not authorized.</p>;

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Edit Pet Info</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField label="Pet Name" name="petName" value={pet.petName} onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Species" name="species" value={pet.species} onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Size" name="size" value={pet.size} onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Sex" name="sex" value={pet.sex} onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Age" name="age" value={pet.age} onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Primary Breed" name="primaryBreed" value={pet.primaryBreed} onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Secondary Breed" name="secondaryBreed" value={pet.secondaryBreed} onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="State Code" name="stateCode" value={pet.stateCode} onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="City" name="city" value={pet.city} onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Status" name="status" value={pet.status} onChange={handleChange} fullWidth />
                </Grid>

            </Grid>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" onClick={() => navigate(`/pets/${petId}`)}>
                        Back to Pet Detail
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
