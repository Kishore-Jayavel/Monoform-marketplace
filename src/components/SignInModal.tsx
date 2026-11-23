import React, { useState } from 'react';
import { UserProfile } from '../types';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (user: UserProfile) => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onSignIn }) => {
  const [identifier, setIdentifier] = useState('Kishore@example.com');
  const [password, setPassword] = useState('••••••••');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStandardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please enter your email or mobile phone number.');
      return;
    }
    setError(null);
    // Sign in user
    onSignIn({
      name: 'Kishore',
      email: identifier.includes('@') ? identifier : 'Kishore@example.com',
      phone: '+91 9876543210',
      address: {
        fullName: 'Kishore',
        mobile: '+91 9876543210',
        email: identifier.includes('@') ? identifier : 'Kishore@example.com',
        addressLine1: 'Coimbatore',
        area: 'Peelamedu, Avinashi Road',
        city: 'Coimbatore',
        state: 'Tamil Nadu',
        pinCode: '641032'
      }
    });
    onClose();
  };

  const handleQuickDemoSignIn = () => {
    onSignIn({
      name: 'Kishore',
      email: 'Kishore@example.com',
      phone: '+91 9876543210',
      address: {
        fullName: 'Kishore',
        mobile: '+91 9876543210',
        email: 'Kishore@example.com',
        addressLine1: 'Coimbatore',
        area: 'Peelamedu, Avinashi Road',
        city: 'Coimbatore',
        state: 'Tamil Nadu',
        pinCode: '641032'
      }
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="signin-modal-title">
      <div className="signin-modal-container" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="btn-modal-close" onClick={onClose} aria-label="Close Sign In Dialog">
          &times;
        </button>

        <div className="signin-header">
          <div className="signin-brand-mark">MONOFORM</div>
          <h2 id="signin-modal-title" className="signin-title">Sign in to your Studio Account</h2>
          <p className="signin-subtitle">Access your orders, saved wishlist, and faster 1-click checkout.</p>
        </div>

        {error && (
          <div className="signin-error-alert" role="alert">
            <span className="error-icon" aria-hidden="true">&#9888;</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleStandardSubmit} className="signin-form">
          <div className="form-group">
            <label htmlFor="signin-identifier" className="form-label">
              Email or mobile phone number
            </label>
            <input
              id="signin-identifier"
              type="text"
              className="form-input"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. patron@studio.monoform.in"
              required
              data-testid="signin-identifier-input"
            />
          </div>

          <div className="form-group">
            <div className="label-with-link">
              <label htmlFor="signin-password" className="form-label">
                Password
              </label>
              <button type="button" className="link-forgot-password" onClick={() => alert('Demo password reset link simulated.')}>
                Forgot Password?
              </button>
            </div>
            <input
              id="signin-password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              data-testid="signin-password-input"
            />
          </div>

          <button type="submit" className="btn-signin-primary" data-testid="signin-submit-btn">
            Sign In
          </button>

          <div className="signin-divider">
            <span>or use demo credentials</span>
          </div>

          <button
            type="button"
            className="btn-signin-demo"
            onClick={handleQuickDemoSignIn}
            data-testid="quick-demo-signin-btn"
          >
            <span className="demo-badge">1-Click</span> Sign In as Kishore (Demo Patron)
          </button>
        </form>

        <div className="signin-terms-note">
          By signing in, you agree to MONOFORM's <em>Conditions of Use &amp; Studio Sale</em> and <em>Privacy Notice</em>.
        </div>
      </div>
    </div>
  );
};
