import React, { useEffect, useState } from "react";
import { ApiService, type Product } from "../../../utils/ApiService";
import ProductCard from "../productCard/ProductCard";
import "./ProductList.css";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <>
      {products.length === 0 ? (
        <div className="product-list__status">
          <p>No products were found in the API.</p>
        </div>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
