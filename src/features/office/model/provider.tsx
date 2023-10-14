import React from 'react';
import OfficeStore from './store';
import { useLocalStore } from '@/shared/lib/hooks';

export const OfficeStoreContext = React.createContext<OfficeStore | null>(null);

export type OfficeStoreProviderProps = {
  children: React.ReactNode;
};

export const OfficeStoreProvider = ({ children }: OfficeStoreProviderProps) => {
  const officeStore = useLocalStore(() => new OfficeStore());

  return (
    <OfficeStoreContext.Provider value={officeStore}>
      {children}
    </OfficeStoreContext.Provider>
  );
};
