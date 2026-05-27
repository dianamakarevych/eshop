import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../../../assets/Logo.png";
import SeacrhBar from "../../features/searchBar/SearchBar";
import "./Header.css";

type CurrentUser = {
  username: string;
  email: string;
};

function Header(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const syncUser = () => {
      const savedUser = localStorage.getItem("eshop-current-user");
      setCurrentUser(savedUser ? JSON.parse(savedUser) : null);
    };

    syncUser();
    window.addEventListener("auth-change", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("auth-change", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("eshop-current-user");
    window.dispatchEvent(new Event("auth-change"));
  };

  return (
    <header className="header">
      <div className="headerLeft">
        <Link to="/" className="logoLink">
          <span className="logo">
            <img src={logoImage} alt="Logo" />
          </span>
          <span className="logoName">Tea shop</span>
        </Link>
      </div>

      <nav className="headerNav">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contacts">Contacts</Link>
      </nav>

      <div className="headerRight">
        <Link to="/cart" className="cartLink">
          Cart
        </Link>
        {currentUser ? (
          <>
            <Link to="/profile" className="headerUser">
              {currentUser.username}
            </Link>
            <button className="btnDark" type="button" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link className="btnDark" to="/login">
              Log in
            </Link>
            <Link className="btnDark" to="/register">
              Sign up
            </Link>
          </>
        )}
      </div>
      <div></div>
    </header>
  );
}

export default Header;
