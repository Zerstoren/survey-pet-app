import mainStore, { MainStore } from './mainState';

interface IStores {
  mainStore: MainStore
}

const Stores: IStores = {
  mainStore
}

export type {
  IStores
};

export default Stores;