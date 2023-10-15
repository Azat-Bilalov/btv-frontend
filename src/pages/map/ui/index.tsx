import React from 'react';
import { MapStoreProvider } from '@/features/map/model';
import MapWidget from '@/widgets/map';
import { AtmStoreProvider } from '@/features/atm/model/provider';
import InfoMobileWidget from '@/widgets/info-mobile';
import { OfficeStoreProvider } from '@/features/office/model';
import ClosestInfo from '@/widgets/closest-info';
import { QueueStoreProvider } from '@/entities/queue/model';

export const Map: React.FC = () => {
  return (
    <MapStoreProvider>
      <AtmStoreProvider>
        <OfficeStoreProvider>
          <QueueStoreProvider>
            <MapWidget />
            <InfoMobileWidget />
            <ClosestInfo />
          </QueueStoreProvider>
        </OfficeStoreProvider>
      </AtmStoreProvider>
    </MapStoreProvider>
  );
};
