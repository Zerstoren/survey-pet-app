import { action, observable } from 'mobx';

class RootStore {
  @observable public errors: Array<Error> = [];
  @observable public lastError: Error | null = null;
  
  @action registerError = async (e: Error) => {
    this.errors.push(e);
    this.lastError = e;
  }
}

export { RootStore };
export default new RootStore();