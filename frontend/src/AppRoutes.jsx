import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import ProfileSetup from "./pages/ProfileSetup";
import AllPetsPage from "./pages/AllPetsPage";
import PetDetailPage from "./pages/PetDetailPage";

const AppRoutes = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/pets" element={<AllPetsPage />} />
          <Route path="/pets/:id" element={<PetDetailPage />} />
        </Routes>
      </Router>
  );
};

export default AppRoutes;