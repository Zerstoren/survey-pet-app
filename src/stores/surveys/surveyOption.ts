import { makeObservable, observable } from "mobx";

export default class SurveyOption {
  @observable public text: string | undefined;
  @observable public position: number = 0;

  constructor() {
    makeObservable(this);
  }
}