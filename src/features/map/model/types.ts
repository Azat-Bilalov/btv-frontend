import { AtmModel } from '@/entities/atm/model';
import { OfficeModel } from '@/entities/office/model';

export type RequestParams = {
  'ne-longitude': number;
  'ne-latitude': number;
  'sw-longitude': number;
  'sw-latitude': number;
};

export type Response = {
  atms: AtmModel[];
  offices: OfficeModel[];
};
