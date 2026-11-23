import React from 'react';
import { formatRupees } from '../utils/currency';
import { CartItemType, DeliveryOption } from '../types';

interface OrderSummaryProps {
  items: CartItemType[];
  subtotalPaise: number;
  deliveryOption: DeliveryOption;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotalPaise,
  deliveryOption
}) => {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalDuePaise = subtotalPaise + deliveryOption.pricePaise;

  return (
    <section className="order-summary-card" aria-label="Order Summary">
      <div className="summary-header">
        <h3 className="summary-title">Order Summary</h3>
        <span className="summary-count">
          {itemCount} {itemCount === 1 ? 'object' : 'objects'}
        </span>
      </div>

      <div className="summary-breakdown">
        <div className="summary-row">
          <span className="summary-label">Items Subtotal</span>
          <span className="summary-value numeric" data-testid="summary-subtotal">
            {formatRupees(subtotalPaise)}
          </span>
        </div>

        <div className="summary-row">
          <span className="summary-label">
            Studio Dispatch ({deliveryOption.name.includes('Express') ? 'Express' : 'Standard'})
          </span>
          <span className="summary-value numeric" data-testid="summary-delivery-charge">
            {deliveryOption.pricePaise === 0 ? 'Complimentary' : formatRupees(deliveryOption.pricePaise)}
          </span>
        </div>

        <div className="summary-row">
          <span className="summary-label">Estimated Tax (GST included)</span>
          <span className="summary-value numeric">₹0.00</span>
        </div>
      </div>

      <div className="order-total-region" aria-live="polite">
        <div className="total-label-group">
          <span className="total-heading">Total Due</span>
          <span className="total-currency-note">INR (All taxes included)</span>
        </div>
        <div
          className="order-total-amount numeric"
          data-testid="order-total"
          aria-label={`Total amount: ${formatRupees(totalDuePaise)}`}
        >
          {formatRupees(totalDuePaise)}
        </div>
      </div>
    </section>
  );
};
