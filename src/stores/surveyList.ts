import { action, autorun, makeObservable, observable, runInAction, when, computed, trace } from 'mobx';
import { getItemsFromStorage } from '../storageEmulate/surveyList';
import rootStore from './mainState';

enum NetworkState {
  IDLE,
  PENDING,
  ERROR,
}

class SurveyListStore {
  @observable public state : NetworkState = NetworkState.IDLE;
  @observable public items = new Map([]);

  constructor() {
    makeObservable(this);

    when(
      () => this.state === NetworkState.ERROR,
      () => this.resetNetworkState(),
    );
  }

  @computed get getState() : string {
    switch (this.state) {
      case NetworkState.IDLE:
        return 'idle';
      case NetworkState.PENDING:
        return 'pending';
      case NetworkState.ERROR:
        return 'erro';
    }
  }

  @action loadList = async () => {
    this.state = NetworkState.PENDING;
    try {
      const result = await getItemsFromStorage();

      runInAction(() => {
        this.state = NetworkState.IDLE;
        // this.items = result;
      });
    } catch (e) {
      rootStore.registerError(e);

      runInAction(() => {
        this.state = NetworkState.ERROR;
      });
    }
  }

  @action resetNetworkState = async () => {
    setTimeout(() => runInAction(() => this.state = NetworkState.IDLE), 2000);
  }
}

export { SurveyListStore, NetworkState };
export default new SurveyListStore();