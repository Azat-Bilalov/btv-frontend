import React from 'react';
import MapStore from './store';
import { useLocalStore } from '@/shared/lib/hooks';

export const MapStoreContext = React.createContext<MapStore | null>(null);

export type MapStoreProviderProps = {
  children: React.ReactNode;
};

export const MapStoreProvider = ({ children }: MapStoreProviderProps) => {
  const mapStore = useLocalStore(() => new MapStore());

  return (
    <MapStoreContext.Provider value={mapStore}>
      {children}
    </MapStoreContext.Provider>
  );
};
