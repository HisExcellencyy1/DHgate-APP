import React, { createContext, ReactNode, useContext, useState } from 'react';

interface PaymentMethod {
  id: string;
  type: 'mobile_money' | 'card' | 'bank_transfer';
  name: string;
  details: string;
}

interface PaymentState {
  selectedMethod: PaymentMethod | null;
  isProcessing: boolean;
  error: string | null;
}

interface PaymentContextType extends PaymentState {
  setPaymentMethod: (method: PaymentMethod) => void;
  processPayment: (amount: number) => Promise<boolean>;
  resetPayment: () => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PaymentState>({
    selectedMethod: null,
    isProcessing: false,
    error: null,
  });

  const setPaymentMethod = (method: PaymentMethod) => {
    setState(prev => ({ ...prev, selectedMethod: method, error: null }));
  };

  const processPayment = async (amount: number): Promise<boolean> => {
    if (!state.selectedMethod) {
      setState(prev => ({ ...prev, error: 'Please select a payment method' }));
      return false;
    }

    setState(prev => ({ ...prev, isProcessing: true, error: null }));

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically make an API call to your payment processor
      // For demo purposes, we'll just return success
      setState(prev => ({ ...prev, isProcessing: false }));
      return true;
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isProcessing: false, 
        error: 'Payment failed. Please try again.' 
      }));
      return false;
    }
  };

  const resetPayment = () => {
    setState({
      selectedMethod: null,
      isProcessing: false,
      error: null,
    });
  };

  return (
    <PaymentContext.Provider
      value={{
        ...state,
        setPaymentMethod,
        processPayment,
        resetPayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
}; 