export enum ServiceCapabilityStatus {
  Unknown = 'UNKNOWN',
  Supported = 'SUPPORTED',
  Unsupported = 'UNSUPPORTED',
}

export enum ServiceActivityStatus {
  Unknown = 'UNKNOWN',
  Available = 'AVAILABLE',
  Unavailable = 'UNAVAILABLE',
}

export type AtmModel = {
  _id: string;
  address: string;
  latitude: number;
  longitude: number;
  allDay: boolean;
  services: {
    wheelchair: {
      serviceCapability: {
        type: string;
        enum: ServiceCapabilityStatus;
      };
      serviceActivity: {
        type: string;
        enum: ServiceActivityStatus;
      };
    };
    blind: {
      serviceCapability: {
        type: string;
        enum: ServiceCapabilityStatus;
      };
      serviceActivity: {
        type: string;
        enum: ServiceActivityStatus;
      };
    };
    nfcForBankCards: {
      serviceCapability: {
        type: string;
        enum: ServiceCapabilityStatus;
      };
      serviceActivity: {
        type: string;
        enum: ServiceActivityStatus;
      };
    };
    qrRead: {
      serviceCapability: {
        type: string;
        enum: ServiceCapabilityStatus;
      };
      serviceActivity: {
        type: string;
        enum: ServiceActivityStatus;
      };
    };
    supportsUsd: {
      serviceCapability: {
        type: string;
        enum: ServiceCapabilityStatus;
      };
      serviceActivity: {
        type: string;
        enum: ServiceActivityStatus;
      };
    };
    supportsChargeRub: {
      serviceCapability: {
        type: string;
        enum: ServiceCapabilityStatus;
      };
      serviceActivity: {
        type: string;
        enum: ServiceActivityStatus;
      };
    };
    supportsEur: {
      serviceCapability: {
        type: string;
        enum: ServiceCapabilityStatus;
      };
      serviceActivity: {
        type: string;
        enum: ServiceActivityStatus;
      };
    };
    supportsRub: {
      serviceCapability: {
        type: string;
        enum: ServiceCapabilityStatus;
      };
      serviceActivity: {
        type: string;
        enum: ServiceActivityStatus;
      };
    };
  };
};
