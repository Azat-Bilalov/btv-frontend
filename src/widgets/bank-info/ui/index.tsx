import styles from './index.module.scss';
import React from 'react';
import { useMapStore } from '@/features/map/model';
import { observer } from 'mobx-react-lite';
import { useAtmStore } from '@/features/atm/model';
import { useOfficeStore } from '@/features/office/model';
import { OfficeInfo } from '@/features/office/ui/office-info';
import { ATMInfo } from '@/features/atm/ui/bankomat-info/ui';

export type InfoProps = {
  onClose: () => void;
  isVisible: boolean;
};

const BankInfo: React.FC<InfoProps> = ({ onClose, isVisible }) => {
  const { selected, selectedType } = useMapStore();
  const { atm, fetchAtm } = useAtmStore();
  const { office, fetchOffice } = useOfficeStore();

  React.useEffect(() => {
    if (selected) {
      if (selectedType === 'office') {
        fetchOffice(selected._id);
      } else {
        fetchAtm(selected._id);
      }
    }
  }, [selected, fetchAtm, fetchOffice]);

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isVisible) {
        const popup = document.querySelector(styles.BankInfo);

        if (popup && !popup.contains(event.target as Node)) {
          onClose();
        }
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isVisible, onClose]);

  return (
    <>
      {selectedType === 'office' ? (
        <OfficeInfo onClose={onClose} isVisible={isVisible} />
      ) : (
        <ATMInfo onClose={onClose} isVisible={isVisible} />
      )}
    </>
  );
};

export default observer(BankInfo);
