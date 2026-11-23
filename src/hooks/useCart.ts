import { useState, useCallback, useMemo } from 'react';
import { Product, CartItemType } from '../types';
import { calculateOrderTotal } from '../utils/currency';

export function useCart(initialItems: CartItemType[] = []) {
  const [items, setItems] = useState<CartItemType[]>(initialItems);

  // Add product to cart (or increment if already exists)
  const addToCart = useCallback((product: Product) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        return prevItems.map((item, index) =>
          index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  }, []);

  // Increase quantity of a product
  const increaseQuantity = useCallback((productId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  // Decrease quantity of a product (removes if reaches 0)
  const decreaseQuantity = useCallback((productId: string) => {
    setItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.product.id === productId) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  }, []);

  // Remove product completely from cart
  const removeFromCart = useCallback((productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  }, []);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Calculate total in paise
  const totalPaise = useMemo(() => {
    return calculateOrderTotal(
      items.map((item) => ({
        pricePaise: item.product.pricePaise,
        quantity: item.quantity
      }))
    );
  }, [items]);

  // Total quantity of items in cart
  const totalItemCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  return {
    items,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalPaise,
    totalItemCount,
    isEmpty: items.length === 0
  };
}
