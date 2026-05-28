import { useEffect, useState } from "react";
import { ApiService } from "../../../utils/ApiService";
import "./FilterPanel.css";

type FilterPanelProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedMood: string;
  onMoodChange: (m: string) => void;
  maxPrice: string;
  onMaxPriceChange: (price: string) => void;
  onResetFilters: () => void;
};

const FilterPanel = ({
  selectedCategory,
  onCategoryChange,
  selectedMood,     
  onMoodChange,     
  maxPrice,
  onMaxPriceChange,
  onResetFilters,
}: FilterPanelProps) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    ApiService.getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  return (
    <section className="filter-panel" aria-label="Product filters">
      
      <div className="filter-field">
        <label htmlFor="mood-filter">Mood</label>
        <select 
          id="mood-filter" 
          value={selectedMood} 
          onChange={(e) => onMoodChange(e.target.value)}
        >
          <option value="">All moods</option>
          <option value="Focus">Focus 🌿</option>
          <option value="Unwind">Unwind 🌙</option>
          <option value="Energise">Energise ⚡</option>
          <option value="Explore">Explore ☁️</option>
          <option value="Refresh">Refresh 🌸</option>
          <option value="Ritual">Ritual 🕯️</option>
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="category-filter">Category</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="max-price-filter">Max price</label>
        <input
          id="max-price-filter"
          type="number"
          min="0"
          step="1"
          value={maxPrice}
          onChange={(event) => onMaxPriceChange(event.target.value)}
          placeholder="e.g. 50"
        />
      </div>

      <button type="button" className="filter-reset" onClick={onResetFilters}>
        Reset
      </button>
    </section>
  );
};

export default FilterPanel;