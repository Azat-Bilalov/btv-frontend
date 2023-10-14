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

type PrivateFields = '_office' | '_meta';

export default class OfficeStore implements ILocalStore {
  private _office: OfficeModel | null = null;
  private _meta: Meta = Meta.Initial;

  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _office: observable.ref,
      _meta: observable.ref,
      office: computed,
      meta: computed,
      fetchOffice: action.bound,
    });
  }

  get office() {
    return this._office;
  }

  get meta() {
    return this._meta;
  }

  async fetchOffice(id: string) {
    this._meta = Meta.Loading;

    const response = await axiosApi.get<OfficeModel>(`/office/${id}`);

    runInAction(() => {
      if (response.status !== 200) {
        this._meta = Meta.Error;
        console.error(response);
        return;
      }

      this._office = response.data;
    });
  }

  destroy() {}
}
