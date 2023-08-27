import { makeAutoObservable } from 'mobx';

export class Alerts {
  constructor() {
    makeAutoObservable(this);
  }

  #counter = 0;
  #itemsMap = new Map<number, string>();

  get items() {
    return [...this.#itemsMap.values()];
  }

  add = (message: string) => {
    this.#itemsMap.set(this.#counter++, message);
  }

  delete = (id: number) => {
    this.#itemsMap.delete(id);
  }
}