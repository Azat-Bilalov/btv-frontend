import React from 'react';
import 'leaflet/dist/leaflet.css';
import MapWidget from '@/widgets/map';
import { MapStoreProvider } from '@/features/map/model';

export const HomePage: React.FC = () => {
  return (
    <>
      <MapStoreProvider>
        <MapWidget />
      </MapStoreProvider>
    </>
  );
};
