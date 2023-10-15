import styles from "./index.module.scss";
import qr from "../../../assets/qrcod.svg"

export const QrCod: React.FC = () => {
    return(
        <div className={styles.help}>
            <img src={qr}/>
            <div className={styles.helpInfo}>
                <b>Подерживается QR-cod</b>
                <p>Бесконтактое снятие средств </p>
            </div>
        </div>
    );
}