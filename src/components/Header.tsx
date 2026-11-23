import React, { useState } from 'react';
import { ProductCategory, UserProfile } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
  onLogoClick: () => void;
  user: UserProfile | null;
  onOpenSignIn: () => void;
  onOpenDrawer: () => void;
  deliveryPin?: string;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  onLogoClick,
  user,
  onOpenSignIn,
  onOpenDrawer,
  deliveryPin = '641032'
}) => {
  const [locationCity, setLocationCity] = useState('Coimbatore');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [pinInput, setPinInput] = useState(deliveryPin);

  const categories: ProductCategory[] = [
    'All',
    'Stationery',
    'Drinkware',
    'Desk Accessories',
    'Lifestyle Essentials'
  ];

  const handleUpdateLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim()) {
      if (pinInput.startsWith('11') || pinInput.startsWith('12')) setLocationCity('Delhi');
      else if (pinInput.startsWith('40') || pinInput.startsWith('41')) setLocationCity('Mumbai');
      else if (pinInput.startsWith('60') || pinInput.startsWith('61')) setLocationCity('Chennai');
      else setLocationCity('Bangalore');
      setIsLocationModalOpen(false);
    }
  };

  return (
    <header className="site-header" role="banner">
      {/* Main Header Bar (Amazon-Inspired) */}
      <div className="header-main">
        <div className="header-inner">
          {/* Brand Logo & Tagline */}
          <div
            className="brand-group"
            onClick={onLogoClick}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') onLogoClick(); }}
            title="MONOFORM — Curated Marketplace"
          >
            <span className="brand-badge">ARCHIVAL GOODS</span>
            <h1 className="brand-title">MONOFORM</h1>
            <p className="brand-subtitle">Curated Objects of Utility</p>
          </div>

          {/* Location Delivery Selector (Image 1 feature) */}
          <button
            type="button"
            className="header-location-btn"
            onClick={() => setIsLocationModalOpen(true)}
            aria-label={`Delivering to ${locationCity} ${pinInput}. Click to update location.`}
            data-testid="header-location-btn"
          >
            <span className="location-pin-icon" aria-hidden="true">&#9906;</span>
            <div className="location-text-group">
              <span className="location-deliver-to">Delivering to {locationCity} {pinInput}</span>
              <span className="location-action">Update location</span>
            </div>
          </button>

          {/* Search Bar with Category Dropdown */}
          <div className="search-bar-container" role="search">
            <div className="search-category-dropdown">
              <label htmlFor="search-cat-select" className="sr-only">Select Search Department</label>
              <select
                id="search-cat-select"
                className="search-select"
                value={selectedCategory}
                onChange={(e) => onSelectCategory(e.target.value as ProductCategory)}
                aria-label="Filter search by category"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="search-input-wrapper">
              <label htmlFor="marketplace-search" className="sr-only">Search Curated Collection</label>
              <input
                id="marketplace-search"
                type="search"
                className="search-input"
                placeholder="Search notebooks, bottles, brass pens..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                data-testid="search-input"
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search query"
                  data-testid="search-clear-btn"
                >
                  &times;
                </button>
              )}
            </div>

            <button
              type="button"
              className="search-submit-btn"
              onClick={() => {
                const el = document.getElementById('catalog-heading');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label="Search Collection"
            >
              <span aria-hidden="true">&#128269;</span>
            </button>
          </div>

          {/* Header Action Nav (Amazon-Inspired: Sign In / Account, Orders, Wishlist, Cart) */}
          <div className="header-actions">
            {/* Account / Sign In Trigger */}
            <button
              type="button"
              className="action-btn account-btn"
              onClick={user ? onOpenAccount : onOpenSignIn}
              aria-label={user ? `Signed in as ${user.name}. View Account` : 'Hello, sign in. Account & Lists'}
              data-testid="account-button"
            >
              <div className="account-text-group">
                <span className="action-greeting">Hello, {user ? user.name.split(' ')[0] : 'sign in'}</span>
                <span className="action-label">Account &amp; Lists &#9662;</span>
              </div>
            </button>

            {/* Returns & Orders */}
            <button
              type="button"
              className="action-btn orders-btn"
              onClick={onOpenAccount}
              aria-label="Returns and Orders"
              data-testid="returns-orders-btn"
            >
              <div className="orders-text-group">
                <span className="action-subtext">Returns</span>
                <span className="action-label">&amp; Orders</span>
              </div>
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              className="action-btn wishlist-btn"
              onClick={onOpenWishlist}
              aria-label={`Wishlist, ${wishlistCount} saved objects`}
              data-testid="wishlist-header-btn"
            >
              <span className="action-icon" aria-hidden="true">&hearts;</span>
              <span className="action-label">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="action-badge numeric" data-testid="wishlist-count-badge">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              type="button"
              className="action-btn cart-btn"
              onClick={onOpenCart}
              aria-label={`Shopping Bag, ${cartCount} items`}
              data-testid="cart-header-btn"
            >
              <div className="cart-icon-wrapper">
                <span className="action-icon" aria-hidden="true">&#9638;</span>
                <span className="action-badge numeric" data-testid="cart-badge-count">
                  {cartCount}
                </span>
              </div>
              <span className="action-label">Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Nav Bar with 'All' Hamburger Menu (Amazon-Style from Image 1 & 3) */}
      <nav className="secondary-nav-bar" aria-label="Quick Category & Deals Navigation">
        <div className="secondary-nav-inner">
          {/* Hamburger 'All' Button */}
          <button
            type="button"
            className="all-menu-btn"
            onClick={onOpenDrawer}
            aria-label="Open all navigation departments"
            data-testid="all-departments-btn"
          >
            <span className="menu-icon" aria-hidden="true">&#9776;</span>
            <span className="menu-text">All</span>
          </button>

          <ul className="subnav-links" role="menubar">
            <li role="none">
              <button
                type="button"
                className="subnav-item-btn"
                onClick={() => {
                  const el = document.getElementById('deals-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Today's Deals
              </button>
            </li>
            {categories.map((category) => (
              <li key={category} role="none">
                <button
                  type="button"
                  role="menuitem"
                  className={`subnav-item-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => onSelectCategory(category)}
                  data-testid={`category-tab-${category.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {category === 'All' ? 'All Collections' : category}
                </button>
              </li>
            ))}
            <li role="none">
              <button
                type="button"
                className="subnav-item-btn"
                onClick={() => alert('MONOFORM Studio Direct: Certified 100% genuine craftsmanship.')}
              >
                Studio Direct
              </button>
            </li>
            <li role="none">
              <button
                type="button"
                className="subnav-item-btn"
                onClick={() => onOpenAccount()}
              >
                Gift Registry
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Location Modal */}
      {isLocationModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsLocationModalOpen(false)}>
          <div className="location-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="location-modal-header">
              <h3 className="location-modal-title">Choose your delivery location</h3>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setIsLocationModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <p className="location-modal-desc">
              Select a delivery location to see product availability and delivery options across India.
            </p>
            <form onSubmit={handleUpdateLocation} className="location-form">
              <div className="form-group">
                <label htmlFor="location-pincode" className="form-label">
                  Enter an Indian PIN code
                </label>
                <div className="pincode-input-row">
                  <input
                    id="location-pincode"
                    type="text"
                    maxLength={6}
                    className="form-input"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="e.g. 560001"
                  />
                  <button type="submit" className="btn-pincode-apply">
                    Apply
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
