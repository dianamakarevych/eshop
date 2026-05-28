import React from "react";
import { useNavigate } from "react-router-dom"; 
import type { Product } from "../../../utils/ApiService";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate(); 

  const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, "-");

  const handleCardClick = () => {
    navigate(`/history/${slugify(product.title)}`, {
      state: { 
        teaName: product.title, 
        teaImage: product.image 
      }
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    alert(`"${product.title}" was added to cart!`);
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
          <button className="product-card__btn" onClick={handleAddToCart}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;