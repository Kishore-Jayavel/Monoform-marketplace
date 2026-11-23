import React, { useState, useRef, useEffect } from 'react';
import {
  FormErrors,
  CheckoutStep,
  DeliveryAddress,
  DeliveryOption,
  PaymentMethod,
  CartItemType,
  UserProfile
} from '../types';
import { DELIVERY_OPTIONS } from '../data/products';
import { formatRupees } from '../utils/currency';
import { ValidationMessage } from './ValidationMessage';

interface CheckoutFormProps {
  isCartEmpty: boolean;
  items: CartItemType[];
  subtotalPaise: number;
  deliveryOption: DeliveryOption;
  onSelectDeliveryOption: (option: DeliveryOption) => void;
  onPlaceOrder: (details: {
    customerName: string;
    deliveryAddress: DeliveryAddress;
    deliveryOption: DeliveryOption;
    paymentMethod: PaymentMethod;
  }) => void;
  isOrderPlaced: boolean;
  currentStep: CheckoutStep;
  onStepChange: (step: CheckoutStep) => void;
  user?: UserProfile | null;
  onOpenSignIn?: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  isCartEmpty,
  items,
  subtotalPaise,
  deliveryOption,
  onSelectDeliveryOption,
  onPlaceOrder,
  isOrderPlaced,
  currentStep,
  onStepChange,
  user,
  onOpenSignIn
}) => {
  // Address & Customer State (Pre-filled with Kishore's details and placeholders)
  const [address, setAddress] = useState<DeliveryAddress>({
    fullName: '',
    mobile: '+91 9876543210',
    email: 'Kishore@example.com',
    addressLine1: 'Coimbatore',
    area: 'Peelamedu, Avinashi Road',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    pinCode: '641032'
  });

  useEffect(() => {
    if (user && user.address) {
      setAddress((prev) => ({
        ...user.address,
        fullName: user.name || prev.fullName
      }));
    }
  }, [user]);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Synchronous submission guard references to prevent double-clicks & race conditions
  const isSubmittingRef = useRef<boolean>(false);
  const isSubmittedRef = useRef<boolean>(false);

  const handleInputChange = (field: keyof DeliveryAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Validate step 2: Delivery address fields
  const validateAddress = (): boolean => {
    const errors: FormErrors = {};
    const trimmedName = address.fullName.trim();

    if (!address.fullName || trimmedName.length === 0) {
      errors.fullName = 'Full Name is required. Please provide your name to complete checkout.';
    }

    if (!address.mobile || address.mobile.trim().length < 10) {
      errors.mobile = 'Valid 10-digit mobile number required for dispatch notifications.';
    }

    if (!address.email || !address.email.includes('@')) {
      errors.email = 'Valid email address required for order receipts.';
    }

    if (!address.addressLine1 || address.addressLine1.trim().length === 0) {
      errors.addressLine1 = 'House/building address is required.';
    }

    if (!address.city || address.city.trim().length === 0) {
      errors.city = 'City is required.';
    }

    if (!address.state || address.state.trim().length === 0) {
      errors.state = 'State is required.';
    }

    if (!address.pinCode || address.pinCode.trim().length < 6) {
      errors.pinCode = 'Valid 6-digit postal PIN code required.';
    }

    if (isCartEmpty) {
      errors.cart = 'Your shopping bag is empty. Please select an item to purchase.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToDeliveryOptions = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAddress()) {
      onStepChange('options');
    }
  };

  const handleSubmitFinalOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // SYNCHRONOUS GUARD: Immediately reject if already processing, submitted, or complete
    if (isSubmittingRef.current || isSubmittedRef.current || isOrderPlaced) {
      return;
    }

    // Set synchronous guard immediately
    isSubmittingRef.current = true;

    // Validate full name and cart state
    const trimmedName = address.fullName.trim();
    const errors: FormErrors = {};

    if (!address.fullName || trimmedName.length === 0) {
      errors.fullName = 'Full Name is required. Please provide your name to complete checkout.';
    }

    if (isCartEmpty) {
      errors.cart = 'Your shopping bag is empty. Please select an item to purchase.';
    }

    if (Object.keys(errors).length > 0) {
      isSubmittingRef.current = false;
      setFormErrors(errors);
      return;
    }

    // Passed validation: clear errors and transition to processing
    setFormErrors({});
    setIsProcessing(true);
    isSubmittedRef.current = true;

    onPlaceOrder({
      customerName: trimmedName,
      deliveryAddress: { ...address, fullName: trimmedName },
      deliveryOption,
      paymentMethod
    });

    setIsProcessing(false);
  };

  const isButtonDisabled = isProcessing || isOrderPlaced;
  const finalTotalPaise = subtotalPaise + deliveryOption.pricePaise;

  return (
    <div className="checkout-stepper-container" data-testid="checkout-form">
      {/* Step View Switcher */}
      {currentStep === 'cart' && (
        <div className="step-panel step-cart-review" data-testid="step-cart-panel">
          <div className="step-panel-header">
            <h3 className="section-heading">Bag Review</h3>
            <span className="section-note">{items.reduce((s, i) => s + i.quantity, 0)} Archival Pieces Selected</span>
          </div>

          <p className="step-instructions">
            Review your curated selection below. Modify quantities or remove items before proceeding to studio delivery allocation.
          </p>

          {isCartEmpty && (
            <div className="cart-error-wrapper">
              <ValidationMessage id="cart-empty-error" message={formErrors.cart} testId="cart-error-message" />
            </div>
          )}

          <div className="step-actions">
            <button
              type="button"
              className="btn-next-step"
              onClick={() => {
                if (isCartEmpty) {
                  setFormErrors({ cart: 'Your shopping bag is empty. Please select an item to purchase.' });
                } else {
                  setFormErrors({});
                  onStepChange('delivery');
                }
              }}
              data-testid="proceed-to-delivery-btn"
            >
              Continue to Delivery Information &rarr;
            </button>
          </div>
        </div>
      )}

      {currentStep === 'delivery' && (
        <form className="step-panel step-delivery-form" onSubmit={handleSubmitFinalOrder} noValidate data-testid="step-delivery-panel">
          <div className="step-panel-header">
            <h3 className="section-heading">Delivery Address</h3>
            <span className="section-note">Studio Dispatch Coordinates</span>
          </div>

          {user ? (
            <div className="signed-in-autofill-banner" data-testid="user-autofill-banner">
              <span className="autofill-icon" aria-hidden="true">&#10003;</span>
              <span className="autofill-text">
                Signed in as <strong>{user.name}</strong> &bull; Studio dispatch coordinates loaded
              </span>
            </div>
          ) : (
            onOpenSignIn && (
              <div className="signin-prompt-banner">
                <span className="prompt-text">Have a Studio Account?</span>
                <button
                  type="button"
                  className="btn-signin-prompt"
                  onClick={onOpenSignIn}
                  data-testid="checkout-signin-prompt-btn"
                >
                  Sign in for 1-click address autofill &rarr;
                </button>
              </div>
            )
          )}

          {/* Customer Full Name */}
          <div className="form-group">
            <label htmlFor="customer-name" className="form-label">
              Full Name <span className="required-star" aria-hidden="true">*</span>
            </label>
            <input
              id="customer-name"
              name="customerName"
              type="text"
              className={`form-input ${formErrors.fullName ? 'input-error' : ''}`}
              placeholder="e.g. Kishore"
              value={address.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              disabled={isOrderPlaced}
              aria-required="true"
              aria-invalid={Boolean(formErrors.fullName)}
              aria-describedby={formErrors.fullName ? 'full-name-error' : undefined}
              data-testid="customer-name-input"
              autoComplete="name"
            />
            <ValidationMessage id="full-name-error" message={formErrors.fullName} testId="name-error-message" />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="customer-mobile" className="form-label">
                Mobile Number <span className="required-star" aria-hidden="true">*</span>
              </label>
              <input
                id="customer-mobile"
                name="mobile"
                type="tel"
                placeholder="+91 9876543210"
                className={`form-input ${formErrors.mobile ? 'input-error' : ''}`}
                value={address.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                data-testid="customer-mobile-input"
              />
              <ValidationMessage message={formErrors.mobile} testId="mobile-error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="customer-email" className="form-label">
                Email Address <span className="required-star" aria-hidden="true">*</span>
              </label>
              <input
                id="customer-email"
                name="email"
                type="email"
                placeholder="Kishore@example.com"
                className={`form-input ${formErrors.email ? 'input-error' : ''}`}
                value={address.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                data-testid="customer-email-input"
              />
              <ValidationMessage message={formErrors.email} testId="email-error-message" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="customer-address1" className="form-label">
              Flat / House / Building Address <span className="required-star" aria-hidden="true">*</span>
            </label>
            <input
              id="customer-address1"
              name="addressLine1"
              type="text"
              placeholder="Coimbatore"
              className={`form-input ${formErrors.addressLine1 ? 'input-error' : ''}`}
              value={address.addressLine1}
              onChange={(e) => handleInputChange('addressLine1', e.target.value)}
              data-testid="customer-address1-input"
            />
            <ValidationMessage message={formErrors.addressLine1} testId="address1-error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="customer-area" className="form-label">
              Street / Area / Landmark
            </label>
            <input
              id="customer-area"
              name="area"
              type="text"
              placeholder="e.g. Peelamedu, Avinashi Road"
              className="form-input"
              value={address.area}
              onChange={(e) => handleInputChange('area', e.target.value)}
              data-testid="customer-area-input"
            />
          </div>

          <div className="form-row-3">
            <div className="form-group">
              <label htmlFor="customer-city" className="form-label">City *</label>
              <input
                id="customer-city"
                name="city"
                type="text"
                placeholder="Coimbatore"
                className={`form-input ${formErrors.city ? 'input-error' : ''}`}
                value={address.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                data-testid="customer-city-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="customer-state" className="form-label">State *</label>
              <input
                id="customer-state"
                name="state"
                type="text"
                placeholder="Tamil Nadu"
                className={`form-input ${formErrors.state ? 'input-error' : ''}`}
                value={address.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                data-testid="customer-state-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="customer-pin" className="form-label">PIN Code *</label>
              <input
                id="customer-pin"
                name="pinCode"
                type="text"
                placeholder="641032"
                className={`form-input ${formErrors.pinCode ? 'input-error' : ''}`}
                value={address.pinCode}
                onChange={(e) => handleInputChange('pinCode', e.target.value)}
                data-testid="customer-pin-input"
              />
            </div>
          </div>

          {formErrors.cart && (
            <div className="cart-error-wrapper">
              <ValidationMessage id="cart-empty-error" message={formErrors.cart} testId="cart-error-message" />
            </div>
          )}

          <div className="step-actions delivery-step-actions">
            <button
              type="button"
              className="btn-next-step"
              onClick={handleProceedToDeliveryOptions}
              data-testid="proceed-to-options-btn"
            >
              Advance to Options &rarr;
            </button>
            <button
              type="submit"
              className="btn-place-order"
              disabled={isButtonDisabled}
              data-testid="place-order-button"
              aria-label={isProcessing ? 'Processing Order...' : 'Place Order'}
            >
              {isProcessing ? 'Processing...' : isOrderPlaced ? 'Order Confirmed' : 'Place Order'}
            </button>
          </div>
        </form>
      )}

      {currentStep === 'options' && (
        <div className="step-panel step-options-panel" data-testid="step-options-panel">
          <div className="step-panel-header">
            <h3 className="section-heading">Dispatch Speed</h3>
            <span className="section-note">Select Delivery Option</span>
          </div>

          <div className="delivery-options-list" role="radiogroup" aria-label="Dispatch Speed Options">
            {DELIVERY_OPTIONS.map((opt) => {
              const isSelected = deliveryOption.id === opt.id;
              return (
                <label
                  key={opt.id}
                  className={`delivery-option-card ${isSelected ? 'selected' : ''}`}
                  htmlFor={`delivery-opt-${opt.id}`}
                >
                  <input
                    id={`delivery-opt-${opt.id}`}
                    type="radio"
                    name="deliverySpeed"
                    checked={isSelected}
                    onChange={() => onSelectDeliveryOption(opt)}
                    data-testid={`delivery-option-${opt.id}`}
                  />
                  <div className="option-info">
                    <div className="option-title-row">
                      <span className="option-name">{opt.name}</span>
                      <span className="option-price numeric">
                        {opt.pricePaise === 0 ? 'Complimentary' : formatRupees(opt.pricePaise)}
                      </span>
                    </div>
                    <span className="option-eta">{opt.estimatedDelivery}</span>
                    <p className="option-desc">{opt.description}</p>
                  </div>
                </label>
              );
            })}
          </div>

          <div className="step-actions">
            <button
              type="button"
              className="btn-back-step"
              onClick={() => onStepChange('delivery')}
              data-testid="back-to-delivery-btn"
            >
              &larr; Edit Address
            </button>
            <button
              type="button"
              className="btn-next-step"
              onClick={() => onStepChange('payment')}
              data-testid="proceed-to-payment-btn"
            >
              Continue to Payment Method &rarr;
            </button>
          </div>
        </div>
      )}

      {currentStep === 'payment' && (
        <div className="step-panel step-payment-panel" data-testid="step-payment-panel">
          <div className="step-panel-header">
            <h3 className="section-heading">Payment Selection</h3>
            <span className="section-note">Simulated Studio Checkout</span>
          </div>

          <div className="demo-payment-alert">
            <span className="alert-badge">&bull; DEMO ONLY</span>
            <p className="alert-text">
              Demonstration checkout interface. No real financial credentials, UPI PINs, or card transactions will be initiated.
            </p>
          </div>

          <div className="payment-options-list" role="radiogroup" aria-label="Simulated Payment Methods">
            <label className={`payment-card ${paymentMethod === 'upi' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={() => setPaymentMethod('upi')}
                data-testid="payment-option-upi"
              />
              <div className="payment-info">
                <span className="payment-name">UPI &bull; Instant Studio QR</span>
                <span className="payment-desc">Google Pay, PhonePe, BHIM or any virtual UPI ID</span>
              </div>
            </label>

            <label className={`payment-card ${paymentMethod === 'card' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                data-testid="payment-option-card"
              />
              <div className="payment-info">
                <span className="payment-name">Credit &bull; Debit Card</span>
                <span className="payment-desc">Simulated Visa, Mastercard, RuPay &amp; Amex clearing</span>
              </div>
            </label>

            <label className={`payment-card ${paymentMethod === 'cod' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                data-testid="payment-option-cod"
              />
              <div className="payment-info">
                <span className="payment-name">Cash on Studio Delivery</span>
                <span className="payment-desc">Settle balance upon hand-delivery of archival goods</span>
              </div>
            </label>
          </div>

          <div className="step-actions">
            <button
              type="button"
              className="btn-back-step"
              onClick={() => onStepChange('options')}
              data-testid="back-to-options-btn"
            >
              &larr; Edit Dispatch Speed
            </button>
            <button
              type="button"
              className="btn-next-step"
              onClick={() => onStepChange('review')}
              data-testid="proceed-to-review-btn"
            >
              Continue to Final Review &rarr;
            </button>
          </div>
        </div>
      )}

      {currentStep === 'review' && (
        <div className="step-panel step-review-panel" data-testid="step-review-panel">
          <div className="step-panel-header">
            <h3 className="section-heading">Final Order Review</h3>
            <span className="section-note">Verify Details Before Placement</span>
          </div>

          <div className="review-summary-sections">
            {/* Delivery Details Block */}
            <div className="review-block" data-testid="review-delivery-block">
              <div className="block-header">
                <h4 className="block-title">Dispatch Address</h4>
                <button
                  type="button"
                  className="btn-edit-block"
                  onClick={() => onStepChange('delivery')}
                  data-testid="edit-delivery-btn"
                >
                  Edit
                </button>
              </div>
              <p className="block-content" data-testid="review-address-text">
                <strong>{address.fullName || 'Patron'}</strong> ({address.mobile})<br />
                {address.addressLine1}, {address.area ? `${address.area}, ` : ''}{address.city}, {address.state} &mdash; {address.pinCode}
              </p>
            </div>

            {/* Delivery Option Block */}
            <div className="review-block" data-testid="review-dispatch-block">
              <div className="block-header">
                <h4 className="block-title">Dispatch Method</h4>
                <button
                  type="button"
                  className="btn-edit-block"
                  onClick={() => onStepChange('options')}
                  data-testid="edit-options-btn"
                >
                  Edit
                </button>
              </div>
              <p className="block-content" data-testid="review-dispatch-text">
                {deliveryOption.name} &bull; {deliveryOption.estimatedDelivery} (
                {deliveryOption.pricePaise === 0 ? 'Complimentary' : formatRupees(deliveryOption.pricePaise)})
              </p>
            </div>

            {/* Payment Method Block */}
            <div className="review-block" data-testid="review-payment-block">
              <div className="block-header">
                <h4 className="block-title">Payment Method</h4>
                <button
                  type="button"
                  className="btn-edit-block"
                  onClick={() => onStepChange('payment')}
                  data-testid="edit-payment-btn"
                >
                  Edit
                </button>
              </div>
              <p className="block-content" data-testid="review-payment-text">
                {paymentMethod === 'upi' ? 'UPI / QR Checkout' : paymentMethod === 'card' ? 'Credit / Debit Card' : 'Cash on Delivery'}
              </p>
            </div>

            {/* Selected Items Breakdown */}
            <div className="review-block" data-testid="review-items-block">
              <div className="block-header">
                <h4 className="block-title">Curated Items ({items.reduce((s, i) => s + i.quantity, 0)})</h4>
                <button
                  type="button"
                  className="btn-edit-block"
                  onClick={() => onStepChange('cart')}
                  data-testid="edit-cart-btn"
                >
                  Edit Bag
                </button>
              </div>
              <ul className="review-items-list" data-testid="review-items-list">
                {items.map((item) => (
                  <li key={item.product.id} className="review-item-row" data-testid={`review-item-${item.product.id}`}>
                    <span className="item-qty-name">{item.product.name} &times; {item.quantity}</span>
                    <span className="item-price numeric">{formatRupees(item.product.pricePaise * item.quantity)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="step-actions">
            <button
              type="button"
              className="btn-back-step"
              onClick={() => onStepChange('payment')}
              data-testid="back-to-payment-btn"
            >
              &larr; Back to Payment
            </button>
            <button
              type="button"
              className="btn-place-order"
              onClick={handleSubmitFinalOrder}
              disabled={isButtonDisabled}
              data-testid="place-order-button"
              aria-label={isProcessing ? 'Processing Order...' : 'Place Order'}
            >
              {isProcessing ? 'Processing Studio Order...' : isOrderPlaced ? 'Order Confirmed' : `Place Order • ${formatRupees(finalTotalPaise)}`}
            </button>
          </div>
        </div>
      )}

      <p className="checkout-disclaimer">
        Editorial marketplace demonstration. No real financial transaction will occur.
      </p>
    </div>
  );
};
