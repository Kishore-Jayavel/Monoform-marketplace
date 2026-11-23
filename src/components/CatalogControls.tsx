import React from 'react';
import { ProductCategory } from '../types';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc';

interface CatalogControlsProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  searchQuery: string;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  totalFilteredCount: number;
  totalCatalogueCount: number;
  onClearFilters: () => void;
}

export const CatalogControls: React.FC<CatalogControlsProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  sortBy,
  onSortChange,
  maxPrice,
  onMaxPriceChange,
  totalFilteredCount,
  totalCatalogueCount,
  onClearFilters
}) => {
  const hasActiveFilters = selectedCategory !== 'All' || searchQuery !== '' || maxPrice < 1500 || sortBy !== 'featured';

  return (
    <div className="catalog-controls-bar" role="region" aria-label="Catalogue Filters and Sorting">
      <div className="controls-row-main">
        {/* Category Pills */}
        <div className="category-pills-group" role="tablist" aria-label="Category Filter">
          {(['All', 'Stationery', 'Drinkware', 'Desk Accessories', 'Lifestyle Essentials'] as ProductCategory[]).map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat)}
              data-testid={`filter-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sorting Dropdown */}
        <div className="sort-group">
          <label htmlFor="catalog-sort" className="sort-label">Sort by:</label>
          <select
            id="catalog-sort"
            className="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            data-testid="sort-select"
          >
            <option value="featured">Studio Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="controls-row-secondary">
        {/* Price Slider / Filter */}
        <div className="price-filter-group">
          <label htmlFor="price-range" className="filter-label">
            Max Price: <span className="numeric font-bold">₹{maxPrice}.00</span>
          </label>
          <input
            id="price-range"
            type="range"
            min="499"
            max="1500"
            step="100"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(Number(e.target.value))}
            className="price-range-slider"
            data-testid="price-slider"
          />
        </div>

        {/* Results Counter & Clear Filter */}
        <div className="results-meta-group">
          <span className="results-counter numeric" data-testid="catalog-count-badge">
            Showing {totalFilteredCount} of {totalCatalogueCount} pieces
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              className="btn-clear-filters"
              onClick={onClearFilters}
              data-testid="clear-filters-btn"
            >
              &times; Clear All Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
