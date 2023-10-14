import { Marker } from 'react-leaflet';
import { iconAtm, iconActiveAtm, iconOffice } from './icon';

export type MapMarkerProps = {
  position: [number, number];
  type: 'atm' | 'active-atm' | 'office' | 'active-office';
  onClick?: () => void;
};

export const MapMarker: React.FC<MapMarkerProps> = ({
  position,
  onClick,
  type,
}) => {
  if (type === 'active-atm') console.log('active-atm');
  return (
    <Marker
      position={position}
      icon={
        type === 'atm'
          ? iconAtm
          : type === 'active-atm'
          ? iconActiveAtm
          : type === 'office'
          ? iconOffice
          : type === 'active-office'
          ? iconOffice
          : iconAtm
      }
      eventHandlers={{
        click: onClick,
      }}
    />
  );
};
