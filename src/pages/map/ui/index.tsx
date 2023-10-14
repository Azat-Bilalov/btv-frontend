import React from 'react';
import { MapStoreProvider } from '@/features/map/model';
import MapWidget from '@/widgets/map';
import { AtmStoreProvider } from '@/features/atm/model/provider';

export const Map: React.FC = () => {
  // const [isInfoVisible, setIsInfoVisible] = useState(false);

  // const openInfo = () => {
  //   console.log('open Info');
  //   setIsInfoVisible(true);
  // };

  // const closeInfo = () => {
  //   setIsInfoVisible(false);
  // };

  return (
    <MapStoreProvider>
      <AtmStoreProvider>
        <MapWidget />
        {/* <button onClick={openInfo}>Инфа приди</button>
        <BankInfo isVisible={isInfoVisible} onClose={closeInfo} /> */}
      </AtmStoreProvider>
    </MapStoreProvider>
  );
};
