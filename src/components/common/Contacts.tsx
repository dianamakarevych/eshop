import React, { useState } from "react";

const Contacts = () => {
  // 1. Form field values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  // 2. Error and success state
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    msg: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitContact = (e: React.FormEvent) => {
    e.preventDefault();

    const isNameInvalid = !name.trim();
    const isEmailInvalid = !email.includes("@");
    const isMsgInvalid = !msg.trim();

    setErrors({
      name: isNameInvalid,
      email: isEmailInvalid,
      msg: isMsgInvalid,
    });

    if (!isNameInvalid && !isEmailInvalid && !isMsgInvalid) {
      setIsSubmitted(true);
    }
  };

  const resetContact = () => {
    setName("");
    setEmail("");
    setMsg("");
    setErrors({ name: false, email: false, msg: false });
    setIsSubmitted(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      {!isSubmitted ? (
        <form onSubmit={submitContact} id="contact-form-inner">
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <span style={{ color: "red" }}> Name is required</span>
            )}
          </div>

          <div>
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span style={{ color: "red" }}> Email must contain @</span>
            )}
          </div>

          <div>
            <label>Message:</label>
            <textarea value={msg} onChange={(e) => setMsg(e.target.value)} />
            {errors.msg && (
              <span style={{ color: "red" }}> Message cannot be empty</span>
            )}
          </div>

          <button type="submit">Send</button>
        </form>
      ) : (
        <div id="contact-success">
          <h3>Thank you! Your message has been sent successfully.</h3>
          <button onClick={resetContact}>Write a new message</button>
        </div>
      )}
    </div>
  );
};

export default Contacts;
