import { Popup, Marker } from 'react-leaflet';

export type MapMarkerProps = {
  key?: string;
  position: [number, number];
  onClick?: () => void;
};

export const MapMarker: React.FC<MapMarkerProps> = ({
  key,
  position,
  onClick,
}) => {
  return (
    <Marker
      key={key}
      position={position}
      eventHandlers={{
        click: onClick,
      }}
    />
  );
};
