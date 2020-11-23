import { action, autorun, makeObservable, observable, runInAction, when } from 'mobx';
import { getItemsFromStorage } from '../storageEmulate/surveyList';
import rootStore from './rootState';

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

    autorun(() => {
      console.log('State change', this.state);
    })
  }

  getState() {
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
        console.log('set error')
      });
    }
  }

  @action resetNetworkState = async () => {
    setTimeout(() => {
      runInAction(() => this.state = NetworkState.IDLE);
    }, 2000);
  }
}

export { SurveyListStore };
export default new SurveyListStore();