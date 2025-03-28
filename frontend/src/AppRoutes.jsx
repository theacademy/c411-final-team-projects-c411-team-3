import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import ProfileSetup from "./pages/ProfileSetup";
import ViewRequest from "./pages/ViewRequest";
import AllRequests from "./pages/AllRequests";
import AllPetsPage from "./pages/AllPetsPage";
import PetDetailPage from "./pages/PetDetailPage";
import Navbar from "./pages/NavBar";
import { Box } from "@mui/material";
import SpeciesPetsPage from "./pages/SpeciesPetsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import NotFoundPage from "./pages/NotFoundPage";
import EditPetPage from "./pages/EditPetPage";
import UserRequests from "./pages/UserRequests"; // Import the UserRequests component

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Box sx={{ height: '80px' }} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/requests" element={
          <AdminRoute>
            <AllRequests />
          </AdminRoute>
        } />
        <Route path="/view-request" element={
          <AdminRoute>
            <ViewRequest />
          </AdminRoute>
        } />
        <Route path="/edit-pet/:id" element={
          <AdminRoute>
            <EditPetPage />
          </AdminRoute>
        } />
        <Route path="/pets" element={
          <ProtectedRoute>
            <AllPetsPage />
          </ProtectedRoute>
        } />
        <Route path="/pets/:id" element={
          <ProtectedRoute>
            <PetDetailPage />
          </ProtectedRoute>
        } />
        <Route path="/pets/species/:species" element={
          <ProtectedRoute>
            <SpeciesPetsPage />
          </ProtectedRoute>
        } />
        <Route path="/my-requests" element={ // Add this route for user requests
          <ProtectedRoute>
            <UserRequests />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;