import React from 'react';

interface ProductArtworkProps {
  productId: string;
  name: string;
}

export const ProductArtwork: React.FC<ProductArtworkProps> = ({ productId, name }) => {
  if (productId === 'notebook') {
    return (
      <div className="product-artwork-container" aria-hidden="true">
        <svg viewBox="0 0 240 200" className="product-artwork-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>{name}</title>
          <ellipse cx="120" cy="180" rx="90" ry="12" fill="#292B27" fillOpacity="0.07" />
          <path d="M50 45 L175 45 C185 45 190 52 190 60 L190 162 C190 166 185 170 178 170 L50 170 Z" fill="#EDE7DC" stroke="#DCD3C3" strokeWidth="1.5" />
          <path d="M187 62 L187 165" stroke="#C4B9A7" strokeWidth="1" strokeDasharray="2 3" />
          <path d="M184 58 L184 167" stroke="#DCD3C3" strokeWidth="1" />
          <rect x="45" y="40" width="135" height="130" rx="4" fill="#183B32" />
          <rect x="45" y="40" width="16" height="130" rx="2" fill="#122B24" />
          <line x1="61" y1="40" x2="61" y2="170" stroke="#0D201A" strokeWidth="1.5" />
          <rect x="80" y="75" width="75" height="50" rx="2" fill="#F5F1E8" stroke="#DCD3C3" strokeWidth="1" />
          <line x1="90" y1="90" x2="145" y2="90" stroke="#183B32" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="90" y1="100" x2="135" y2="100" stroke="#8E8A83" strokeWidth="1" strokeLinecap="round" />
          <line x1="90" y1="110" x2="120" y2="110" stroke="#C66B4E" strokeWidth="1" strokeLinecap="round" />
          <path d="M110 35 L110 185 L116 177 L122 185 L122 35 Z" fill="#C66B4E" />
        </svg>
      </div>
    );
  }

  if (productId === 'bottle') {
    return (
      <div className="product-artwork-container" aria-hidden="true">
        <svg viewBox="0 0 240 200" className="product-artwork-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>{name}</title>
          <ellipse cx="120" cy="182" rx="45" ry="10" fill="#292B27" fillOpacity="0.08" />
          <rect x="94" y="70" width="52" height="105" rx="6" fill="#C66B4E" />
          <rect x="100" y="70" width="8" height="105" fill="#FFFFFF" fillOpacity="0.22" />
          <rect x="134" y="70" width="10" height="105" rx="2" fill="#292B27" fillOpacity="0.12" />
          <path d="M102 70 L107 48 L133 48 L138 70 Z" fill="#B25A3E" />
          <rect x="105" y="32" width="30" height="16" rx="3" fill="#183B32" />
          <rect x="104" y="42" width="32" height="5" fill="#0D201A" />
          <path d="M112 32 C112 22, 128 22, 128 32" stroke="#183B32" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="120" cy="115" r="7" stroke="#FAF8F4" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="120" y1="128" x2="120" y2="138" stroke="#FAF8F4" strokeWidth="1" strokeOpacity="0.5" />
        </svg>
      </div>
    );
  }

  if (productId === 'pen') {
    return (
      <div className="product-artwork-container" aria-hidden="true">
        <svg viewBox="0 0 240 200" className="product-artwork-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>{name}</title>
          <ellipse cx="120" cy="180" rx="80" ry="10" fill="#292B27" fillOpacity="0.06" />
          <g transform="rotate(-30 120 100)">
            <rect x="40" y="94" width="140" height="12" rx="2" fill="#D4AF37" />
            <rect x="40" y="94" width="140" height="4" fill="#FFFFFF" fillOpacity="0.3" />
            <rect x="180" y="92" width="22" height="16" rx="2" fill="#B8860B" />
            <path d="M40 94 L15 100 L40 106 Z" fill="#4A4A4A" />
            <circle cx="20" cy="100" r="1.5" fill="#183B32" />
            <rect x="150" y="86" width="36" height="4" rx="2" fill="#AA7C11" />
          </g>
        </svg>
      </div>
    );
  }

  if (productId === 'tray') {
    return (
      <div className="product-artwork-container" aria-hidden="true">
        <svg viewBox="0 0 240 200" className="product-artwork-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>{name}</title>
          <ellipse cx="120" cy="165" rx="85" ry="16" fill="#292B27" fillOpacity="0.08" />
          <path d="M45 110 L195 110 L180 155 L60 155 Z" fill="#FAF8F4" stroke="#DCD3C3" strokeWidth="1.5" />
          <path d="M50 115 L190 115 L176 150 L64 150 Z" fill="#EDE7DC" />
          <line x1="85" y1="120" x2="85" y2="145" stroke="#C4B9A7" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="145" y1="120" x2="145" y2="145" stroke="#C4B9A7" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      </div>
    );
  }

  if (productId === 'cup') {
    return (
      <div className="product-artwork-container" aria-hidden="true">
        <svg viewBox="0 0 240 200" className="product-artwork-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>{name}</title>
          <ellipse cx="120" cy="175" rx="65" ry="12" fill="#292B27" fillOpacity="0.08" />
          {/* Saucer */}
          <ellipse cx="120" cy="155" rx="55" ry="10" fill="#FAF8F4" stroke="#DCD3C3" strokeWidth="1.5" />
          <ellipse cx="120" cy="153" rx="35" ry="5" fill="#EDE7DC" />
          {/* Cup */}
          <path d="M90 90 L150 90 C150 135 140 148 120 148 C100 148 90 135 90 90 Z" fill="#FAF8F4" stroke="#DCD3C3" strokeWidth="1.5" />
          <path d="M96 90 L144 90 C144 130 136 142 120 142 C104 142 96 130 96 90 Z" fill="#5C4033" />
          {/* Handle */}
          <path d="M148 100 C165 100 165 128 144 132" stroke="#FAF8F4" strokeWidth="5" strokeLinecap="round" />
          <path d="M148 100 C165 100 165 128 144 132" stroke="#DCD3C3" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // Apron fallback
  return (
    <div className="product-artwork-container" aria-hidden="true">
      <svg viewBox="0 0 240 200" className="product-artwork-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>{name}</title>
        <ellipse cx="120" cy="180" rx="60" ry="10" fill="#292B27" fillOpacity="0.08" />
        <path d="M95 40 L145 40 L160 85 L165 165 L75 165 L80 85 Z" fill="#183B32" rx="4" />
        <path d="M95 40 C95 28 145 28 145 40" stroke="#C66B4E" strokeWidth="3" />
        <rect x="92" y="105" width="56" height="42" rx="2" fill="#122B24" stroke="#DCD3C3" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="120" y1="105" x2="120" y2="147" stroke="#DCD3C3" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="95" cy="50" r="2.5" fill="#D4AF37" />
        <circle cx="145" cy="50" r="2.5" fill="#D4AF37" />
      </svg>
    </div>
  );
};
