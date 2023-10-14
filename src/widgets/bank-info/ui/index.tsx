import styles from './index.module.scss';
import React, { useState } from 'react';
import { useMapStore } from '@/features/map/model';
import { observer } from 'mobx-react-lite';
import { useAtmStore } from '@/features/atm/model/hook';
import { OfficeInfo } from '@/features/atm/ui/office-info/ui';
import { ATMInfo } from '@/features/atm/ui/bankomat-info/ui';

export type InfoProps = {
  onClose: () => void;
  isVisible: boolean;
};

const BankInfo: React.FC<InfoProps> = ({ onClose, isVisible }) => {
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
  
  const [isOffice, setIsOffice] = useState(true);
  
  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isVisible) {
        const popup = document.querySelector(styles.BankInfo);
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

  return (
    // <div
    //   className={styles.BankInfo}
    //   style={{ transform: `translateX(${isVisible ? 0 : '100%'})` }}
    // >
    //   <div className={styles.BankInfoTop}>
    //     <div className={styles.topDistance}>20,7 km</div>
    //     <div className={styles.topClose}>
    //       <img src={Cross} onClick={onClose} />
    //     </div>
    //   </div>

    //   <div className={styles.BankInfoAddress}>
    //     11097, ул. Пушкина д. Колотушкина
    //   </div>
    //   <div className={styles.BankInfoSwitch}>
    //     <Switch onSwitchChange={handleSwitchChange} />
    //   </div>
    //   <div className={styles.BankInfoOpentime}>
    //     <TimeList isSwitchedOn={isSwitchedOn} />
    //   </div>
    //   <div className={styles.BankInfoMetro}>
    //     <img src={Metro} />
    //     Окская
    //   </div>
    //   {isHelp && <InvalidHelp />}

    //   <div className={styles.bankButtons}>
    //     <Button type={ButtonType.Primary} size={ButtonSize.Small}>
    //       Проложить путь
    //     </Button>
    //     <Button type={ButtonType.Secondary} size={ButtonSize.Small}>
    //       Занять очередь
    //     </Button>
    //   </div>
    // </div>
    <>
      {isOffice ? (
        <OfficeInfo onClose={onClose} isVisible={isVisible} />
      ) : (
        <ATMInfo onClose={onClose} isVisible={isVisible} />
      )}
    </>
  );
};

export default observer(BankInfo);
