import { AtmModel } from '@/entities/atm/model';
import { OfficeModel } from '@/entities/office/model';
import { axiosApi } from '@/shared/api';
import { ILocalStore, Meta } from '@/shared/lib';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import {
  ClosestRequestParams,
  ClosestResponse,
  ClosestTimes,
  MapRequestParams,
  MapResponse,
} from './types';
import { LatLng, Routing } from 'leaflet';

type PrivateFields =
  | '_atms'
  | '_offices'
  | '_selected'
  | '_selectedType'
  | '_meta'
  | '_router'
  | '_location'
  | '_closestTimes';

export default class MapStore implements ILocalStore {
  private _atms: AtmModel[] = [];
  private _offices: OfficeModel[] = [];
  private _selected: AtmModel | OfficeModel | null = null;
  private _selectedType: 'atm' | 'office' | null = null;
  private _meta: Meta = Meta.Initial;
  private _closestTimes: ClosestTimes[] | null = null;

  private _router: Routing.Control | null = null;
  private _location: LatLng | null = null;

  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _atms: observable.ref,
      _offices: observable.ref,
      _selected: observable.ref,
      _selectedType: observable.ref,
      _meta: observable,
      _closestTimes: observable.ref,
      _router: observable.ref,
      _location: observable.ref,
      atms: computed,
      offices: computed,
      selected: computed,
      selectedType: computed,
      meta: computed,
      closestTimes: computed,
      router: computed,
      location: computed,
      fetch: action.bound,
      fetchClosest: action.bound,
      setSelected: action.bound,
      resetClosest: action.bound,
      setRouter: action.bound,
      setLocation: action.bound,
    });
  }

  get atms() {
    return this._atms;
  }

  get offices() {
    return this._offices;
  }

  get selected() {
    return this._selected;
  }

  get selectedType() {
    return this._selectedType;
  }

  get meta() {
    return this._meta;
  }

  get closestTimes() {
    return this._closestTimes;
  }

  get router() {
    return this._router;
  }

  get location() {
    return this._location;
  }

  async fetch(params: MapRequestParams) {
    if (this._closestTimes) return;
    this._meta = Meta.Loading;

    const response = await axiosApi.get<MapResponse>('/by_region', {
      params,
    });

    runInAction(() => {
      if (response.status !== 200) {
        this._meta = Meta.Error;
        console.error(response);
        return;
      }

      this._atms = response.data.atms;
      this._offices = response.data.offices;
    });
  }

  async fetchClosest(params: ClosestRequestParams) {
    this._meta = Meta.Loading;

    const response = await axiosApi.get<ClosestResponse>('/closest', {
      params,
    });

    runInAction(() => {
      if (response.status !== 200) {
        this._meta = Meta.Error;
        console.error(response);
        return;
      }

      const timesByOffice =
        response.data.offices?.map((item) => ({
          id: item.office._id,
          timeToArrive: item.timeToArrive,
          timeInWait: item.timeInWait,
        })) ?? [];

      const timesByAtm =
        response.data.atms?.map((item) => ({
          id: item.atm._id,
          timeToArrive: item.timeToArrive,
          timeInWait: 0,
        })) ?? [];

      this._closestTimes = [...timesByOffice, ...timesByAtm];

      this._atms = response.data.atms?.map((item) => item.atm) ?? [];
      this._offices = response.data.offices?.map((item) => item.office) ?? [];
      console.log(this._atms, this._offices);

      this._meta = Meta.Success;
    });
  }

  setSelected(
    item: AtmModel | OfficeModel | null,
    type: 'atm' | 'office' | null,
  ) {
    this._selected = item;
    this._selectedType = type;
  }

  setRouter(router: Routing.Control | null) {
    this._router = router;
  }

  setLocation(location: LatLng | null) {
    this._location = location;
  }

  resetClosest() {
    this._closestTimes = null;
  }

  destroy() {}
}
