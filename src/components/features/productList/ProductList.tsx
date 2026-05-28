import React, { useEffect, useState } from "react";
import { ApiService, type Product } from "../../../utils/ApiService";
import ProductCard from "../productCard/ProductCard";
import "./ProductList.css";

type ProductListProps = {
  searchTerm: string;
  selectedCategory: string;
  maxPrice: string;
  selectedMood: string; 
};

const ProductList: React.FC<ProductListProps> = ({
  searchTerm,
  selectedCategory,
  maxPrice,
  selectedMood, 
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const normalizedSelectedCategory = selectedCategory.trim().toLowerCase();
  const normalizedSelectedMood = selectedMood.trim().toLowerCase(); // <-- Нормализуем строку настроения
  
  const maxPriceValue = Number(maxPrice);
  const hasMaxPrice = maxPrice.trim() !== "" && !Number.isNaN(maxPriceValue);

  useEffect(() => {
    ApiService.getProducts()
      .then((loadedProducts) => {
        setProducts(loadedProducts);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Products failed to load.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="product-list__status">
        <div className="product-list__spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list__status product-list__error">
        <p>Error: {error}</p>
      </div>
    );
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      !normalizedSearchTerm ||
      product.title.toLowerCase().includes(normalizedSearchTerm) ||
      product.category.toLowerCase().includes(normalizedSearchTerm);
      
    const matchesCategory =
      !normalizedSelectedCategory ||
      product.category.toLowerCase() === normalizedSelectedCategory;
      
    const matchesPrice = !hasMaxPrice || product.price <= maxPriceValue;

    const matchesMood =
      !normalizedSelectedMood ||
      product.mood?.toLowerCase() === normalizedSelectedMood;

    return matchesSearch && matchesCategory && matchesPrice && matchesMood;
  });

  return (
    <>
      {products.length === 0 ? (
        <div className="product-list__status">
          <p>No products were found in the API.</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="product-list__status">
          <p>No products match your search.</p>
        </div>
      ) : (
        <div className="product-list">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;