import styles from "./index.module.scss";
import Blind from "../../../assets/blind.svg"

export const BlindHelp: React.FC = () => {
    return(
        <div className={styles.help}>
            <img src={Blind}/>
            <div className={styles.helpInfo}>
                <b>Подходит для слепых</b>
                <p>Есть таблички с шрифтом Брайля и вызов сотрудника</p>
            </div>
        </div>
    );
}