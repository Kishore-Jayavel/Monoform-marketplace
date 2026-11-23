import React from 'react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrdersCount: number;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  recentOrdersCount
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="presentation"
      data-testid="account-modal"
    >
      <div
        className="modal-card account-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="account-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-header-titles">
            <span className="section-eyebrow">Studio Patron</span>
            <h2 id="account-modal-title" className="modal-title">
              Studio Account Profile
            </h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Profile"
            data-testid="close-account-btn"
          >
            &times;
          </button>
        </div>

        <div className="account-details-body">
          <div className="account-patron-card">
            <div className="patron-avatar" aria-hidden="true">K</div>
            <div className="patron-info">
              <h3 className="patron-name">Kishore</h3>
              <span className="patron-tier">Studio Guild Member &bull; Tier 01</span>
              <span className="patron-id numeric">Patron ID: #MONO-2026-IND</span>
            </div>
          </div>

          <div className="account-sections">
            <div className="account-metric-row">
              <div className="metric-box">
                <span className="metric-num numeric">{recentOrdersCount}</span>
                <span className="metric-label">Completed Orders</span>
              </div>
              <div className="metric-box">
                <span className="metric-num numeric">₹0.00</span>
                <span className="metric-label">Studio Credits</span>
              </div>
              <div className="metric-box">
                <span className="metric-num">Complimentary</span>
                <span className="metric-label">Dispatch Status</span>
              </div>
            </div>

            <div className="account-info-box">
              <h4 className="info-heading">Default Delivery Allocation</h4>
              <p className="info-text">
                Coimbatore, Peelamedu, Avinashi Road, Coimbatore, Tamil Nadu &mdash; 641032
              </p>
            </div>

            <div className="account-disclaimer">
              <span className="info-bullet">&bull;</span>
              <span>Synthetic Patron Profile for FYND SDET Internship Hackathon Evaluation.</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-modal-back"
            onClick={onClose}
          >
            Close Account
          </button>
        </div>
      </div>
    </div>
  );
};
