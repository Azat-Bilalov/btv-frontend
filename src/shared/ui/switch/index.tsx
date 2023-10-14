import styles from "./index.module.scss";
import { useState } from "react";
export type SwitchProps = {
    onSwitchChange: (newSwitchState: boolean) => void;
  }
export const Switch: React.FC<SwitchProps> = ({ onSwitchChange }) => {
    const [isSwitchedOn, setIsSwitchedOn] = useState(false);

    const handleSwitchChange = () => {
        const newSwitchState = !isSwitchedOn;
        setIsSwitchedOn(newSwitchState);
        onSwitchChange(newSwitchState);
      };
    
    return(
        <span className={styles.switch}>
            <input type="checkbox" id="switcher" checked={isSwitchedOn} onChange={handleSwitchChange}/>
            <label></label>
        </span>
    );
}