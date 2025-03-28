import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
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
  Pagination,
} from "@mui/material";

const DEFAULT_IMAGE = "/default-pet.jpg";
const PAGE_SIZE = 12;

const SpeciesPetsPage = () => {
  const { species } = useParams();
  const [pets, setPets] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/api/pets/species/${species}?page=${page - 1}&size=${PAGE_SIZE}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch pets");
        return res.json();
      })
      .then((data) => {
        setPets(data.content || []);
        setTotalPages(data.totalPages || 1);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [species, page]);

  const handlePageChange = (event, value) => {
    setSearchParams({ page: value });
  };

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
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents triggering CardActionArea
                      navigate(`/pets/${pet.petId}`);
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{ p: 4 }}
        />
      </Box>
    </Container>
  );
};

export default SpeciesPetsPage;