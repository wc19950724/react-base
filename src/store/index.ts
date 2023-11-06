import { makeAutoObservable } from "mobx";

export class LayoutStore {
  constructor() {
    makeAutoObservable(this);
  }
}
