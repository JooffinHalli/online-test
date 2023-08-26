import { api } from 'api';
import { Docs } from 'api/docs';
import { makeAutoObservable } from 'mobx';

export class Root {
  constructor() {
    makeAutoObservable(this);
  }

  data: Docs['tests']['get']['res'] = [];

  getList = async () => {
    const res = await api.tests.get({ params: { length: 1 } });
    this.data = res;
  }
}