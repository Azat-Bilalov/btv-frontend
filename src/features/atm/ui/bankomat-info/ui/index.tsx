import styles from './index.module.scss';
import Cross from '@/assets/cross.svg';
import Invalid from '@/assets/invalid.svg';
import Blind from '@/assets/blind.svg';
import Ruble from '@/assets/ruble.svg';
import Dollar from '@/assets/dollar.svg';
import Euro from '@/assets/euro.svg';

import { Button } from '@/shared/ui/button';
import { ButtonSize, ButtonType } from '@/shared/ui/button/types';
import { InvalidHelp } from '@/shared/ui/invalidHelp';

export type InfoProps = {
  onClose: () => void;
  isVisible: boolean;
};

export const ATMInfo: React.FC<InfoProps> = ({ onClose, isVisible }) => {
  const isHelp = true;

  return (
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
        <p>11097, ул. Пушкина д. Колотушкина</p>
        {true? <p>Круглосуточно</p> : ""}
      </div>

      <div className={styles.BankServicses}>
        <p>Помощь для:</p>
        <div className={styles.BankServicsesInvalid}>
          <img src={Invalid} />
          <img src={Blind} />
        </div>
      </div>

      <div className={styles.BankServicses}>
        <p>Валюты:</p>
        <div className={styles.BankServicsesCurrency}>
          <img src={Ruble} />
          <img src={Dollar} />
          <img src={Euro} />
        </div>
      </div>

      {isHelp && <InvalidHelp />}

      <div className={styles.bankButtons}>
        <Button type={ButtonType.Primary} size={ButtonSize.Small}>
          Проложить путь
        </Button>
      </div>
    </div>
  );
};
