import React from 'react';
import { LatLng, latLng } from 'leaflet';
import { MapMarker } from '@/entities/map/ui/map-marker';
import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import createRoutingMachine from '@/entities/map/lib/RoutineMachine';
import { MapLocationMarker } from '@/entities/map/ui/map-location-marker';

const MOSCOW_CENTER = [55.752, 37.615] as [number, number];

const positions: [number, number][] = [
  [55.75, 37.615],
  [55.754, 37.514],
  [55.755, 37.62],
];

export const HomePage: React.FC = () => {
  const [location, setLocation] = React.useState<LatLng | null>(null);
  const { instance, Router } = createRoutingMachine(
    MOSCOW_CENTER,
    MOSCOW_CENTER,
  );

  return (
    <>
      {JSON.stringify(location)}
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
        {positions.map((pos) =>
          MapMarker({
            key: pos.toString(),
            position: pos,
            onClick: () => {
              if (location === null) return;
              instance.setWaypoints([latLng(pos), location]);
            },
          }),
        )}
        <MapLocationMarker location={location} setLocation={setLocation} />
        <Router />
      </MapContainer>
    </>
  );
};
