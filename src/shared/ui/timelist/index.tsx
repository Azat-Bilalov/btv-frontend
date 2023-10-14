import styles from './index.module.scss';
import Time from '../../../assets/time.svg';
import Arrow from '../../../assets/arrow.svg';
import { useState } from 'react';

export type TimelistProps = {
  isSwitchedOn: boolean;
  phislist?: { days: string; hours: string }[];
  urlist?: { days: string; hours: string }[];
};

export const TimeList: React.FC<TimelistProps> = ({
  isSwitchedOn,
  phislist,
  urlist,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const showInfo = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={styles.timelist}>
        <div className={styles.timelistInfo}>
          <img src={Time} />
          <div className={styles.timelistText}>
            <b>Режим работы</b>
            <p>
              Обслуживание {isSwitchedOn ? 'физических' : 'юридических'} лиц до
              19:00
            </p>
          </div>
        </div>
        <div className={styles.timelistMore}>
          <img
            src={Arrow}
            onClick={showInfo}
            className={isOpen ? styles.rotated : styles.rotatedReverse}
          />
        </div>
      </div>
      {isOpen && isSwitchedOn && (
        <div className={styles.timeInfo}>
          {phislist?.map((item, index) => (
            <div key={index} className={styles.timeInfoItem}>
              <div className={styles.timeInfoItemDay}>{item.days}</div>
              <div className={styles.timeInfoItemTime}>{item.hours}</div>
            </div>
          ))}
        </div>
      )}

      {isOpen && !isSwitchedOn && (
        <div className={styles.timeInfo}>
          {urlist?.map((item, index) => (
            <div key={index} className={styles.timeInfoItem}>
              <div className={styles.timeInfoItemDay}>{item.days}</div>
              <div className={styles.timeInfoItemTime}>{item.hours}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
