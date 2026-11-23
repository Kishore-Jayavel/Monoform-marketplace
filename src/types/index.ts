export type ProductCategory = 
  | 'All' 
  | 'Stationery' 
  | 'Drinkware' 
  | 'Desk Accessories' 
  | 'Lifestyle Essentials';

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  pricePaise: number; // Stored in integer paise (e.g. 49900 = ₹499.00)
  category: 'Stationery' | 'Drinkware' | 'Desk Accessories' | 'Lifestyle Essentials';
  tag: string;
  details: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  reviews: ProductReview[];
}

export interface CartItemType {
  product: Product;
  quantity: number;
}

export type DeliverySpeed = 'standard' | 'express';

export interface DeliveryOption {
  id: DeliverySpeed;
  name: string;
  pricePaise: number;
  estimatedDelivery: string;
  description: string;
}

export type PaymentMethod = 'upi' | 'card' | 'cod';

export interface DeliveryAddress {
  fullName: string;
  mobile: string;
  email: string;
  addressLine1: string;
  area: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface OrderDetails {
  orderReference: string;
  customerName: string;
  items: CartItemType[];
  subtotalPaise: number;
  deliveryChargePaise: number;
  totalPaise: number;
  timestamp: string;
  deliveryAddress?: DeliveryAddress;
  deliveryOption?: DeliveryOption;
  paymentMethod?: PaymentMethod;
}

export interface FormErrors {
  fullName?: string;
  mobile?: string;
  email?: string;
  addressLine1?: string;
  area?: string;
  city?: string;
  state?: string;
  pinCode?: string;
  cart?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: DeliveryAddress;
}

export type CheckoutStep = 'cart' | 'delivery' | 'options' | 'payment' | 'review' | 'confirmation';
