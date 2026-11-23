import React from 'react';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-inner">
        <div className="hero-content">
          <span className="hero-eyebrow">MONOFORM EDITION 2026.04</span>
          <h2 id="hero-heading" className="hero-title">
            Objects made for everyday permanence.
          </h2>
          <p className="hero-subtitle">
            An archival catalog of tactile workspace tools, vacuum flasks, and studio implements engineered with uncompromising restraint.
          </p>
          <div className="hero-cta-group">
            <button
              type="button"
              className="btn-hero-primary"
              onClick={onExplore}
              data-testid="explore-collection-btn"
            >
              Explore Collection &darr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
