import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';
import { BASE_URL } from '@/shared/api';

const createRoutingMachine = (
  from: [number, number],
  to: [number, number],
  vehicle?: 'foot' | 'car',
) => {
  const instance = L.Routing.control({
    // router: L.Routing.graphHopper('f3b34e0e-fae0-491c-9087-2980a0290a34', {
    router: L.Routing.graphHopper(undefined, {
      serviceUrl: `${BASE_URL}/route`,
      urlParameters: {
        vehicle: vehicle || 'foot',
      },
    }),

    lineOptions: {
      styles: [{ color: '#6FA1EC', weight: 4 }],
      extendToWaypoints: true, // если true, то линия будет проходить через точки маршрута
      missingRouteTolerance: 100, // если маршрут не найден, то будет искать маршрут в радиусе 100 метров
    },

    plan: L.Routing.plan([L.latLng(from), L.latLng(to)], {
      draggableWaypoints: false,
      addWaypoints: false,
    }),

    formatter: new L.Routing.Formatter({
      language: 'ru',
      units: 'metric',
      distanceTemplate: '{value} м',
    }),

    show: false,
  });

  if (from === to) {
    instance.setWaypoints([]);
  }

  return {
    Router: createControlComponent(() => instance),
    instance,
  };
};

export default createRoutingMachine;
