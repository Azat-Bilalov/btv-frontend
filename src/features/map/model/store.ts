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
import { RequestParams, Response } from './types';

type PrivateFields = '_atms' | '_offices' | '_selected' | '_meta';

export default class MapStore implements ILocalStore {
  private _atms: AtmModel[] = [];
  private _offices: OfficeModel[] = [];
  private _selected: AtmModel | OfficeModel | null = null;
  private _meta: Meta = Meta.Initial;

  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _atms: observable.ref,
      _offices: observable.ref,
      _selected: observable.ref,
      _meta: observable,
      atms: computed,
      offices: computed,
      selected: computed,
      meta: computed,
      fetch: action.bound,
      setSelected: action.bound,
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

  get meta() {
    return this._meta;
  }

  async fetch(params: RequestParams) {
    this._meta = Meta.Loading;

    const response = await axiosApi.get<Response>('/by_region', {
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

  setSelected(item: AtmModel | OfficeModel | null) {
    this._selected = item;
  }

  destroy() {}
}
