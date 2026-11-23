import React from 'react';
import { Product } from '../types';
import { formatRupees } from '../utils/currency';
import { ProductArtwork } from './ProductArtwork';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  cartQuantity: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  onToggleWishlist,
  isWishlisted,
  cartQuantity
}) => {
  return (
    <article
      className="product-card"
      data-testid={`product-card-${product.id}`}
      aria-labelledby={`product-heading-${product.id}`}
    >
      <div className="product-card-visual" onClick={() => onViewDetails(product)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') onViewDetails(product); }} style={{ cursor: 'pointer' }}>
        <div className="product-badges-row">
          <span className="product-tag">{product.tag}</span>
          <button
            type="button"
            className={`btn-wishlist-toggle ${isWishlisted ? 'wishlisted' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            aria-label={isWishlisted ? `Remove ${product.name} from Wishlist` : `Add ${product.name} to Wishlist`}
            data-testid={`wishlist-toggle-${product.id}`}
          >
            <span aria-hidden="true">{isWishlisted ? '♥' : '♡'}</span>
          </button>
        </div>
        <ProductArtwork productId={product.id} name={product.name} />
      </div>

      <div className="product-card-body">
        <div className="product-category-row">
          <span className="product-category-label">{product.category}</span>
          <div className="product-rating-badge" title="Sample evaluation rating" aria-label={`Rated ${product.rating} out of 5 stars by ${product.reviewCount} customers`}>
            <span className="star-icon" aria-hidden="true">&#9733;</span>
            <span className="rating-score numeric">{product.rating.toFixed(1)}</span>
            <span className="rating-count numeric">({product.reviewCount})</span>
          </div>
        </div>

        <div className="product-header">
          <div className="product-identity">
            <h3
              id={`product-heading-${product.id}`}
              className="product-name"
              onClick={() => onViewDetails(product)}
              style={{ cursor: 'pointer' }}
            >
              {product.name}
            </h3>
            <span className="product-subtitle">{product.subtitle}</span>
          </div>
          <div className="product-price-badge">
            <span className="price-label sr-only">Unit Price</span>
            <span className="price-value numeric" data-testid={`product-price-${product.id}`}>
              {formatRupees(product.pricePaise)}
            </span>
          </div>
        </div>

        <p className="product-description">{product.description}</p>

        <ul className="product-details-list" aria-label="Specifications">
          {product.details.map((detail, index) => (
            <li key={index} className="detail-item">
              <span className="detail-bullet" aria-hidden="true">—</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>

        <div className="product-card-actions">
          <div className="actions-button-row">
            <button
              type="button"
              className="btn-add-product"
              onClick={() => onAddToCart(product)}
              aria-label={`Add ${product.name} to Cart`}
              data-testid={`add-to-cart-${product.id}`}
            >
              <span className="btn-add-text">Add {product.name}</span>
              <span className="btn-add-price numeric">{formatRupees(product.pricePaise)}</span>
            </button>
            <button
              type="button"
              className="btn-view-details"
              onClick={() => onViewDetails(product)}
              aria-label={`View full details of ${product.name}`}
              data-testid={`view-details-${product.id}`}
            >
              Details
            </button>
          </div>

          {cartQuantity > 0 && (
            <span className="in-cart-indicator" aria-live="polite">
              {cartQuantity} in bag
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
