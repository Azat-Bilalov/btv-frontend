import { MapMarker } from '@/entities/map/ui';
import { LatLng, Routing, latLng } from 'leaflet';
import React from 'react';
import { useMapEvents } from 'react-leaflet';
import { useMapStore } from '../../model';
import { observer } from 'mobx-react-lite';
import _ from 'lodash';

export type MarkerListProps = {
  instance: Routing.Control;
  location: LatLng | null;
};

const MarkerList: React.FC<MarkerListProps> = ({ instance, location }) => {
  const { atms, offices, selected, fetch, setSelected } = useMapStore();
  const [bounds, setBounds] = React.useState<LatLng[] | null>(null);

  /** получение объектов в радиусе видимости */
  React.useEffect(() => {
    if (bounds === null) return;

    const [ne, sw] = bounds;

    const debouncedFetch = _.debounce(() => {
      fetch({
        'ne-latitude': ne.lat,
        'ne-longitude': ne.lng,
        'sw-latitude': sw.lat,
        'sw-longitude': sw.lng,
      });
    }, 1000);

    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [bounds, fetch]);

  /** изменение границ карты */
  useMapEvents({
    moveend: (e) => {
      const bounds = e.target.getBounds();
      setBounds([bounds.getNorthEast(), bounds.getSouthWest()]);
    },
    zoomend: (e) => {
      const bounds = e.target.getBounds();
      setBounds([bounds.getNorthEast(), bounds.getSouthWest()]);
    },
  });

  return (
    <>
      {atms.map((atm) => (
        <MapMarker
          key={atm._id}
          type={selected?._id === atm._id ? 'active-atm' : 'atm'}
          position={[atm.latitude, atm.longitude]}
          onClick={() => {
            if (location === null) return;
            instance.setWaypoints([
              latLng([atm.latitude, atm.longitude]),
              location,
            ]);
            setSelected(atm, 'atm');
          }}
        />
      ))}
      {offices.map((office) => (
        <MapMarker
          key={office._id}
          type="office"
          position={[office.latitude, office.longitude]}
          onClick={() => {
            if (location === null) return;
            instance.setWaypoints([
              latLng([office.latitude, office.longitude]),
              location,
            ]);
            setSelected(office, 'office');
          }}
        />
      ))}
    </>
  );
};

export default observer(MarkerList);
