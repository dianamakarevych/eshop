import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App/App";
import MoodPage from "./pages/MoodPage";
import History from "./pages/History";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="827178068168-abmtijqsq3rc8v8gqok7vu2vs6h7u4ug.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MoodPage />} />  {/* ← MoodPage as home */}
          <Route path="/mood" element={<MoodPage />} />
          <Route path="/history/:teaName" element={<History />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);