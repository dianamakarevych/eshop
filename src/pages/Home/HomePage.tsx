import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <section className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-eyebrow">Loose leaf tea and everyday essentials</p>
          <h1>Tea Shop</h1>
          <p>
            Discover quality products for calm mornings, focused afternoons,
            and simple everyday rituals.
          </p>
          <div className="home-actions">
            <Link to="/products" className="home-link home-link-primary">
              Shop products
            </Link>
            <Link to="/about" className="home-link home-link-secondary">
              Our story
            </Link>
          </div>
        </div>
      </section>

      <section className="home-benefits" aria-label="Shop benefits">
        <article className="home-benefit">
          <strong>Quality products</strong>
          <span>Carefully selected items for everyday use.</span>
        </article>
        <article className="home-benefit">
          <strong>Fast delivery</strong>
          <span>Orders prepared quickly and shipped with care.</span>
        </article>
        <article className="home-benefit">
          <strong>Fair prices</strong>
          <span>Simple, honest pricing across the whole shop.</span>
        </article>
      </section>

      <section className="home-featured">
        <div>
          <p className="home-section-label">Popular picks</p>
          <h2>Start with the essentials</h2>
        </div>
        <div className="home-category-grid">
          <Link to="/products">Tea basics</Link>
          <Link to="/products">Daily favorites</Link>
          <Link to="/products">Gift ideas</Link>
        </div>
      </section>
    </section>
  );
}

export default HomePage;
