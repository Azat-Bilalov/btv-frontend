import styles from "./index.module.scss";
import Invalid from "../../../assets/invalid.svg"

export const InvalidHelp: React.FC = () => {
    return(
        <div className={styles.help}>
            <img src={Invalid}/>
            <div className={styles.helpInfo}>
                <b>Подходит маломобильным</b>
                <p>Есть пандус и вызов сотрудника</p>
            </div>
        </div>
    );
}