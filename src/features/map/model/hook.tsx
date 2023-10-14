import React from 'react';
import { MapStoreContext } from './provider';

export const useMapStore = () => {
  const context = React.useContext(MapStoreContext);
  if (context === null) {
    throw new Error('useMapStore must be used within a MapStoreProvider');
  }
  return context;
};
