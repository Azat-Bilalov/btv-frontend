import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import styles from './index.module.scss';
import Cross from '@/assets/cross.svg';
import { useMapStore } from '@/features/map/model';
import { Button } from '@/shared/ui/button';
import React from 'react';

export type InfoMobileProps = {
  children: React.ReactNode;
};

const InfoMobileWidget: React.FC<InfoMobileProps> = ({ children }) => {
  // есть три состояния
  // 1. ничего не выбрано (она не отображается)
  // 2. выбран объект (отображается, но не открыта)
  // 3. открыта (отображается и открыта)
  const { selected } = useMapStore();
  const [fullyOpened, setFullyOpened] = React.useState(false);

  const cnInfoMobile = cn(styles.infoMobile, {
    [styles.infoMobileOpened]: selected !== null,
    [styles.infoMobileFullyOpened]: fullyOpened && selected !== null,
  });

  return (
    <div className={cnInfoMobile}>
      <div className={styles.infoMobileTop}>
        <div className={styles.infoMobileTopTitle}>Офис</div>
        {fullyOpened ? (
          <div className={styles.infoMobileTopClose}>
            <img src={Cross} onClick={() => setFullyOpened(false)} />
          </div>
        ) : (
          <Button onClick={() => setFullyOpened(true)}>Подробнее</Button>
        )}
      </div>
      <div className={styles.infoMobileContent}>{children}</div>
    </div>
  );
};

export default observer(InfoMobileWidget);
