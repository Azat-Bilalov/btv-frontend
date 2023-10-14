import React from 'react';
import { MapStoreProvider } from '@/features/map/model';
import MapWidget from '@/widgets/map';
import { AtmStoreProvider } from '@/features/atm/model/provider';
import BankInfo from '@/widgets/bank-info';
import { OfficeStoreProvider } from '@/features/office/model';

export const Map: React.FC = () => {
  const [isInfoVisible, setIsInfoVisible] = React.useState(false);

  // const openInfo = () => {
  //   console.log('open Info');
  //   setIsInfoVisible(true);
  // };

  const closeInfo = () => {
    setIsInfoVisible(false);
  };

  return (
    <MapStoreProvider>
      <AtmStoreProvider>
        <OfficeStoreProvider>
          <MapWidget />
          {/* <button onClick={openInfo}>Инфа приди</button>*/}
          <BankInfo isVisible={isInfoVisible} onClose={closeInfo} />
        </OfficeStoreProvider>
      </AtmStoreProvider>
    </MapStoreProvider>
  );
};
