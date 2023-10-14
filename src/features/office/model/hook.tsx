import React from 'react';
import { OfficeStoreContext } from './provider';

export const useOfficeStore = () => {
  const context = React.useContext(OfficeStoreContext);
  if (context === null) {
    throw new Error('useOfficeStore must be used within a OfficeStoreProvider');
  }
  return context;
};
