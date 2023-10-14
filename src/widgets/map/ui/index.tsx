import React from 'react';
import { LatLng } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import createRoutingMachine from '@/entities/map/lib/RoutineMachine';
import { MapLocationMarker } from '@/entities/map/ui/map-location-marker';
import MarkerList from '@/features/map/ui/marker-list';

const MOSCOW_CENTER = [55.752, 37.615] as [number, number];

const MapWidget: React.FC = () => {
  const [location, setLocation] = React.useState<LatLng | null>(null);
  const { instance, Router } = createRoutingMachine(
    MOSCOW_CENTER,
    MOSCOW_CENTER,
  );

  React.useEffect(() => {
    const label = document.querySelector(
      '.leaflet-control-attribution.leaflet-control',
    );
    if (label) {
      label.innerHTML = 'Разработано в РТ';
    }
  }, [location]);

  return (
    <MapContainer
      center={location ?? MOSCOW_CENTER}
      zoom={20}
      scrollWheelZoom={true}
      style={{ height: '100vh', width: '100wh' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerList location={location} instance={instance} />
      <MapLocationMarker location={location} setLocation={setLocation} />
      <Router />
    </MapContainer>
  );
};

export default MapWidget;
