import React, { createContext, useContext } from 'react';
import useUpsellData from '@/modules/upsell/hooks/useUpsellData';

// Create context
const UpsellContext = createContext();

// Custom hook to use the upsell context
export const useUpsellContext = () => {
  const context = useContext(UpsellContext);
  if (!context) {
    throw new Error('useUpsellContext must be used within an UpsellDataProvider');
  }
  return context;
};

// Provider component
const UpsellDataProvider = ({ children }) => {
  const upsellData = useUpsellData();
  
  return (
    <UpsellContext.Provider value={upsellData}>
      {children}
    </UpsellContext.Provider>
  );
};

export default UpsellDataProvider;