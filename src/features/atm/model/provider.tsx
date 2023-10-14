import React from 'react';
import AtmStore from './store';
import { useLocalStore } from '@/shared/lib/hooks';

export const AtmStoreContext = React.createContext<AtmStore | null>(null);

export type AtmStoreProviderProps = {
  children: React.ReactNode;
};

export const AtmStoreProvider = ({ children }: AtmStoreProviderProps) => {
  const atmStore = useLocalStore(() => new AtmStore());

  return (
    <AtmStoreContext.Provider value={atmStore}>
      {children}
    </AtmStoreContext.Provider>
  );
};
