import { useState } from "react";
import FilterPanel from "../../components/features/filterPanel/FilterPanel";
import ProductList from "../../components/features/productList/ProductList";
import SearchBar from "../../components/features/searchBar/SearchBar";
import "./Products.css";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const resetFilters = () => {
    setSelectedCategory("");
    setMaxPrice("");
  };

  return (
    <div className="pageContainer">
      <h1>Products</h1>
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        onFilterClick={() => setIsFilterOpen((isOpen) => !isOpen)}
      />
      {isFilterOpen && (
        <FilterPanel
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          onResetFilters={resetFilters}
        />
      )}
      <ProductList
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        maxPrice={maxPrice}
      />
    </div>
  );
}

export default Products;
