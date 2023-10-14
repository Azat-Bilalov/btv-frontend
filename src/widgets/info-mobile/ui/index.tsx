import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import styles from './index.module.scss';
import Cross from '@/assets/cross.svg';
import { useMapStore } from '@/features/map/model';
import { Button } from '@/shared/ui/button';
import React from 'react';
import OfficeInfo from '@/features/office/ui/office-info';

const InfoMobileWidget: React.FC = () => {
  // есть три состояния
  // 1. ничего не выбрано (она не отображается)
  // 2. выбран объект (отображается, но не открыта)
  // 3. открыта (отображается и открыта)
  const { selected, selectedType } = useMapStore();
  const [fullyOpened, setFullyOpened] = React.useState(false);
  const [touchStart, setTouchStart] = React.useState(0);

  const cnInfoMobile = cn(styles.infoMobile, {
    [styles.infoMobileOpened]: selected !== null,
    [styles.infoMobileFullyOpened]: fullyOpened && selected !== null,
  });

  const touchStartHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      setTouchStart(e.touches[0].clientY);
    }
  };

  const touchMoveHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const currentY = e.touches[0].clientY;
      const diff = touchStart - currentY;

      if (diff > 0) {
        setFullyOpened(true);
      }

      if (diff < 0) {
        setFullyOpened(false);
      }
    }
  };

  return (
    <div className={cnInfoMobile}>
      <div
        className={styles.infoMobileTop}
        onTouchStart={touchStartHandler}
        onTouchMove={touchMoveHandler}
      >
        <div className={styles.infoMobileTopTitle}>
          {selectedType === 'office' ? 'Отделение' : 'Банкомат'}
        </div>
        {fullyOpened ? (
          <div className={styles.infoMobileTopClose}>
            <img src={Cross} onClick={() => setFullyOpened(false)} />
          </div>
        ) : (
          <Button onClick={() => setFullyOpened(true)}>Подробнее</Button>
        )}
      </div>
      <div className={styles.infoMobileContent}>
        <OfficeInfo handleWrap={() => setFullyOpened(false)} />
      </div>
    </div>
  );
};

export default observer(InfoMobileWidget);
