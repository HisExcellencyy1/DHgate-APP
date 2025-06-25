import React, { createContext, ReactNode, useContext, useState } from 'react';

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface DeliveryState {
  address: Address | null;
  selectedCountry: string;
  trackingNumber: string | null;
  deliveryStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | null;
  estimatedDelivery: string | null;
}

interface DeliveryContextType extends DeliveryState {
  setAddress: (address: Address) => void;
  setCountry: (country: string) => void;
  updateDeliveryStatus: (status: DeliveryState['deliveryStatus']) => void;
  generateTrackingNumber: () => void;
  resetDelivery: () => void;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

export const DeliveryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<DeliveryState>({
    address: null,
    selectedCountry: '',
    trackingNumber: null,
    deliveryStatus: null,
    estimatedDelivery: null,
  });

  const setAddress = (address: Address) => {
    setState(prev => ({ ...prev, address }));
  };

  const setCountry = (country: string) => {
    setState(prev => ({ ...prev, selectedCountry: country }));
  };

  const updateDeliveryStatus = (status: DeliveryState['deliveryStatus']) => {
    setState(prev => ({ ...prev, deliveryStatus: status }));
  };

  const generateTrackingNumber = () => {
    const tracking = 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + 7); // 7 days delivery estimate

    setState(prev => ({
      ...prev,
      trackingNumber: tracking,
      estimatedDelivery: estimatedDate.toISOString().split('T')[0],
      deliveryStatus: 'pending',
    }));
  };

  const resetDelivery = () => {
    setState({
      address: null,
      selectedCountry: '',
      trackingNumber: null,
      deliveryStatus: null,
      estimatedDelivery: null,
    });
  };

  return (
    <DeliveryContext.Provider
      value={{
        ...state,
        setAddress,
        setCountry,
        updateDeliveryStatus,
        generateTrackingNumber,
        resetDelivery,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDelivery = () => {
  const context = useContext(DeliveryContext);
  if (context === undefined) {
    throw new Error('useDelivery must be used within a DeliveryProvider');
  }
  return context;
}; 