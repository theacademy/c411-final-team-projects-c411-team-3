import React, { useState, useEffect } from "react";
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Invalid user in localStorage");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadUser();

    // 🔥 Listen for "userChanged" event (custom)
    const handleUserChange = () => {
      loadUser();
    };

    window.addEventListener("userChanged", handleUserChange);

    return () => {
      window.removeEventListener("userChanged", handleUserChange);
    };
  }, []);


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

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChanged"));
    setUser(null);
    navigate("/"); // or navigate("/login") if you have a login route
  };

  return (
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
        <Box
          component="img"
          src="/logo.png"
          sx={{
            maxHeight:60,
            width: 'auto',
            height: 'auto',
            cursor: 'pointer'
          }}
          onClick={() => navigate("/pets")}
        ></Box>
        <Box sx={{ flexGrow: 1 }} />

          {user && (
              <>
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
                {/* 👇 Admin-only button */}
                {user.role === "ADMIN" && (
                    <Button
                        color="inherit"
                        onClick={() => navigate("/requests")}
                        sx={{ ml: 2, textTransform: "none", fontWeight: "bold" }}
                    >
                      Requests
                    </Button>
                )}
                {user.role === "ADOPTER" && (
                    <Button
                        color="inherit"
                        onClick={() => navigate("/my-requests")}
                        sx={{ ml: 2, textTransform: "none", fontWeight: "bold" }}
                    >
                      My Requests
                    </Button>
                )}

                {/* Logout button */}
                <Button
                    color="inherit"
                    onClick={handleLogout}
                    sx={{ ml: 2, textTransform: "none", fontWeight: "bold" }}
                >
                  Logout
                </Button>
              </>
          )}
        </Toolbar>
      </AppBar>
  );
};

export default NavBar;
