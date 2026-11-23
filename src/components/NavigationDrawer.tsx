import React from 'react';
import { ProductCategory, UserProfile } from '../types';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onOpenSignIn: () => void;
  onOpenAccount: () => void;
  onOpenWishlist: () => void;
  onSelectCategory: (category: ProductCategory) => void;
  onSignOut: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  user,
  onOpenSignIn,
  onOpenAccount,
  onOpenWishlist,
  onSelectCategory,
  onSignOut
}) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Navigation Menu">
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header: Hello, sign in or Hello, [Name] */}
        <div
          className="drawer-header"
          onClick={() => {
            if (user) {
              onOpenAccount();
            } else {
              onOpenSignIn();
            }
            onClose();
          }}
          data-testid="drawer-user-header"
        >
          <div className="drawer-user-avatar">
            <span aria-hidden="true">&#128100;</span>
          </div>
          <div className="drawer-user-text">
            <span className="drawer-greeting">
              Hello, {user ? user.name : 'sign in'}
            </span>
            <span className="drawer-account-link">
              {user ? 'Studio Patron Profile' : 'Sign in to your account'} &rarr;
            </span>
          </div>
          <button type="button" className="btn-drawer-close" onClick={onClose} aria-label="Close navigation menu">
            &times;
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="drawer-content">
          {/* Trending Section */}
          <div className="drawer-section">
            <h3 className="drawer-section-title">Trending</h3>
            <ul className="drawer-list">
              <li>
                <button
                  type="button"
                  className="drawer-link-btn"
                  onClick={() => {
                    onSelectCategory('All');
                    onClose();
                    const el = document.getElementById('catalog-heading');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Bestsellers &amp; Archival Icons
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="drawer-link-btn"
                  onClick={() => {
                    onSelectCategory('All');
                    onClose();
                    const el = document.getElementById('catalog-heading');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  New Releases (Edition 2026)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="drawer-link-btn"
                  onClick={() => {
                    onSelectCategory('All');
                    onClose();
                    const el = document.getElementById('deals-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Today's Curated Deals &amp; Offers
                </button>
              </li>
            </ul>
          </div>

          <div className="drawer-divider" />

          {/* Shop by Category Section */}
          <div className="drawer-section">
            <h3 className="drawer-section-title">Shop by Category</h3>
            <ul className="drawer-list">
              <li>
                <button
                  type="button"
                  className="drawer-link-btn"
                  onClick={() => {
                    onSelectCategory('Stationery');
                    onClose();
                  }}
                >
                  Stationery &amp; Writing <span>&rsaquo;</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="drawer-link-btn"
                  onClick={() => {
                    onSelectCategory('Drinkware');
                    onClose();
                  }}
                >
                  Drinkware &amp; Vessels <span>&rsaquo;</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="drawer-link-btn"
                  onClick={() => {
                    onSelectCategory('Desk Accessories');
                    onClose();
                  }}
                >
                  Desk Accessories &amp; Trays <span>&rsaquo;</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="drawer-link-btn"
                  onClick={() => {
                    onSelectCategory('Lifestyle Essentials');
                    onClose();
                  }}
                >
                  Lifestyle &amp; Studio Apparel <span>&rsaquo;</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="drawer-link-btn"
                  onClick={() => {
                    onSelectCategory('All');
                    onClose();
                  }}
                >
                  All Studio Editions <span>&rsaquo;</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="drawer-divider" />

          {/* Programs & Features */}
          <div className="drawer-section">
            <h3 className="drawer-section-title">Programs &amp; Features</h3>
            <ul className="drawer-list">
              <li>
                <button
                  type="button"
                  className="drawer-link-btn"
                  onClick={() => {
                    onOpenWishlist();
                    onClose();
                  }}
                >
                  Your Saved Wishlist
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="drawer-link-btn"
                  onClick={() => {
                    onOpenAccount();
                    onClose();
                  }}
                >
                  Patron Orders &amp; Receipts
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="drawer-link-btn"
                  onClick={() => {
                    onClose();
                    alert('MONOFORM Studio Express: Guaranteed 48hr delivery in Bangalore.');
                  }}
                >
                  Complimentary Studio Dispatch
                </button>
              </li>
            </ul>
          </div>

          <div className="drawer-divider" />

          {/* Help & Settings */}
          <div className="drawer-section">
            <h3 className="drawer-section-title">Help &amp; Settings</h3>
            <ul className="drawer-list">
              <li>
                <button
                  type="button"
                  className="drawer-link-btn"
                  onClick={() => {
                    onOpenAccount();
                    onClose();
                  }}
                >
                  Your Account
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="drawer-link-btn"
                  onClick={() => {
                    onClose();
                    alert('Customer Care: contact@studio.monoform.in');
                  }}
                >
                  Customer Service &amp; Inquiries
                </button>
              </li>
              <li>
                {user ? (
                  <button
                    type="button"
                    className="drawer-link-btn text-danger"
                    onClick={() => {
                      onSignOut();
                      onClose();
                    }}
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    type="button"
                    className="drawer-link-btn text-accent"
                    onClick={() => {
                      onOpenSignIn();
                      onClose();
                    }}
                  >
                    Sign In
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
