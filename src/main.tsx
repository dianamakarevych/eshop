import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="827178068168-abmtijqsq3rc8v8gqok7vu2vs6h7u4ug.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);