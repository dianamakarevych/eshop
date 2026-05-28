import React from "react";
import type { Product } from "../../../utils/ApiService";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleAddToCart = () => {
    alert(`"${product.title}" was added to cart!`);
  };

  return (
    <div className="product-card">
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
