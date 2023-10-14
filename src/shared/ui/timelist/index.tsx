import styles from './index.module.scss';
import Time from '../../../assets/time.svg';
import Arrow from '../../../assets/arrow.svg';
import { useState } from 'react';

export type TimelistProps = {
    isSwitchedOn: boolean;
  }

export const TimeList: React.FC<TimelistProps> = (
    { isSwitchedOn }
) => {
  const [isOpen, setIsOpen] = useState(false);

  const showInfo = () => {
    setIsOpen(!isOpen);
  };

  const arrowStyle = {
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.3s', // Плавная анимация поворота
  };

  return (
    <div>
      <div className={styles.timelist}>
        <div className={styles.timelistInfo}>
          <img src={Time} />
          <div className={styles.timelistText}>
            <b>Режим работы</b>
            <p>Обслуживание {isSwitchedOn ? 'физических' : 'юридических'} лиц до 19:00</p>
          </div>
        </div>
        <div className={styles.timelistMore}>
          <img src={Arrow} onClick={showInfo} className={isOpen ? styles.rotated : styles.rotatedReverse}/>
        </div>
      </div>
      {isOpen && (
        <div className={styles.timeInfo}>
          <div className={styles.timeInfoItem}>
            <div className={styles.InfoItemDay}>Понедельник</div>
            <div className={styles.InfoItemTime}>08:00 - 18:00</div>
          </div>
          <div className={styles.timeInfoItem}>
            <div className={styles.InfoItemDay}>Среда</div>
            <div className={styles.InfoItemTime}>08:00 - 18:00</div>
          </div>
          <div className={styles.timeInfoItem}>
            <div className={styles.InfoItemDay}>Пятница</div>
            <div className={styles.InfoItemTime}>08:00 - 18:00</div>
          </div>
        </div>
      )}
    </div>
  );
};
