import React from 'react';
import cn from 'classnames';
import styles from './index.module.scss';
import { useSearchParams } from 'react-router-dom';
import Cross from '@/assets/cross.svg';
import { Button } from '@/shared/ui/button';
import { ButtonType } from '@/shared/ui/button/types';
import ClosestForm from '@/features/map/ui/closest-form';
import { useMapStore } from '@/features/map/model';
import ClosestTable from '@/features/map/ui/closest-table';

const ClosestInfo: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [touchStart, setTouchStart] = React.useState(0);
  const [fullyOpened, setFullyOpened] = React.useState(true);

  const { resetClosest, setSelected } = useMapStore();

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

  const cnClosestInfo = cn(styles.closestInfo, {
    [styles.closestInfoOpened]: searchParams.get('closest') !== null,
    [styles.closestInfoFullyOpened]:
      fullyOpened && searchParams.get('closest') !== null,
  });

  const resetClosestHandler = () => {
    searchParams.delete('closest');
    setSearchParams(searchParams);
    resetClosest();
  };

  const changeClosestHandler = () => {
    setSelected(null, null);
    setFullyOpened(true);
  };

  return (
    <div className={cnClosestInfo}>
      <div
        className={styles.closestInfoTop}
        onTouchStart={touchStartHandler}
        onTouchMove={touchMoveHandler}
      >
        {fullyOpened ? (
          <>
            <div className={styles.closestInfoTopTitle}>
              Найти ближайший банкомат/отделение
            </div>
            <div className={styles.closestInfoTopClose}>
              <img src={Cross} onClick={() => setFullyOpened(false)} />
            </div>
          </>
        ) : (
          <>
            <Button onClick={changeClosestHandler}>Уточнить</Button>
            <Button type={ButtonType.Secondary} onClick={resetClosestHandler}>
              Сбросить
            </Button>
          </>
        )}
      </div>
      <div className={styles.closestInfoContent}>
        <ClosestForm />
        <ClosestTable />
      </div>
    </div>
  );
};

export default ClosestInfo;
