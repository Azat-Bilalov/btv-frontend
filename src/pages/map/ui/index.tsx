import React from 'react';
import { MapStoreProvider } from '@/features/map/model';
import MapWidget from '@/widgets/map';
import { AtmStoreProvider } from '@/features/atm/model/provider';
import InfoMobileWidget from '@/widgets/info-mobile';
import { OfficeStoreProvider } from '@/features/office/model';
import ClosestInfo from '@/widgets/closest-info';

export const Map: React.FC = () => {
  return (
    <MapStoreProvider>
      <AtmStoreProvider>
        <OfficeStoreProvider>
          <MapWidget />
          <InfoMobileWidget />
          <ClosestInfo />
        </OfficeStoreProvider>
      </AtmStoreProvider>
    </MapStoreProvider>
  );
};
