import { Marker } from 'react-leaflet';

export type MapMarkerProps = {
  position: [number, number];
  onClick?: () => void;
};

export const MapMarker: React.FC<MapMarkerProps> = ({ position, onClick }) => {
  return (
    <Marker
      position={position}
      eventHandlers={{
        click: onClick,
      }}
    />
  );
};
