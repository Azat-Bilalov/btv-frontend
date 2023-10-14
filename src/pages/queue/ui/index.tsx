import { Button } from '@/shared/ui/button';
import styles from './index.module.scss';
import { ButtonSize, ButtonType } from '@/shared/ui/button/types';

export const Queue: React.FC = () => {
  return (
    <div className={styles.queue}>
      <h2>Мои очереди</h2>
      <div className={styles.queueWait}>
        <b style={{ color: '#ffea30' }}>Ожидающие</b>
        <div className={styles.queueItem}>
          <p>Адрес</p>
          <div className={styles.queueItemButtons}>
            <Button type={ButtonType.Primary} size={ButtonSize.Small}>
              Проложить путь
            </Button>
            <Button type={ButtonType.Secondary} size={ButtonSize.Small}>
              Выйти из очереди
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.queueCompleted}>
        <b style={{ color: 'green' }}>Пройденные</b>
        <div className={styles.queueItem}>
          <p>Адрес</p>
          <div className={styles.queueItemButtons}>
            <Button type={ButtonType.Primary} size={ButtonSize.Small}>
              Проложить путь
            </Button>
            <Button type={ButtonType.Secondary} size={ButtonSize.Small}>
              Выйти из очереди
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
