import { AtmModel } from '@/entities/atm/model';
import { axiosApi } from '@/shared/api';
import { ILocalStore, Meta } from '@/shared/lib';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';

type PrivateFields = '_atm' | '_meta';

export default class AtmStore implements ILocalStore {
  private _atm: AtmModel | null = null;
  private _meta: Meta = Meta.Initial;

  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _atm: observable.ref,
      _meta: observable.ref,
      atm: computed,
      meta: computed,
      fetchAtm: action.bound,
    });
  }

  get atm() {
    return this._atm;
  }

  get meta() {
    return this._meta;
  }

  async fetchAtm(id: string) {
    this._meta = Meta.Loading;

    const response = await axiosApi.get<AtmModel>(`/atm/${id}`);

    runInAction(() => {
      if (response.status !== 200) {
        this._meta = Meta.Error;
        console.error(response);
        return;
      }

      this._atm = response.data;
    });
  }

  destroy() {}
}
