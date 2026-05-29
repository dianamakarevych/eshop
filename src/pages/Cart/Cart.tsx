import React from "react";
import ProductCard from "../../components/features/productCard/ProductCard";
import type { Product } from "../../utils/ApiService";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Cart.css";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onRemove: (product: Product) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout"); 
};

  if (cartItems.length === 0) {
    return (
      <div className="pageContainer cart-empty">
        <h1>Your Cart</h1>
        <p>Your cart is empty. Go back to products to add some delicious tea!</p>
      </div>
    );
  }

  return (
    <div className="pageContainer">
      <h1>Your Cart</h1>
      <div className="product-list">
        {cartItems.map((item) => (
          <ProductCard
            key={item.product.id}
            product={item.product}
            quantity={item.quantity}
          />
        ))}
      </div>
      <div className="cart-summary">
        <div className="cart-summary__total">
          Total Price: <span>{totalPrice.toFixed(2)} EUR</span>
        </div>
        <button className="cart-summary__btn" onClick={handleCheckout}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Cart;