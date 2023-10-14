import React from 'react';
import { AtmStoreContext } from './provider';

export const useAtmStore = () => {
  const context = React.useContext(AtmStoreContext);
  if (context === null) {
    throw new Error('useAtmStore must be used within a AtmStoreProvider');
  }
  return context;
};
