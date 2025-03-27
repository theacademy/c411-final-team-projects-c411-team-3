import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import ProfileSetup from "./pages/ProfileSetup";
import AllRequests from "./pages/AllRequests";

const AppRoutes = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/requests" element={<AllRequests />} />
        </Routes>
      </Router>
  );
};

export default AppRoutes;