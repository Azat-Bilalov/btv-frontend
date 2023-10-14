import L from 'leaflet';
import svgAtm from '@/assets/bankomat.svg';
import svgActiveAtm from '@/assets/bankomat-active.svg';
import svgOffice from '@/assets/office.svg';

export const iconAtm = new L.Icon({
  iconUrl: svgAtm,
  iconRetinaUrl: svgAtm,
  iconSize: new L.Point(40, 40),

  className: 'leaflet-atm-icon',
});

export const iconActiveAtm = new L.Icon({
  iconUrl: svgActiveAtm,
  iconRetinaUrl: svgActiveAtm,
  iconSize: new L.Point(50, 50),
  className: 'leaflet-atm-icon',
});

export const iconOffice = new L.Icon({
  iconUrl: svgOffice,
  iconRetinaUrl: svgOffice,
  iconSize: new L.Point(60, 75),
  className: 'leaflet-office-icon',
});
