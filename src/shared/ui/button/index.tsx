import cn from 'classnames';
import styles from './index.module.scss';
import { ButtonSize, ButtonType } from './types';

export type ButtonProps = {
  type?: ButtonType;
  size?: ButtonSize;
  onClick?: () => void;
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  type = ButtonType.Primary,
  size = ButtonSize.Medium,
  children,
  onClick,
}) => {
  const cnButton = cn(
    styles.button,
    styles[`button_type_${type}`],
    styles[`button_size_${size}`],
  );

  return (
    <button onClick={onClick} className={cnButton}>
      {children}
    </button>
  );
};
