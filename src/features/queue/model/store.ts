import { axiosApi } from "@/shared/api";
import { QueueModel } from "@/entities/queue/model";
import { ILocalStore, Meta } from "@/shared/lib";

import { 
    action, 
    computed, 
    makeObservable, 
    observable, 
    runInAction 
} from "mobx";

type PrivateFields = '_queue' | '_meta';

export default class QueueStore implements ILocalStore {
    private _queue: QueueModel | null = null;
    private _meta: Meta = Meta.Initial;

    constructor() {
        makeObservable<this, PrivateFields>(this, {
            _queue: observable.ref,
            _meta: observable.ref,
           queue: computed,
            meta: computed,
           // fetchQueue: action.bound,
           makeQueue: action.bound,

        });
    }

    get queue() {
        return this._queue;
    }

    get meta() {
        return this._meta;
    }

    //создание очереди
    async makeQueue(id: string) {
        this._meta = Meta.Loading;

        const response = await axiosApi.post<QueueModel>(`/queue/${id}`);

        runInAction(() => {
            if (response.status !== 200) {
                this._meta = Meta.Error;
                console.error(response);
                return;
            }

            this._queue = response.data;
        });
    }

    destroy() {}
}

