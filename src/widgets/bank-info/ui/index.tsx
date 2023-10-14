import styles from './index.module.scss';
import Cross from '@/assets/cross.svg';
import Metro from '@/assets/metro.svg';
import { Button } from '@/shared/ui/button';
import { ButtonSize, ButtonType } from '@/shared/ui/button/types';
import React, { useState } from 'react';
import { Switch } from '@/shared/ui/switch';
import { TimeList } from '@/shared/ui/timelist';
import { InvalidHelp } from '@/shared/ui/invalidHelp';
import { useMapStore } from '@/features/map/model';
import { observer } from 'mobx-react-lite';
import { useAtmStore } from '@/features/atm/model/hook';

export type InfoProps = {
  onClose: () => void;
  isVisible: boolean;
};

const OfficeInfo: React.FC<InfoProps> = ({ onClose, isVisible }) => {
  const { selected } = useMapStore();
  const { atm, fetch } = useAtmStore();

  React.useEffect(() => {
    if (selected) {
      // если тип объекта не равен atm

      fetch(selected._id);
    }
  }, [selected, fetch]);

  React.useEffect(() => {
    if (atm) {
      console.log(atm);
    }
  }, [atm]);

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isVisible) {
        const popup = document.querySelector(styles.OfficeInfo);
        console.log(popup);

        if (popup && !popup.contains(event.target as Node)) {
          onClose();
        }
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isVisible, onClose]);

  const [isSwitchedOn, setIsSwitchedOn] = useState(false);
  const isHelp = true;
  const handleSwitchChange = (newSwitchState: boolean) => {
    setIsSwitchedOn(newSwitchState);
  };

  return (
    <div
      className={styles.OfficeInfo}
      style={{ transform: `translateX(${isVisible ? 0 : '100%'})` }}
    >
      <div className={styles.OfficeInfoTop}>
        <div className={styles.topDistance}>20,7 km</div>
        <div className={styles.topClose}>
          <img src={Cross} onClick={onClose} />
        </div>
      </div>

      <div className={styles.OfficeInfoAddress}>
        11097, ул. Пушкина д. Колотушкина
      </div>
      <div className={styles.OfficeInfoSwitch}>
        <Switch onSwitchChange={handleSwitchChange} />
      </div>
      <div className={styles.OfficeInfoOpentime}>
        <TimeList isSwitchedOn={isSwitchedOn} />
      </div>
      <div className={styles.OfficeInfoMetro}>
        <img src={Metro} />
        Окская
      </div>
      {isHelp && <InvalidHelp />}

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
