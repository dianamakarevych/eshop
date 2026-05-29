import React from "react";
import { useNavigate } from "react-router-dom"; 
import type { Product } from "../../../utils/ApiService";
import { useCart } from "../../../context/CartContext";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
  quantity?: number; 
}

const ProductCard: React.FC<ProductCardProps> = ({ product, quantity = 0}) => {
  const navigate = useNavigate(); 
  const { addToCart, removeFromCart } = useCart();
  const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, "-");

  const handleCardClick = () => {
    navigate(`/history/${slugify(product.title)}`, {
      state: { 
        teaName: product.title, 
        teaImage: product.image 
      }
    });
  };

  return (
    <div 
      className="product-card" 
      onClick={handleCardClick} 
      style={{ cursor: "pointer" }} 
    >
      <div className="product-card__image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="product-card__image"
        />
      </div>
      
      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__title">{product.title}</h3>
        
        <div className="product-card__rating">
          <span className="rating-star">⭐ {product.rating?.rate}</span>
          <span className="rating-count">({product.rating?.count} reviews)</span>
        </div>

        <p className="product-card__description">{product.description}</p>

        <div className="product-card__footer">
          <span className="product-card__price">
            {product.price.toFixed(2)} EUR
          </span>
          
          {quantity > 0 ? (
            <div className="product-card__quantity-controls">
              <button 
                className="quantity-btn" 
                onClick={(e) => { e.stopPropagation(); removeFromCart(product); }}
              >
                -
              </button>
              <span className="quantity-count">{quantity}</span>
              <button 
                className="quantity-btn" 
                onClick={(e) => { e.stopPropagation(); addToCart(product); }}
              >
                +
              </button>
            </div>
          ) : (
            <button 
              className="product-card__btn" 
              onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            >
              +
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;