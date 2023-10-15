import styles from './index.module.scss';
import Metro from '@/assets/metro.svg';
import { Button } from '@/shared/ui/button';
import { ButtonSize, ButtonType } from '@/shared/ui/button/types';
import { Switch } from '@/shared/ui/switch';
import { TimeList } from '@/shared/ui/timelist';
import { InvalidHelp } from '@/shared/ui/invalidHelp';
import { useState } from 'react';
import { useOfficeStore } from '../../model';
import { useMapStore } from '@/features/map/model';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { latLng } from 'leaflet';
import OfficeLoadChart from '@/entities/office/ui/chart';

export type OfficeInfoProps = {
  handleWrap: () => void;
};

const OfficeInfo: React.FC<OfficeInfoProps> = ({ handleWrap }) => {
  const [isSwitchedOn, setIsSwitchedOn] = useState(false);
  const handleSwitchChange = (newSwitchState: boolean) => {
    setIsSwitchedOn(newSwitchState);
  };
  const [day, setDay] = useState('пн');

  const { selected, selectedType, router, location } = useMapStore();
  const { office, fetchOffice } = useOfficeStore();

  /** При выборе объекта, если это отделение, то запрашиваем его данные */
  React.useEffect(() => {
    if (selected) {
      if (selectedType === 'office') {
        fetchOffice(selected._id);
      }
    }
  }, [selected, fetchOffice]);

  /** Обработка поиска маршрута */
  const handleRoute = () => {
    if (!router || !location || !office) return;
    router?.setWaypoints([location, latLng(office.latitude, office.longitude)]);
    handleWrap();
  };

  /** Сброс маршрута */
  const handleReset = () => {
    router?.setWaypoints([]);
    handleWrap();
  };

  if (selectedType !== 'office' || office === null) return null;

  return (
    <div className={styles.bankInfo}>
      <div className={styles.bankInfoAddress}>{office?.address}</div>
      <div className={styles.bankInfoSwitch}>
        <Switch onSwitchChange={handleSwitchChange} />
      </div>
      <div className={styles.bankInfoOpentime}>
        <TimeList
          phislist={office?.openHoursIndividual}
          urlist={office?.openHours}
          isSwitchedOn={isSwitchedOn}
        />
      </div>
      {office?.metroStation && (
        <div className={styles.bankInfoMetro}>
          <img src={Metro} />
          {office?.metroStation}
        </div>
      )}

      {office?.hasRamp && <InvalidHelp />}

      {office?.openHours && (
        <>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className={styles.bankInfoSelect}
          >
            {office?.openHours
              .map(
                (item) =>
                  item.hours !== 'выходной' && (
                    <option key={item.days} value={item.days}>
                      {item.days}
                    </option>
                  ),
              )
              .filter(Boolean)}
          </select>
          <OfficeLoadChart day={day} openHours={office.openHours} />
        </>
      )}

      <div className={styles.bankButtons}>
        {router?.getWaypoints().find((w) => {
          return (
            w.latLng !== null &&
            w.latLng.lat === office?.latitude &&
            w.latLng.lng === office?.longitude
          );
        }) ? (
          <Button
            onClick={handleReset}
            type={ButtonType.Primary}
            size={ButtonSize.Small}
          >
            Сбросить путь
          </Button>
        ) : (
          <Button
            onClick={handleRoute}
            type={ButtonType.Primary}
            size={ButtonSize.Small}
          >
            Проложить путь
          </Button>
        )}
        <Button type={ButtonType.Secondary} size={ButtonSize.Small}>
          Занять очередь
        </Button>
      </div>
    </div>
  );
};

export default observer(OfficeInfo);
