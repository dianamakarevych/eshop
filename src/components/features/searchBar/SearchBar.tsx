import "./SearchBar.css";
import searchIcon from "../../../assets/icons8-search-30.png";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onFilterClick: () => void;
};

const SearchBar = ({ value, onChange, onFilterClick }: SearchBarProps) => {
  return (
    <form
      className="search-container"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="search-bar">
        <label className="search-label" htmlFor="product-search">
          Search product
        </label>
        <input
          id="product-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search product..."
        />
        <button type="submit" className="search-btn">
          <img src={searchIcon} alt="" />
        </button>
      </div>

      <button type="button" className="filter-btn" onClick={onFilterClick}>
        Filter
      </button>
    </form>
  );
};

export default SearchBar;
