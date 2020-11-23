import { makeObservable, observable } from "mobx";
import SurveyOption from "./surveyOption";

export default class SurveyOptions {
  @observable public id: number | undefined;
  @observable public optionsSelect: 'radio' | 'checkbox' = 'radio';
  @observable public options: Array<SurveyOption>;

  constructor(options = {}) {
    makeObservable(this);
    this.options = [];
  }
}