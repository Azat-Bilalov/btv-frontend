import styles from './index.module.scss';
import Maps from '@assets/maps.svg';
import Queue from '@assets/queue.svg';
import Search from '@assets/search.svg';
import { Link } from 'react-router-dom';

export const Navabar: React.FC = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/map">
        <div className={styles.navbarItem}>
          <img src={Maps} className={styles.navbarItemIcon} />
          <span className={styles.navbarItemName}>Карты</span>
        </div>
      </Link>
      <Link to="/queue">
        <div className={styles.navbarItem}>
          <img src={Queue} className={styles.navbarItemIcon} />
          <span className={styles.navbarItemName}>Очередь</span>
        </div>
      </Link>
      <Link to="/map?closest=true">
        <div className={styles.navbarItem}>
          <img src={Search} className={styles.navbarItemIcon} />
          <span className={styles.navbarItemName}>Поиск</span>
        </div>
      </Link>
    </div>
  );
};
