import { BASE_URL, axiosApi } from '@/shared/api';
import { ILocalStore, Meta } from '@/shared/lib';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';

export type QueueModel = {
  qrCodeUrl: string;
};

type PrivateFields = '_queue' | '_officeAddress' | '_meta';

export default class QueueStore implements ILocalStore {
  private _queue: QueueModel | null = null;
  private _officeAddress: string | null = null;
  private _meta = Meta.Initial;

  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _queue: observable.ref,
      _officeAddress: observable.ref,
      _meta: observable.ref,
      queue: computed,
      fetchQueue: action.bound,
    });

    const queue = localStorage.getItem('queue');
    if (queue) {
      this._queue = JSON.parse(queue);
    }

    const officeAddress = localStorage.getItem('officeAddress');
    if (officeAddress) {
      this._officeAddress = officeAddress;
    }
  }

  get queue() {
    return this._queue;
  }

  get meta() {
    return this._meta;
  }

  get officeAddress() {
    return this._officeAddress;
  }

  async fetchQueue(departmentId: string, officeAddress: string) {
    this._meta = Meta.Loading;

    this._officeAddress = officeAddress;
    localStorage.setItem('officeAddress', officeAddress);

    const response = await axiosApi.post<QueueModel>('/office/take_queue', {
      _id: departmentId,
    });

    runInAction(() => {
      if (response.status !== 200) {
        this._meta = Meta.Error;
        console.error(response);
        return;
      }

      this._queue = response.data;
      localStorage.setItem('queue', JSON.stringify(response.data));
      this._meta = Meta.Success;
    });
  }

  destroy() {}
}
