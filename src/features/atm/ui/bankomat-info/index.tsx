import React from 'react';
import styles from './index.module.scss';
import Ruble from '@/assets/ruble.svg';
import Dollar from '@/assets/dollar.svg';
import Euro from '@/assets/euro.svg';

import { Button } from '@/shared/ui/button';
import { ButtonSize, ButtonType } from '@/shared/ui/button/types';
import { useAtmStore } from '@/features/atm/model';
import { useMapStore } from '@/features/map/model';
import { latLng } from 'leaflet';
import { observer } from 'mobx-react-lite';
import { ServiceCapabilityStatus } from '@/entities/atm/model';
import { InvalidHelp } from '@/shared/ui/invalidHelp';
import { BlindHelp } from '@/shared/ui/blindHelp';
import { NFS } from '@/shared/ui/nfs';
import { QrCod } from '@/shared/ui/qrcod';

export type InfoProps = {
  handleWrap: () => void;
};

const ATMInfo: React.FC<InfoProps> = ({ handleWrap }) => {
  const { selected, selectedType, router, location } = useMapStore();
  const { atm, fetchAtm } = useAtmStore();

  /** При выборе объекта, если это отделение, то запрашиваем его данные */
  React.useEffect(() => {
    if (selected) {
      if (selectedType === 'atm') {
        fetchAtm(selected._id);
      }
    }
  }, [selected, fetchAtm]);

  /** Обработка поиска маршрута */
  const handleRoute = () => {
    if (!router || !location || !atm) return;
    router?.setWaypoints([location, latLng(atm.latitude, atm.longitude)]);
    handleWrap();
  };

  /** Сброс маршрута */
  const handleReset = () => {
    router?.setWaypoints([]);
    handleWrap();
  };

  if (selectedType !== 'atm' || atm === null) return null;

  return (
    <div className={styles.bankInfo}>
      <div className={styles.bankInfoAddress}>
        <p>{atm.address}</p>
        {atm.allDay ? <p style={{"color": "green"}}>Круглосуточно</p> : ''}
      </div>

      {/* <div className={styles.bankServices}>
        {atm.services.wheelchair.serviceCapability.enum !=
          ServiceCapabilityStatus.Supported &&
        atm.services.blind.serviceCapability.enum !=
          ServiceCapabilityStatus.Supported ? (
          <p>Нет помощи для инвалидов</p>
        ) : (
          <div>
            <p>Есть помощь для:</p>
            <div className={styles.bankServicesInvalid}>
              {atm.services.wheelchair.serviceCapability.enum ===
                ServiceCapabilityStatus.Supported && <img src={Invalid} />}

              {atm.services.blind.serviceCapability.enum ===
                ServiceCapabilityStatus.Supported && <img src={Blind} />}
            </div>
          </div>
        )}
      </div> */}

    {atm.services.wheelchair.serviceCapability.enum === ServiceCapabilityStatus.Supported && <InvalidHelp />}
    {atm.services.blind.serviceCapability.enum === ServiceCapabilityStatus.Supported && <BlindHelp />}


      <div className={styles.bankServices}>
        {atm.services.supportsRub.serviceCapability !=
          ServiceCapabilityStatus.Supported &&
        atm.services.supportsUsd.serviceCapability !=
          ServiceCapabilityStatus.Supported &&
        atm.services.supportsEur.serviceCapability !=
          ServiceCapabilityStatus.Supported ? (
          <p>Нет валюты для снятия и пополнения</p>
        ) : (
          <div>
            <p>Валюты для снятия и пополнения:</p>
            <div className={styles.bankServicesCurrency}>
              {atm.services.supportsRub.serviceCapability ===
                ServiceCapabilityStatus.Supported && <img src={Ruble} />}

              {atm.services.supportsUsd.serviceCapability ===
                ServiceCapabilityStatus.Supported && <img src={Dollar} />}

              {atm.services.supportsEur.serviceCapability ===
                ServiceCapabilityStatus.Supported && <img src={Euro} />}
            </div>
          </div>
        )}
      </div>

      {atm.services.nfcForBankCards.serviceCapability.enum ===
        ServiceCapabilityStatus.Supported && <NFS/>}
      
      {atm.services.qrRead.serviceCapability.enum ===
        ServiceCapabilityStatus.Supported && <QrCod/>}

      <div className={styles.bankButtons}>
        {router?.getWaypoints().find((w) => {
          return (
            w.latLng !== null &&
            w.latLng.lat === atm?.latitude &&
            w.latLng.lng === atm?.longitude
          );
        }) ? (
          <Button
            size={ButtonSize.Medium}
            type={ButtonType.Primary}
            onClick={handleReset}
          >
            Сбросить маршрут
          </Button>
        ) : (
          <Button
            size={ButtonSize.Medium}
            type={ButtonType.Primary}
            onClick={handleRoute}
          >
            Проложить маршрут
          </Button>
        )}
      </div>
    </div>
  );
};

export default observer(ATMInfo);
