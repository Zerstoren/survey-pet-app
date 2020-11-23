import { action, observable, computed, makeObservable } from 'mobx';

class MainStore {
  @observable public errors: Array<Error> = [];
  @observable public isShowAddSurveyPopup: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @computed get getLastError () : Error {
    return this.errors[this.errors.length - 1];
  }
  
  @action registerError = async (e: Error) => {
    this.errors.push(e);
  }

  @action setIsShowAddSurveyPopup = (isShow: boolean) => {
    this.isShowAddSurveyPopup = isShow;
  }
}

export { MainStore };
export default new MainStore();