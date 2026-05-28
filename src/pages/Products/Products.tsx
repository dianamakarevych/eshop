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
  const [selectedMood, setSelectedMood] = useState("");
  
  const resetFilters = () => {
    setSelectedCategory("");
    setMaxPrice("");
    setSelectedMood("");
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
          selectedMood={selectedMood}
          onMoodChange={setSelectedMood}
          onResetFilters={resetFilters}
        />
      )}
      <ProductList
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        maxPrice={maxPrice}
        selectedMood={selectedMood}
      />
    </div>
  );
}

export default Products;
