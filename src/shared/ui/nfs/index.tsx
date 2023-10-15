import styles from "./index.module.scss";
import nfc from "../../../assets/nfs.svg"

export const NFS: React.FC = () => {
    return(
        <div className={styles.help}>
            <img src={nfc}/>
            <div className={styles.helpInfo}>
                <b>Подерживается NFC</b>
                <p>Бесконтактое снятие средств </p>
            </div>
        </div>
    );
}