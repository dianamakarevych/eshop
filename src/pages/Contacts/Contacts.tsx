import { useState } from "react";
import "./Contacts.css";

function Contacts(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = {
      name: name.trim() === "",
      email: !email.includes("@"),
      message: message.trim() === "",
    };

    setErrors(nextErrors);

    if (!nextErrors.name && !nextErrors.email && !nextErrors.message) {
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setErrors({ name: false, email: false, message: false });
    setIsSubmitted(false);
  };

  return (
    <section className="contact-page">
      <div className="contact-intro">
        <p className="contact-eyebrow">Contact us</p>
        <h1>We are here to help</h1>
        <p>
          Have a question about products, delivery, or your account? Send us a
          message and we will get back to you as soon as possible.
        </p>

        <div className="contact-details" aria-label="Contact details">
          <span>support@eshop.cz</span>
          <span>+420 123 456 789</span>
          <span>Mon-Fri, 9:00-17:00</span>
        </div>
      </div>

      <div className="contact-card">
        {isSubmitted ? (
          <div className="contact-success">
            <h2>Message sent</h2>
            <p>Thank you! Your message has been sent successfully.</p>
            <button type="button" onClick={resetForm}>
              Write another message
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-field">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              {errors.name && <span>Name is required.</span>}
            </div>

            <div className="contact-field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              {errors.email && <span>Please enter a valid email.</span>}
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                rows={6}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
              {errors.message && <span>Message cannot be empty.</span>}
            </div>

            <button className="contact-submit" type="submit">
              Send message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default Contacts;
