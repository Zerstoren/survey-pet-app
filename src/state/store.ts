import rootStore, { RootStore } from './rootState';
import surveyListStore, { SurveyListStore } from './surveyList';

interface IStores {
  rootStore: RootStore,
  surveyListStore: SurveyListStore
}

const Stores: IStores = {
  rootStore,
  surveyListStore
}

export type {
  IStores
}

export default Stores;