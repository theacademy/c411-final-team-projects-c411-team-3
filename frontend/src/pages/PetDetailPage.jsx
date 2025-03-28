import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
  Container,
  Card,
  Box,
  Typography,
  Button,
  CircularProgress,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const PetDetailPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [adoptionMessage, setAdoptionMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "ADMIN";
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`http://localhost:8080/api/pets/${id}`)
    .then((response) => {
      if (!response.ok) throw new Error("Pet not found");
      return response.json();
    })
    .then((data) => {
      setPet(data);
      setError(false);
    })
    .catch(() => setError(true))
    .finally(() => setLoading(false));
  }, [id]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = () => {
    console.log("Submit clicked with adoption date:", adoptionMessage);
    setOpenModal(false);
    navigate("/pets");
  };

  if (loading) {
    return (
        <Container sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress />
        </Container>
    );
  }

  if (error || !pet) {
    return (
        <Container sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h6" color="error">
            Sorry, pet not found or there was an error fetching data.
          </Typography>
        </Container>
    );
  }

  return (
      <Container sx={{ mt: 4 }}>
        <Card sx={{ display: "flex", height: 350, maxWidth: 800, mx: "auto" }}>
          <CardMedia
              component="img"
              image={pet.photoUrl || "/default-pet.jpg"}
              alt={pet.petName}
              sx={{ width: 350, objectFit: "cover" }}
          />

          <Box
              sx={{
                width: 400,
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "2.5rem", mb: 1 }}>
                {pet.petName || "Unknown Pet"}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "1.25rem" }}>
                <strong>Breed:</strong> {pet.primaryBreed}
                {pet.secondaryBreed && ` / ${pet.secondaryBreed}`}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "1.25rem" }}>
                <strong>Age:</strong> {pet.age}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "1.25rem" }}>
                <strong>Sex:</strong> {pet.sex === "m" ? "Male" : "Female"}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "1.25rem" }}>
                <strong>Location:</strong> {pet.city}, {pet.stateCode}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "1.25rem" }}>
                <strong>Status:</strong>{" "}
                {pet.status === "available"
                    ? "Adoptable"
                    : pet.status === "pending"
                        ? "Pending"
                        : pet.status === "adopted"
                            ? "Adopted"
                            : "Unknown"}
              </Typography>
            </Box>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Button
                  variant="contained"
                  sx={{ px: 4, fontWeight: "bold", fontSize: "1rem", textTransform: "none" }}
                  onClick={handleOpenModal}
              >
                Adopt Me Now!
              </Button>
              {isAdmin && (
                  <Button
                      variant="contained"
                      sx={{ px: 4, fontWeight: "bold", fontSize: "1rem", textTransform: "none", ml: 2 }}
                      onClick={() => navigate(`/edit-pet/${pet.petId}`)}
                  >
                    Edit
                  </Button>
              )}
            </Box>
          </Box>
        </Card>

        {/* Modal */}
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Please tell us when you want to adopt this pet</DialogTitle>
          <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="adoption-message"
                label="Your message"
                type="text"
                fullWidth
                variant="standard"
                multiline
                rows={4}
                value={adoptionMessage}
                onChange={(e) => setAdoptionMessage(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </Container>
  );
};

export default PetDetailPage;