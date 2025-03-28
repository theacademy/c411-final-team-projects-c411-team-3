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
import EditPetPage from "./pages/EditPetPage";


const AppRoutes = () => {
  return (
      <Router>
        <Navbar />
        <Box sx={{ height: '80px' }} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="/view-request" element={<ViewRequest />} />
          <Route path="/requests" element={<AllRequests />} />
          <Route path="/pets" element={<AllPetsPage />} />
          <Route path="/pets/:id" element={<PetDetailPage />} />
          <Route path="/pets/species/:species" element={<SpeciesPetsPage/>} />
          <Route path="/edit-pet/:id" element={<EditPetPage />} />
        </Routes>
      </Router>
  );
};

export default AppRoutes;