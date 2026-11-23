import React from 'react';
import { OrderDetails } from '../types';
import { formatRupees } from '../utils/currency';

interface OrderConfirmationProps {
  order: OrderDetails;
  onResetOrder: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order, onResetOrder }) => {
  return (
    <div
      className="order-confirmation-container"
      data-testid="order-confirmation"
      role="status"
      aria-label="Order Confirmation"
    >
      <div className="confirmation-card">
        <div className="confirmation-stamp">
          <div className="stamp-ring">
            <span className="stamp-icon" aria-hidden="true">&check;</span>
          </div>
          <span className="stamp-text">STUDIO ACQUIRED &bull; VERIFIED 2026</span>
        </div>

        <div className="confirmation-header">
          <h2 className="confirmation-title">Order Confirmed</h2>
          <p className="confirmation-message">
            Thank you, <strong data-testid="confirmed-customer-name">{order.customerName}</strong>. Your archival pieces have been cataloged and reserved for studio dispatch.
          </p>
        </div>

        <div className="confirmation-details-box">
          <div className="detail-row">
            <span className="detail-label">Order Reference</span>
            <span className="detail-value reference-code" data-testid="confirmed-order-reference">
              {order.orderReference}
            </span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Patron Name</span>
            <span className="detail-value">{order.customerName}</span>
          </div>

          {order.deliveryAddress && (
            <div className="detail-row">
              <span className="detail-label">Delivery Destination</span>
              <span className="detail-value" data-testid="confirmed-delivery-address">
                {order.deliveryAddress.addressLine1}, {order.deliveryAddress.city}, {order.deliveryAddress.state} &mdash; {order.deliveryAddress.pinCode}
              </span>
            </div>
          )}

          {order.deliveryOption && (
            <div className="detail-row">
              <span className="detail-label">Dispatch Method</span>
              <span className="detail-value" data-testid="confirmed-delivery-option">
                {order.deliveryOption.name} ({order.deliveryOption.estimatedDelivery})
              </span>
            </div>
          )}

          {order.paymentMethod && (
            <div className="detail-row">
              <span className="detail-label">Simulated Payment</span>
              <span className="detail-value" data-testid="confirmed-payment-method">
                {order.paymentMethod === 'upi' ? 'UPI / QR Checkout' : order.paymentMethod === 'card' ? 'Debit/Credit Card' : 'Cash on Delivery'}
              </span>
            </div>
          )}

          <div className="detail-row">
            <span className="detail-label">Timestamp</span>
            <span className="detail-value numeric">{order.timestamp}</span>
          </div>

          <div className="detail-row total-highlight-row">
            <span className="detail-label total-label">Final Order Total</span>
            <span className="detail-value total-val numeric" data-testid="confirmed-order-total">
              {formatRupees(order.totalPaise)}
            </span>
          </div>
        </div>

        <div className="confirmation-items-summary">
          <h4 className="summary-heading">Items in this Studio Acquisition</h4>
          <ul className="confirmed-items-list" data-testid="confirmed-items-list">
            {order.items.map((item) => (
              <li key={item.product.id} className="confirmed-item-row">
                <span className="item-name">{item.product.name} &times; {item.quantity}</span>
                <span className="item-price numeric">
                  {formatRupees(item.product.pricePaise * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="confirmation-footer">
          <p className="notice-footnote">
            Notice: Order reference <code>{order.orderReference}</code> is a client-side demonstration identifier for hackathon evaluation.
          </p>
          <button
            type="button"
            className="btn-new-order"
            onClick={onResetOrder}
            data-testid="start-new-order-button"
          >
            Continue Shopping &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
