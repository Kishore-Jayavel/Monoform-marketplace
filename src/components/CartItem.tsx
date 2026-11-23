import React from 'react';
import { CartItemType } from '../types';
import { formatRupees, calculateLineTotal } from '../utils/currency';

interface CartItemProps {
  item: CartItemType;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove
}) => {
  const lineTotalPaise = calculateLineTotal(item.product.pricePaise, item.quantity);

  return (
    <li
      className="cart-item"
      data-testid={`cart-item-${item.product.id}`}
      aria-label={`${item.product.name}, quantity ${item.quantity}`}
    >
      <div className="cart-item-header">
        <div className="cart-item-info">
          <h4 className="cart-item-name">{item.product.name}</h4>
          <span className="cart-item-unit-price numeric">
            Unit: {formatRupees(item.product.pricePaise)}
          </span>
        </div>

        <button
          type="button"
          className="btn-remove-item"
          onClick={() => onRemove(item.product.id)}
          aria-label={`Remove ${item.product.name} from cart`}
          data-testid={`remove-${item.product.id}`}
        >
          Remove
        </button>
      </div>

      <div className="cart-item-footer">
        <div className="quantity-controls" role="group" aria-label={`Quantity controls for ${item.product.name}`}>
          <button
            type="button"
            className="btn-qty"
            onClick={() => onDecrease(item.product.id)}
            aria-label={`Decrease ${item.product.name} quantity`}
            data-testid={`decrease-${item.product.id}`}
          >
            <span aria-hidden="true">−</span>
          </button>
          
          <span
            className="qty-display numeric"
            data-testid={`quantity-${item.product.id}`}
            aria-label={`Current quantity of ${item.product.name}: ${item.quantity}`}
          >
            {item.quantity}
          </span>

          <button
            type="button"
            className="btn-qty"
            onClick={() => onIncrease(item.product.id)}
            aria-label={`Increase ${item.product.name} quantity`}
            data-testid={`increase-${item.product.id}`}
          >
            <span aria-hidden="true">+</span>
          </button>
        </div>

        <div className="cart-item-total">
          <span className="line-total-label">Line Total:</span>
          <span
            className="line-total-value numeric"
            data-testid={`line-total-${item.product.id}`}
          >
            {formatRupees(lineTotalPaise)}
          </span>
        </div>
      </div>
    </li>
  );
};
