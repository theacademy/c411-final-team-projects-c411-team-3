import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";

const DEFAULT_IMAGE = "/default-pet.jpg";

const SpeciesPetsPage = () => {
  const { species } = useParams();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/pets/species/${species}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch pets");
        return res.json();
      })
      .then((data) => {
        setPets(data);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [species]);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          Failed to load pets for species: {species}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography
        variant="h4"
        align="center"
        sx={{ mt: 3, mb: 4, fontWeight: "bold" }}
      >
        Adopt a {species.charAt(0).toUpperCase() + species.slice(1)}
      </Typography>

      <Grid container spacing={3} sx={{ marginTop: 1 }}>
        {pets.map((pet) => (
          <Grid item key={pet.petId} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardActionArea onClick={() => navigate(`/pets/${pet.petId}`)}>
                <CardMedia
                  component="img"
                  height="250"
                  width="250"
                  image={pet.photoUrl || DEFAULT_IMAGE}
                  sx={{ objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_IMAGE;
                  }}
                />
                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "1.25rem",
                      color:
                        pet.status === "available"
                          ? "success.main"
                          : pet.status === "pending"
                            ? "warning.main"
                            : pet.status === "adopted"
                              ? "text.secondary"
                              : "text.disabled",
                    }}
                  >
                    {pet.status === "available"
                      ? "Adoptable"
                      : pet.status === "pending"
                        ? "Pending Adoption"
                        : pet.status === "adopted"
                          ? "Adopted"
                          : "Status Unknown"}
                  </Typography>

                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                      boxShadow: 2,
                      fontSize: "1.15rem",
                    }}
                    onClick={() => navigate(`/pets/${pet.petId}`)}
                  >
                    Learn More
                  </Button>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SpeciesPetsPage;