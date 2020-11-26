import mainStore, { IMainStore } from './mainState';

interface IStores {
  mainStore: IMainStore
}

const Stores: IStores = {
  mainStore
}

export type {
  IStores
};

export default Stores;