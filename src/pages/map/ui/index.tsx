import React from 'react';
import { MapStoreProvider } from '@/features/map/model';
import MapWidget from '@/widgets/map';
import { AtmStoreProvider } from '@/features/atm/model/provider';
import InfoMobileWidget from '@/widgets/info-mobile';
import { OfficeStoreProvider } from '@/features/office/model';
import { OfficeInfo } from '@/features/office/ui';

export const Map: React.FC = () => {
  return (
    <MapStoreProvider>
      <AtmStoreProvider>
        <OfficeStoreProvider>
          <MapWidget />
          {/* <button onClick={openInfo}>Инфа приди</button>*/}
          {/* <BankInfo isVisible={isInfoVisible} onClose={closeInfo} /> */}
          <InfoMobileWidget>
            <OfficeInfo />
          </InfoMobileWidget>
        </OfficeStoreProvider>
      </AtmStoreProvider>
    </MapStoreProvider>
  );
};
