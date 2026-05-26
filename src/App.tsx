import "./App.css";
import { BrowserRouter, Link } from "react-router-dom";
import AppRoutes from "./routes/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>Eshop</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </header>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
