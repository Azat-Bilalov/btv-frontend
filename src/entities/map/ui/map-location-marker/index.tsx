import React from 'react';
import { LatLng } from 'leaflet';
import { Marker, useMapEvents } from 'react-leaflet';
import { useMapStore } from '@/features/map/model';

export type MapLocationMarkerProps = {
  location: LatLng | null;
  setLocation: (location: LatLng | null) => void;
};

export const MapLocationMarker: React.FC<MapLocationMarkerProps> = ({
  location,
  setLocation,
}) => {
  const { setLocation: setStoreLocation } = useMapStore();

  const map = useMapEvents({
    locationfound: (e) => {
      setLocation(e.latlng);
      setStoreLocation(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  React.useEffect(() => {
    if (!location) {
      map.locate();
    }
  }, [location, map]);

  return location === null ? null : <Marker position={location} />;
};
