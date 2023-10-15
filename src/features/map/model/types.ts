import { AtmModel } from '@/entities/atm/model';
import { OfficeModel } from '@/entities/office/model';

export type MapRequestParams = {
  'ne-longitude': number;
  'ne-latitude': number;
  'sw-longitude': number;
  'sw-latitude': number;
};

export type MapResponse = {
  atms: AtmModel[];
  offices: OfficeModel[];
};

export type ClosestRequestParams = {
  search_for: string;
  max_results: number;
  vehicle: string;
  longitude: number;
  latitude: number;
  individual: number;
};

export type ClosestResponse = {
  atms?: {
    atm: AtmModel;
    timeToArrive: number;
  }[];
  offices?: {
    office: OfficeModel;
    timeInWait: number;
    timeToArrive: number;
  }[];
  total: number;
};

export type ClosestTimes = {
  id: string;
  timeToArrive: number;
  timeInWait: number;
};
