import { MapMarker } from '@/entities/map/ui';
import { LatLng } from 'leaflet';
import React from 'react';
import { LayersControl, LayerGroup, useMapEvents } from 'react-leaflet';
import { useMapStore } from '../../model';
import { observer } from 'mobx-react-lite';
import _ from 'lodash';

const MarkerList: React.FC = () => {
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

  useMapEvents({
    /** изменение границ карты */
    moveend: (e) => {
      const bounds = e.target.getBounds();
      setBounds([bounds.getNorthEast(), bounds.getSouthWest()]);
    },
    zoomend: (e) => {
      const bounds = e.target.getBounds();
      setBounds([bounds.getNorthEast(), bounds.getSouthWest()]);
    },
    /** сброс выбранного объекта */
    click: () => {
      setSelected(null, null);
    },
  });

  return (
    <LayersControl position="topright">
      <LayersControl.Overlay checked name="Банкоматы">
        <LayerGroup>
          {atms.map((atm) => (
            <MapMarker
              key={atm._id}
              type={selected?._id === atm._id ? 'active-atm' : 'atm'}
              position={[atm.latitude, atm.longitude]}
              onClick={() => setSelected(atm, 'atm')}
            />
          ))}
        </LayerGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay checked name="Офисы">
        <LayerGroup>
          {offices.map((office) => (
            <MapMarker
              key={office._id}
              type="office"
              position={[office.latitude, office.longitude]}
              onClick={() => setSelected(office, 'office')}
            />
          ))}
        </LayerGroup>
      </LayersControl.Overlay>
    </LayersControl>
  );
};

export default observer(MarkerList);
