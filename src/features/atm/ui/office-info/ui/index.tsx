import styles from './index.module.scss'
import Cross from '@/assets/cross.svg';
import Metro from '@/assets/metro.svg';
import { Button } from '@/shared/ui/button';
import { ButtonSize, ButtonType } from '@/shared/ui/button/types';
import { Switch } from '@/shared/ui/switch';
import { TimeList } from '@/shared/ui/timelist';
import { InvalidHelp } from '@/shared/ui/invalidHelp';
import { useState } from 'react';

export type InfoProps = {
    onClose: () => void;
    isVisible: boolean;
}

export const OfficeInfo: React.FC<InfoProps> = ({onClose, isVisible}) => {
    
    const [isSwitchedOn, setIsSwitchedOn] = useState(false);
    const isHelp = true;
    const handleSwitchChange = (newSwitchState: boolean) => {
      setIsSwitchedOn(newSwitchState);
    };
  
    
    return(
        <div
        className={styles.BankInfo}
        style={{ transform: `translateX(${isVisible ? 0 : '100%'})` }}
      >
        <div className={styles.BankInfoTop}>
          <div className={styles.topDistance}>20,7 km</div>
          <div className={styles.topClose}>
            <img src={Cross} onClick={onClose} />
          </div>
        </div>
  
        <div className={styles.BankInfoAddress}>
          11097, ул. Пушкина д. Колотушкина
        </div>
        <div className={styles.BankInfoSwitch}>
          <Switch onSwitchChange={handleSwitchChange} />
        </div>
        <div className={styles.BankInfoOpentime}>
          <TimeList isSwitchedOn={isSwitchedOn} />
        </div>
        <div className={styles.BankInfoMetro}>
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
    )
}
