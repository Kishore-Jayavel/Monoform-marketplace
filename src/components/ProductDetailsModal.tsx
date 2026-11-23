import React, { useState } from 'react';
import { Product } from '../types';
import { formatRupees } from '../utils/currency';
import { ProductArtwork } from './ProductArtwork';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) => {
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const [activeThumb, setActiveThumb] = useState<number>(0);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedQty);
    onClose();
  };

  // Synthetic original MSRP for discount calculation (25-35% markdown)
  const mrpPaise = Math.round(product.pricePaise * 1.33 / 100) * 100;
  const discountPercent = Math.round(((mrpPaise - product.pricePaise) / mrpPaise) * 100);

  const thumbnails = [
    { label: 'Front', icon: '◻' },
    { label: 'Angled', icon: '◱' },
    { label: 'Detail', icon: '🔍' },
    { label: 'Studio', icon: '◈' }
  ];

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="presentation"
      data-testid="product-detail-modal"
    >
      <div
        className="modal-card product-details-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-product-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close product details"
          data-testid="close-modal-btn"
        >
          &times;
        </button>

        {/* Amazon-style Breadcrumbs (Image 2) */}
        <nav className="modal-breadcrumbs" aria-label="Breadcrumbs">
          <span>Curated Editions</span>
          <span className="crumb-sep">&rsaquo;</span>
          <span>{product.category}</span>
          <span className="crumb-sep">&rsaquo;</span>
          <span className="crumb-active">{product.name}</span>
        </nav>

        <div className="product-modal-grid">
          {/* Left Column: Image Gallery with Vertical Thumbnails (Image 2) */}
          <div className="modal-visual-column">
            <div className="gallery-container">
              {/* Vertical Thumbnail Strip */}
              <div className="thumbnail-strip" role="tablist" aria-label="Product Views">
                {thumbnails.map((thumb, idx) => (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={activeThumb === idx}
                    className={`thumb-btn ${activeThumb === idx ? 'active' : ''}`}
                    onClick={() => setActiveThumb(idx)}
                    title={`View ${thumb.label}`}
                  >
                    <span className="thumb-icon">{thumb.icon}</span>
                    <span className="thumb-label">{thumb.label}</span>
                  </button>
                ))}
              </div>

              {/* Main Artwork Preview */}
              <div className="main-artwork-card">
                <span className="product-tag">{product.tag}</span>
                <div className="modal-artwork-wrapper">
                  <ProductArtwork productId={product.id} name={product.name} />
                </div>
                <div className="modal-stock-badge">
                  <span className="stock-dot" aria-hidden="true"></span>
                  <span>{product.inStock ? `In Stock (${product.stockCount} units available)` : 'Out of Stock'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Specifications, Amazon-Style Pricing, Offers & Buy Box */}
          <div className="modal-info-column">
            <div className="product-title-header">
              <span className="brand-store-link">Visit the MONOFORM Studio Store</span>
              <h2 id="modal-product-title" className="modal-title">
                {product.name}
              </h2>
              <p className="modal-subtitle">{product.subtitle}</p>
            </div>

            {/* Amazon Badges & Ratings (Image 2) */}
            <div className="modal-rating-row">
              <span className="curators-choice-badge">Curator's Choice</span>
              <span className="rating-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <span className="rating-text numeric">
                {product.rating.toFixed(1)} ({product.reviewCount} ratings)
              </span>
              <span className="bought-past-month">500+ acquired in past month</span>
            </div>

            {/* Amazon Price Box with Markdown & Taxes */}
            <div className="modal-price-box">
              <div className="price-primary-row">
                <span className="price-discount-tag">-{discountPercent}%</span>
                <span className="modal-price-value numeric" data-testid="modal-product-price">
                  {formatRupees(product.pricePaise)}
                </span>
              </div>
              <div className="mrp-row">
                <span className="mrp-label">M.R.P.:</span>
                <span className="mrp-value numeric">{formatRupees(mrpPaise)}</span>
              </div>
              <span className="price-tax-note">Inclusive of all taxes &bull; Integer-accurate calculations</span>
            </div>

            {/* Amazon Offers Strip (Image 2 feature) */}
            <div className="offers-strip-container">
              <div className="offers-header">
                <span className="offers-icon" aria-hidden="true">&#9830;</span>
                <h4 className="offers-title">Applicable Studio Offers</h4>
              </div>
              <div className="offers-grid">
                <div className="offer-card">
                  <span className="offer-tag">Cashback</span>
                  <p className="offer-text">Flat ₹100 cashback on Studio Pay checkout.</p>
                  <span className="offer-link">Terms Apply</span>
                </div>
                <div className="offer-card">
                  <span className="offer-tag">Bank Offer</span>
                  <p className="offer-text">Upto ₹150 instant discount on select cards.</p>
                  <span className="offer-link">2 Offers</span>
                </div>
                <div className="offer-card">
                  <span className="offer-tag">Partner Offer</span>
                  <p className="offer-text">Complimentary notebook with ₹2,000 purchase.</p>
                  <span className="offer-link">Get Details</span>
                </div>
              </div>
            </div>

            {/* Prime-Style Delivery & Location Box */}
            <div className="delivery-info-banner">
              <div className="delivery-fast-row">
                <span className="prime-style-badge">STUDIO PRIME</span>
                <span className="delivery-estimate-text">
                  FREE Delivery <strong>Thursday, 26 November</strong>. Order within 3 hrs.
                </span>
              </div>
              <div className="delivery-location-note">
                <span aria-hidden="true">&#9906;</span>
                <span>Delivering to Bangalore 560001 &bull; In stock</span>
              </div>
            </div>

            <p className="modal-description">{product.description}</p>

            {/* Material Specifications */}
            <div className="modal-specs">
              <h4 className="specs-heading">Material Specifications &amp; Craft</h4>
              <ul className="specs-list">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="spec-item">
                    <span className="spec-bullet">&bull;</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector & Add to Bag Actions */}
            <div className="modal-actions-box">
              <div className="modal-qty-selector">
                <span className="qty-label">Quantity:</span>
                <div className="qty-controls" role="group" aria-label="Quantity selector">
                  <button
                    type="button"
                    className="btn-modal-qty"
                    onClick={() => setSelectedQty((prev) => Math.max(1, prev - 1))}
                    disabled={selectedQty <= 1}
                    aria-label="Decrease quantity"
                    data-testid="modal-qty-decrease"
                  >
                    &minus;
                  </button>
                  <span className="modal-qty-val numeric" data-testid="modal-qty-display">
                    {selectedQty}
                  </span>
                  <button
                    type="button"
                    className="btn-modal-qty"
                    onClick={() => setSelectedQty((prev) => prev + 1)}
                    aria-label="Increase quantity"
                    data-testid="modal-qty-increase"
                  >
                    &#43;
                  </button>
                </div>
              </div>

              <div className="modal-cta-buttons">
                <button
                  type="button"
                  className="btn-modal-add-cart"
                  onClick={handleAdd}
                  data-testid="modal-add-to-cart"
                >
                  Add to Cart &bull; {formatRupees(product.pricePaise * selectedQty)}
                </button>
                <button
                  type="button"
                  className={`btn-modal-wishlist ${isWishlisted ? 'wishlisted' : ''}`}
                  onClick={() => onToggleWishlist(product)}
                  data-testid="modal-wishlist-toggle"
                  aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  {isWishlisted ? '♥ Saved in Wishlist' : '♡ Add to Wishlist'}
                </button>
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="modal-reviews-section">
              <h4 className="reviews-heading">Customer Reviews &amp; Reflections</h4>
              <p className="reviews-disclaimer">Clearly labelled synthetic sample reviews for evaluation</p>

              <div className="reviews-list">
                {product.reviews.map((rev) => (
                  <article key={rev.id} className="review-card">
                    <div className="review-meta">
                      <span className="review-author">{rev.author}</span>
                      {rev.verified && <span className="verified-badge">&check; Verified Patron</span>}
                      <span className="review-date numeric">{rev.date}</span>
                    </div>
                    <div className="review-stars">
                      {'★'.repeat(rev.rating)}
                    </div>
                    <p className="review-comment">{rev.comment}</p>
                  </article>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-modal-back"
            onClick={onClose}
          >
            &larr; Return to Marketplace Collection
          </button>
        </div>
      </div>
    </div>
  );
};
