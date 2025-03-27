import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const speciesList = ["cat", "dog", "rabbit", "bird", "reptile", "small_animal"];

const NavBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSpeciesClick = (species) => {
    navigate(`/pets/species/${species}`);
    handleMenuClose();
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography
          variant="h6"
          onClick={() => navigate("/")}
          sx={{ flexGrow: 1, cursor: "pointer" }}
        >
          Pet Adoption
        </Typography>

        <Box>
          <Button
            color="inherit"
            onClick={handleMenuOpen}
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            Pets
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => navigate("/pets")}>All Pets</MenuItem>
            {speciesList.map((species) => (
              <MenuItem key={species} onClick={() => handleSpeciesClick(species)}>
                {species.charAt(0).toUpperCase() + species.slice(1)}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;