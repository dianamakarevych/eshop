import { Link } from "react-router-dom";
import facebookLogo from "../../../assets/social/facebook-logo.webp";
import instagramLogo from "../../../assets/social/instagram-logo.jpg";
import twitterLogo from "../../../assets/social/twitter-logo.png";
import "./Footer.css";

const footerLinks = [
  { to: "/", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contacts", label: "Contacts" },
];

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook", logo: facebookLogo },
  { href: "https://instagram.com", label: "Instagram", logo: instagramLogo },
  { href: "https://twitter.com", label: "X", logo: twitterLogo },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h3>E-Shop</h3>
          <p>
            Vas spolehlivy partner pro kazdodenni nakupy. Prinasime vam ty
            nejlepsi produkty za skvele ceny.
          </p>
        </div>

        <div className="footer-section links">
          <h3>Odkazy</h3>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link className="footer-link" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section contact-info">
          <h3>Kontakt</h3>
          <p>+420 123 456 789</p>
          <p>podpora@eshop.cz</p>
        </div>

        <div className="footer-section social">
          <h3>Sledujte nas</h3>
          <div className="social-icons">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                <img src={link.logo} alt="" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 E-Shop.</p>
      </div>
    </footer>
  );
}

export default Footer;
