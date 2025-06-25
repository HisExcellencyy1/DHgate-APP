import React from 'react';
import { CartProvider } from './context/CartContext';
import { DeliveryProvider } from './context/DeliveryContext';
import { PaymentProvider } from './context/PaymentContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <PaymentProvider>
        <DeliveryProvider>
          {children}
        </DeliveryProvider>
      </PaymentProvider>
    </CartProvider>
  );
} 