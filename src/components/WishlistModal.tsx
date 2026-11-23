import React from 'react';
import { Product } from '../types';
import { formatRupees } from '../utils/currency';
import { ProductArtwork } from './ProductArtwork';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToCart
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="presentation"
      data-testid="wishlist-modal"
    >
      <div
        className="modal-card wishlist-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wishlist-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-header-titles">
            <span className="section-eyebrow">Studio Curation</span>
            <h2 id="wishlist-modal-title" className="modal-title">
              Saved Wishlist ({wishlist.length})
            </h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Wishlist"
            data-testid="close-wishlist-btn"
          >
            &times;
          </button>
        </div>

        {wishlist.length === 0 ? (
          <div className="empty-wishlist-state" data-testid="empty-wishlist">
            <span className="empty-heart-icon" aria-hidden="true">&hearts;</span>
            <h3 className="empty-title">Your wishlist is currently vacant</h3>
            <p className="empty-desc">
              Save archival editions for later study by clicking the heart icon on any piece.
            </p>
            <button
              type="button"
              className="btn-continue-shopping"
              onClick={onClose}
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="wishlist-items-container">
            <ul className="wishlist-list" data-testid="wishlist-items-list">
              {wishlist.map((product) => (
                <li key={product.id} className="wishlist-item" data-testid={`wishlist-item-${product.id}`}>
                  <div className="wishlist-item-artwork">
                    <ProductArtwork productId={product.id} name={product.name} />
                  </div>
                  <div className="wishlist-item-details">
                    <span className="wishlist-item-category">{product.category}</span>
                    <h4 className="wishlist-item-name">{product.name}</h4>
                    <span className="wishlist-item-price numeric">
                      {formatRupees(product.pricePaise)}
                    </span>
                  </div>
                  <div className="wishlist-item-actions">
                    <button
                      type="button"
                      className="btn-wishlist-move"
                      onClick={() => {
                        onMoveToCart(product);
                        onRemoveFromWishlist(product.id);
                      }}
                      data-testid={`wishlist-move-${product.id}`}
                    >
                      Move to Bag
                    </button>
                    <button
                      type="button"
                      className="btn-wishlist-remove"
                      onClick={() => onRemoveFromWishlist(product.id)}
                      data-testid={`wishlist-remove-${product.id}`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="modal-footer">
          <button
            type="button"
            className="btn-modal-back"
            onClick={onClose}
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    </div>
  );
};
