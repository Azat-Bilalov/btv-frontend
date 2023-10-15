import React from 'react';
import { QueueStoreContext } from './provider';

export const useQueueStore = () => {
  const context = React.useContext(QueueStoreContext);
  if (context === null) {
    throw new Error('useMapStore must be used within a MapStoreProvider');
  }
  return context;
};
