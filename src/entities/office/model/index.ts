export enum SuoAvailability {
  Yes = 'Y',
  No = 'N',
}

export type OfficeModel = {
  _id: string;
  salePointName: string;
  address: string;
  status: string;
  openHoursIndividual: [
    {
      days: string;
      hours: string;
    },
  ];
  openHours: {
    days: string;
    hours: string;
    averageLoad: number[];
  }[];
  officeType: string;
  salePointFormat: string;
  suoAvailability: {
    type: string;
    enum: SuoAvailability | null;
  };
  hasRamp: {
    type: string;
    enum: SuoAvailability | null;
  };
  latitude: number;
  longitude: number;
  metroStation: string;
  distance: number;
  kep: boolean;
  myBranch: boolean;
};
