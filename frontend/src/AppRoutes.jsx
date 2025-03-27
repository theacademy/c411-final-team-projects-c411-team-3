import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import ProfileSetup from "./pages/ProfileSetup";
import SubmitRequest from "./pages/SubmitRequest";
import ViewRequest from "./pages/ViewRequest";

const AppRoutes = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="/submit-request" element={<SubmitRequest />} />
            <Route path="/view-request" element={<ViewRequest />} />
        </Routes>
      </Router>
  );
};

export default AppRoutes;