import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  
  const currentUser = {
    name: "", 
    email: "",
  };

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    address: "",
    phone: "",
    paymentMethod: "card", 
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order submitted:", { items: cartItems, customer: formData });
    alert(`Thank you, ${formData.name}! Your order has been placed. Payment: ${formData.paymentMethod}.`);
    clearCart();
    navigate("/"); 
  };

  if (cartItems.length === 0) {
    return (
      <div className="pageContainer checkout-empty">
        <h2>Your cart is empty</h2>
        <button className="go-shop-btn" onClick={() => navigate("/products")}>Go to Shop</button>
      </div>
    );
  }

  return (
    <div className="pageContainer checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Please fill in your details to complete the order.</p>
      </div>
      
      <div className="checkout-content">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Delivery Details</h2>
            
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
            </div>

            <div className="form-group">
              <label>Delivery Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="City, Street, House number" />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+420 123 456 789" />
            </div>
          </div>

          <div className="form-section">
            <h2>Payment Method</h2>
            
            <div className="payment-options">
              <label className={`payment-card ${formData.paymentMethod === "card" ? "active" : ""}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="card" 
                  checked={formData.paymentMethod === "card"} 
                  onChange={handleChange} 
                />
                <span className="payment-icon">💳</span>
                <div className="payment-info">
                  <span className="payment-title">Credit Card</span>
                  <span className="payment-desc">Pay securely online</span>
                </div>
              </label>

              <label className={`payment-card ${formData.paymentMethod === "cash" ? "active" : ""}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="cash" 
                  checked={formData.paymentMethod === "cash"} 
                  onChange={handleChange} 
                />
                <span className="payment-icon">💵</span>
                <div className="payment-info">
                  <span className="payment-title">Cash on Delivery</span>
                  <span className="payment-desc">Pay when you receive it</span>
                </div>
              </label>
            </div>
          </div>

          <div className="checkout-footer">
            <div className="checkout-total">
              Total to pay: <span>{totalPrice.toFixed(2)} EUR</span>
            </div>
            <button type="submit" className="submit-order-btn">
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout