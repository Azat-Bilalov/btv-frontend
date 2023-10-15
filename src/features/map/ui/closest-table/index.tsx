import { observer } from 'mobx-react-lite';
import { useMapStore } from '../../model';
import styles from './index.module.scss';

const ClosestTable = () => {
  const { atms, offices, closestTimes } = useMapStore();

  if (closestTimes === null) return null;
  console.log(closestTimes);

  return (
    <div className={styles.closestTable}>
      {closestTimes.map((closestTime) => {
        const obj =
          atms.find((atm) => atm._id === closestTime.id) ||
          offices.find((office) => office._id === closestTime.id);

        return (
          <div key={obj?._id} className={styles.closestTableItem}>
            <div className={styles.closestTableItemAddress}>{obj?.address}</div>
            <div className={styles.closestTableItemArrive}>
              Времени до прибытия:{' '}
              {(closestTime.timeToArrive / 1000 / 60).toFixed(0)} мин
            </div>
            <div className={styles.closestTableItemWait}>
              {closestTime.timeInWait === 0 ? (
                <div className={styles.closestTableItemWaitNow}>
                  Сейчас свободно
                </div>
              ) : (
                <div className={styles.closestTableItemWaitTime}>
                  Ожидание: {(closestTime.timeInWait / 1000 / 60).toFixed(0)}{' '}
                  мин
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default observer(ClosestTable);
