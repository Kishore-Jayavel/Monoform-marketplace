import React from 'react';

export const EmptyCartState: React.FC = () => {
  return (
    <div className="empty-cart-state" data-testid="empty-cart-container">
      <div className="empty-cart-artwork" aria-hidden="true">
        <svg
          viewBox="0 0 160 120"
          className="empty-cart-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle base surface */}
          <ellipse cx="80" cy="105" rx="50" ry="6" fill="#292B27" fillOpacity="0.06" />
          
          {/* Minimalist Tote / Bag Outline in terracotta & forest */}
          <path
            d="M48 45 L54 95 C54 98 57 100 61 100 L99 100 C103 100 106 98 106 95 L112 45 Z"
            fill="#FAF8F4"
            stroke="#DCD3C3"
            strokeWidth="1.5"
          />
          {/* Handles */}
          <path
            d="M62 45 C62 30, 72 24, 80 24 C88 24, 98 30, 98 45"
            stroke="#183B32"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Subtle stitched center crease */}
          <line x1="80" y1="52" x2="80" y2="92" stroke="#E2DAD0" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>
      <h4 className="empty-cart-title">Your shopping bag is unoccupied</h4>
      <p className="empty-cart-text">
        Select archival pieces from the collection above to review details and begin studio dispatch.
      </p>
    </div>
  );
};
