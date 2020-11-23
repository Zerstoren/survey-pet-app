import mainStore, { MainStore } from './mainState';
import surveyListStore, { SurveyListStore } from './surveyList';

interface IStores {
  mainStore: MainStore,
  surveyListStore: SurveyListStore
}

const Stores: IStores = {
  mainStore,
  surveyListStore
}

export type {
  IStores
}

export default Stores;