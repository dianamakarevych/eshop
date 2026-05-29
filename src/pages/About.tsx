import "./About.css";
import { useNavigate } from "react-router-dom";

const About = () => {

    return (
        <div className="about-page">


            {/* Hero */}
            <section className="about-hero">
                <p className="about-tag">Our Story</p>
                <h1>Tea is not a product.<br /><em>It's a practice.</em></h1>
                <p className="about-hero-sub">
                    We source rare, meaningful teas from around the world — and help you find the one that fits your moment.
                </p>
            </section>

            {/* Mission */}
            <section className="about-section about-mission">
                <div className="about-text">
                    <p className="section-label">Why we exist</p>
                    <h2>We built a shop around how you feel.</h2>
                    <p>
                        Most tea shops sell leaves. We sell moments. Whether you need focus before a long day,
                        calm before sleep, or something to sip slowly on a quiet afternoon — every tea in our
                        collection was chosen with that in mind.
                    </p>
                    <p>
                        We started with a single cup and a curiosity that wouldn't quit. That curiosity took us
                        to tea gardens in Japan, mountain farms in China, and herb fields in the Mediterranean.
                        What came back with us was a collection worth sharing.
                    </p>
                </div>
                <div className="about-numbers">
                    <div className="about-stat">
                        <h3>18</h3>
                        <p>Teas curated</p>
                    </div>
                    <div className="about-stat">
                        <h3>6</h3>
                        <p>Moods covered</p>
                    </div>
                    <div className="about-stat">
                        <h3>12+</h3>
                        <p>Countries sourced</p>
                    </div>
                    <div className="about-stat">
                        <h3>1</h3>
                        <p>Cup at a time</p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="about-section about-values">
                <p className="section-label">What we believe</p>
                <h2>Our values</h2>
                <div className="values-grid">
                    <div className="value-card">
                        <span>🌱</span>
                        <h3>Origin matters</h3>
                        <p>Every tea has a birthplace. We know where ours come from and why it matters.</p>
                    </div>
                    <div className="value-card">
                        <span>🧘</span>
                        <h3>Slow down</h3>
                        <p>Tea is an invitation to pause. We design everything around that idea.</p>
                    </div>
                    <div className="value-card">
                        <span>🔍</span>
                        <h3>Transparency</h3>
                        <p>No mystery ingredients. No greenwashing. Just honest leaves and honest sourcing.</p>
                    </div>
                    <div className="value-card">
                        <span>🌍</span>
                        <h3>Sustainability</h3>
                        <p>We work with farms that care about the land as much as we care about the cup.</p>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="about-section about-team">
                <p className="section-label">The people</p>
                <h2>Who's behind -</h2>
                <div className="team-grid">
                    <div className="team-card">
                        <div className="team-avatar">-</div>
                        <h3>-</h3>
                        <p>Founder & Tea Curator</p>
                        <span>"I fell in love with tea accidentally. Now it's everything."</span>
                    </div>
                    <div className="team-card">
                        <div className="team-avatar">-</div>
                        <h3>-</h3>
                        <p>Head of Sourcing</p>
                        <span>"Every farm visit changes how I see a cup."</span>
                    </div>
                    <div className="team-card">
                        <div className="team-avatar">-</div>
                        <h3>-</h3>
                        <p>Customer Experience</p>
                        <span>"The right tea at the right moment is everything."</span>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="about-cta">
                <h2>Find your cup.</h2>
                <p>Let your mood guide you to the perfect tea.</p>
            </section>

            <footer className="about-footer">
                <p>© 2024 . All rights reserved.</p>

            </footer>
        </div>
    );
};

export default About;