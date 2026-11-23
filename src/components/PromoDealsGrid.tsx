import React from 'react';
import { Product } from '../types';

interface PromoDealsGridProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  products: Product[];
}

export const PromoDealsGrid: React.FC<PromoDealsGridProps> = ({
  onSelectProduct,
  onAddToCart,
  products
}) => {
  const notebook = products.find((p) => p.id === 'notebook');
  const bottle = products.find((p) => p.id === 'bottle');
  const pen = products.find((p) => p.id === 'pen');
  const tray = products.find((p) => p.id === 'tray');

  return (
    <section className="promo-deals-section" id="deals-section" aria-labelledby="deals-heading">
      <div className="deals-header">
        <div className="deals-title-wrap">
          <span className="deals-eyebrow">Studio Offers &amp; Value Sets</span>
          <h2 id="deals-heading" className="deals-title">Curated Marketplace Deals</h2>
        </div>
        <span className="deals-tagline">Limited Studio Allocations &bull; Guaranteed Authentic</span>
      </div>

      <div className="promo-cards-grid">
        {/* Deal Card 1: All Under ₹499 */}
        <div className="promo-card promo-card-terracotta">
          <div className="promo-card-content">
            <span className="promo-badge">Under ₹499</span>
            <h3 className="promo-card-title">Everyday Writing Essentials</h3>
            <p className="promo-card-desc">Archival thread-bound books &amp; precision gel pens.</p>
            <div className="promo-card-price-row">
              <span className="promo-price">From ₹349.00</span>
              <span className="promo-sub">Complimentary Delivery</span>
            </div>
            <div className="promo-actions-row">
              {notebook && (
                <button
                  type="button"
                  className="btn-promo-action"
                  onClick={() => onSelectProduct(notebook)}
                >
                  View Notebook &rsaquo;
                </button>
              )}
              {pen && (
                <button
                  type="button"
                  className="btn-promo-action"
                  onClick={() => onAddToCart(pen)}
                  style={{ marginLeft: '0.75rem' }}
                >
                  + Add Pen
                </button>
              )}
            </div>
          </div>
          <div className="promo-card-artwork">
            <span className="promo-art-icon" aria-hidden="true">&#9997;</span>
          </div>
        </div>

        {/* Deal Card 2: Starting ₹799 Drinkware */}
        <div className="promo-card promo-card-forest">
          <div className="promo-card-content">
            <span className="promo-badge">Starting ₹799</span>
            <h3 className="promo-card-title">Double-Wall Insulated Drinkware</h3>
            <p className="promo-card-desc">Pro-grade 18/8 stainless steel in matte stone finish.</p>
            <div className="promo-card-price-row">
              <span className="promo-price">₹799.00</span>
              <span className="promo-sub">12h Hot / 24h Cold</span>
            </div>
            {bottle && (
              <button
                type="button"
                className="btn-promo-action"
                onClick={() => onSelectProduct(bottle)}
              >
                View Desk Bottle &rsaquo;
              </button>
            )}
          </div>
          <div className="promo-card-artwork">
            <span className="promo-art-icon" aria-hidden="true">&#9832;</span>
          </div>
        </div>

        {/* Deal Card 3: Instant Studio Cashback */}
        <div className="promo-card promo-card-sand">
          <div className="promo-card-content">
            <span className="promo-badge">Patron Perk</span>
            <h3 className="promo-card-title">Up to ₹150 Cashback on Studio Pay</h3>
            <p className="promo-card-desc">Enjoy instant integer-accurate rebate on all prepaid orders.</p>
            <div className="promo-card-price-row">
              <span className="promo-price">100% Guaranteed</span>
              <span className="promo-sub">No minimum balance</span>
            </div>
            <button
              type="button"
              className="btn-promo-action"
              onClick={() => {
                const el = document.getElementById('checkout-heading');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Learn More &rsaquo;
            </button>
          </div>
          <div className="promo-card-artwork">
            <span className="promo-art-icon" aria-hidden="true">&#9670;</span>
          </div>
        </div>

        {/* Deal Card 4: Studio Workspace Accessories */}
        <div className="promo-card promo-card-stone">
          <div className="promo-card-content">
            <span className="promo-badge">Curator's Choice</span>
            <h3 className="promo-card-title">Organizers &amp; Studio Apparel</h3>
            <p className="promo-card-desc">Belgian flax linen trays and heavyweight studio canvas.</p>
            <div className="promo-card-price-row">
              <span className="promo-price">From ₹649.00</span>
              <span className="promo-sub">Top Rated 4.9★</span>
            </div>
            {tray && (
              <button
                type="button"
                className="btn-promo-action"
                onClick={() => onSelectProduct(tray)}
              >
                View Linen Tray &rsaquo;
              </button>
            )}
          </div>
          <div className="promo-card-artwork">
            <span className="promo-art-icon" aria-hidden="true">&#9635;</span>
          </div>
        </div>
      </div>
    </section>
  );
};
