import { Routes, Route } from "react-router-dom";
import Contacts from "../components/common/Contacts";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<Contacts />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default AppRoutes;
