import { action, autorun, makeObservable, observable, runInAction, when, computed, trace } from 'mobx';
import { getItemsFromStorage } from '../../storageEmulate/surveyList';
import rootStore from '../mainState';

enum NetworkState {
  IDLE,
  PENDING,
  ERROR,
}

class SurveyListStore {
  @observable public items = new Map([]);

  constructor() {
    makeObservable(this);
  }

  @action loadList = async () => {
    try {
      const result = await getItemsFromStorage();

      runInAction(() => {
        // this.items = result;
      });
    } catch (e) {
      rootStore.registerError(e);
    }
  }
}

export { SurveyListStore, NetworkState };
export default new SurveyListStore();