import styles from "./index.module.scss";
import Maps from "../../../assets/maps.svg";
import Queue from "../../../assets/queue.svg";

export const Navabar: React.FC = () => {
    return (
      <div className={styles.navbar}>
          <div className={styles.navbarItem}>
            <img src={Maps} className={styles.navbarItemIcon}/>
          </div>
          <div className={styles.navbarItem}>
            <img src={Queue} className={styles.navbarItemIcon}/>
          </div>
      </div>
    );
};
  