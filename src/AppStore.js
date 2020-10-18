import { makeAutoObservable } from "mobx";

class AppStore {
  constructor() {
    this.mem = "";
    makeAutoObservable(this);
  }

  updateMemory(useMem) {
    this.mem = useMem;
  }
}

export default AppStore;
