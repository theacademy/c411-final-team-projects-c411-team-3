import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Pagination,
  Box,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

const DEFAULT_IMAGE = "/default-pet.jpg";
const PAGE_SIZE = 12;

const AllPetsPage = () => {
  const [pets, setPets] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    fetch(`http://localhost:8080/api/pets?page=${page - 1}&size=${PAGE_SIZE}`)
      .then((res) => res.json())
      .then((data) => {
        setPets(data.content || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) => console.error("Error fetching pets:", err));
  }, [page]);

  const handlePageChange = (event, value) => {
    setSearchParams({ page: value });
  };

  return (
    <Container>
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
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
                <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '1.25rem',
                      color:
                        pet.status === 'available'
                          ? 'success.main'
                          : pet.status === 'pending'
                            ? 'warning.main'
                            : pet.status === 'adopted'
                              ? 'text.secondary'
                              : 'text.disabled',
                    }}
                  >
                    {pet.status === 'available'
                      ? 'Adoptable'
                      : pet.status === 'pending'
                        ? 'Pending Adoption'
                        : pet.status === 'adopted'
                          ? 'Adopted'
                          : 'Status Unknown'}
                  </Typography>

                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: 'none', fontWeight: 'bold', boxShadow: 2, fontSize: '1.15rem'}}
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

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{p: 4}}
        />
      </Box>
    </Container>
  );
};

export default AllPetsPage;