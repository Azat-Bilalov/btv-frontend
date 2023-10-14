import styles from './index.module.scss'
import Metro from '@/assets/metro.svg';
import { Button } from '@/shared/ui/button';
import { ButtonSize, ButtonType } from '@/shared/ui/button/types';
import { Switch } from '@/shared/ui/switch';
import { TimeList } from '@/shared/ui/timelist';
import { InvalidHelp } from '@/shared/ui/invalidHelp';
import { useState } from 'react';
import { useOfficeStore } from '../../model';
import { useMapStore } from '@/features/map/model';
import React from 'react';
import { observer } from 'mobx-react-lite';

export type InfoProps = {
  // onClose: () => void;
  // isVisible: boolean;
};

const OfficeInfo: React.FC<InfoProps> = () => {
  const [isSwitchedOn, setIsSwitchedOn] = useState(false);
  const handleSwitchChange = (newSwitchState: boolean) => {
    setIsSwitchedOn(newSwitchState);
  };

  const { selected, selectedType } = useMapStore();
  const { office, fetchOffice } = useOfficeStore();

  React.useEffect(() => {
    if (selected) {
      if (selectedType === 'office') {
        fetchOffice(selected._id);
      }
    }
  }, [selected, fetchOffice]);

  if (selectedType !== 'office') return null;

  return (
    <div
      className={styles.bankInfo}
      // style={{ transform: `translateX(${isVisible ? 0 : '100%'})` }}
    >
      <div className={styles.bankInfoTop}>
        {/* <div className={styles.topClose}>
          <img src={Cross} onClick={onClose} />
        </div> */}
      </div>

      <div className={styles.bankInfoAddress}>{office?.address}</div>
      <div className={styles.bankInfoSwitch}>
        <Switch onSwitchChange={handleSwitchChange} />
      </div>
      <div className={styles.bankInfoOpentime}>
        <TimeList
          phislist={office?.openHoursIndividual}
          urlist={office?.openHours}
          isSwitchedOn={isSwitchedOn}
        />
      </div>
      {office?.metroStation && (
        <div className={styles.bankInfoMetro}>
          <img src={Metro} />
          {office?.metroStation}
        </div>
      )}

      {office?.hasRamp && <InvalidHelp />}

      <div className={styles.bankButtons}>
        <Button type={ButtonType.Primary} size={ButtonSize.Small}>
          Проложить путь
        </Button>
        <Button type={ButtonType.Secondary} size={ButtonSize.Small}>
          Занять очередь
        </Button>
      </div>
    </div>
  );
};

export default observer(OfficeInfo);
