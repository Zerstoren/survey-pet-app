import { action, makeObservable, observable } from "mobx";
import SurveyOptions from "./surveyOptions";


export default class SurveyItem {
  @observable public id: number | undefined;
  @observable public title: string | undefined;
  @observable public expiredTime: string | undefined;
  @observable public options: SurveyOptions | undefined;

  constructor(data: any = {}) {
    makeObservable(this);
    // this.options = new SurveyOptions(data?.options);
  }

  @action setTitle(title: string) {
    this.title = title;
  }

  @action load() {
    
  }
}